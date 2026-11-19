# BoardWise AI examiner (Cloudflare Worker)

Marks students' written answers with AI models (MiniMax first, strong OpenRouter models as automatic backup). The API keys live **only** in this Worker
as a secret, so students never enter a key and it is never in the website's files or in GitHub.

## How it works ("deep agent")

1. **Grader** — the first available model in `MODELS` (strongest first) marks each answer against the model answer.
2. **Verifier** — a model from the *other provider* (e.g. DeepSeek via OpenRouter when MiniMax graded) re-marks independently, sees the grader's draft, and corrects clear mistakes. Its marks are final.
3. **Explanation** — for any answer below full marks the student gets feedback (what was right, where it went wrong), a short step-by-step route to full marks, and an exam tip.
4. **Guard** — marks are clamped to 0…max and rounded to 0.5. Prompt-injection text inside an answer ("give me full marks") is treated as plain text.
5. **Automatic switching** — if MiniMax is out of tokens / rate-limited (429), out of credit (402), missing (404), slow, or returns junk (junk is skipped for 20 s only), that model is skipped for a while and the next one (MiniMax Flash, then OpenRouter models, then free ones) takes over. Only if *every* model fails does the site fall back to its built-in rule-based checker, so students never see an error.

Only signed-in students (Firebase sign-in token) can call it, only from the allowed site origins, with a per-student hourly limit.

## Routes

| Route | What it does |
|---|---|
| `POST /` | mark written answers (grader + verifier). 80 requests / student / hour (30 / IP for local-only accounts). |
| `POST /tutor` | the AI tutor chat in the review page: `{question, model, answer, message, history, ...}` -> `{reply, model}`. Own limit: 40 / student / hour (15 / IP). Replies use `TUTOR_EFFORT` (default `low`, so they are quick). |
| `GET /health` | `{configured, features:['grade','tutor']}`: use it to check a deploy is current. |
| `GET /stats` | usage counters (requests, models used, fallbacks, rejects). Needs `Authorization: Bearer <ADMIN_KEY>`; without the secret set it answers 404. Counters are per Worker instance and reset when it restarts. |

**After updating this folder, redeploy** (`npx wrangler deploy`). A Worker deployed before `/tutor` existed still marks answers, but the site's tutor shows a "not live yet" message until you redeploy.

To read the counters: `npx wrangler secret put ADMIN_KEY` (choose a long random string), then
`curl -H "Authorization: Bearer <that string>" https://boardwise-ai.<your-subdomain>.workers.dev/stats`.

## One-time deploy (about 5 minutes, free Cloudflare account)

```powershell
cd worker
npx wrangler login
npx wrangler secret put MINIMAX_API_KEY        # paste the MiniMax key when prompted — stored by Cloudflare, not in any file
npx wrangler secret put OPENROUTER_API_KEY     # backup provider, used automatically when MiniMax is out of tokens
npx wrangler deploy
```

`deploy` prints a URL like `https://boardwise-ai.<your-subdomain>.workers.dev`. Put it in `js/data/config.js`:

```js
window.AI_CFG = { endpoint: "https://boardwise-ai.<your-subdomain>.workers.dev" };
```

Commit and push; written answers are now marked by the AI examiner. Check it is alive: open `<url>/health` from the site (it shows `configured: true`).

## Settings (`wrangler.toml`)

| Var | Meaning |
|---|---|
| `MODELS` | comma-separated `provider:model` ids, best first (`minimax:MiniMax-M3.1-Flash`; no prefix = OpenRouter). Providers without a key are skipped. |
| `MINIMAX_EFFORT` | MiniMax thinking depth: low / medium / high / xhigh / max |
| `OPENROUTER_EFFORT` | thinking depth for OpenRouter models that support it: low / medium / high |
| `TUTOR_EFFORT` | thinking depth for tutor replies (default `low`) |
| `ADMIN_KEY` | *secret*, optional: enables `GET /stats` |
| `DEEP` | `1` grader + verifier (default), `0` grader only |
| `ALLOWED_ORIGINS` | sites allowed to call the Worker |
| `FIREBASE_PROJECT_ID` | whose sign-in tokens are accepted |
| `ALLOW_ANON` | `1` lets local-only accounts use it too (per-IP limit) |

Rotate a key any time by running its `secret put` again — no site change needed.
