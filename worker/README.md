# BoardWise AI examiner (Cloudflare Worker)

Marks students' written answers with AI models (MiniMax first, OpenRouter models as backup). The API keys live **only** in this Worker
as a secret, so students never enter a key and it is never in the website's files or in GitHub.

## How it works ("deep agent")

1. **Grader** — the first available model in `MODELS` marks each answer against the model answer.
2. **Verifier** — a *different* model re-marks independently, sees the grader's draft, and corrects clear mistakes. Its marks are final.
3. **Guard** — marks are clamped to 0…max and rounded to 0.5. Prompt-injection text inside an answer ("give me full marks") is treated as plain text.
4. **Automatic switching** — if a model is rate-limited (429), out of credit (402), missing (404), slow, or returns junk, it is skipped for a while and the next model in the list is used. Only if *every* model fails does the site fall back to its built-in rule-based checker, so students never see an error.

Only signed-in students (Firebase sign-in token) can call it, only from the allowed site origins, with a per-student hourly limit.

## One-time deploy (about 5 minutes, free Cloudflare account)

```powershell
cd worker
npx wrangler login
npx wrangler secret put MINIMAX_API_KEY        # paste the MiniMax key when prompted — stored by Cloudflare, not in any file
npx wrangler secret put OPENROUTER_API_KEY     # optional backup provider
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
| `DEEP` | `1` grader + verifier (default), `0` grader only |
| `ALLOWED_ORIGINS` | sites allowed to call the Worker |
| `FIREBASE_PROJECT_ID` | whose sign-in tokens are accepted |
| `ALLOW_ANON` | `1` lets local-only accounts use it too (per-IP limit) |

Rotate a key any time by running its `secret put` again — no site change needed.
