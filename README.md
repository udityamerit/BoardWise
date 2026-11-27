<p align="center"><img src="assets/logo.svg" width="96" alt="BoardWise logo"></p>

# BoardWise

**Board-pattern mock tests with instant marking, grades and progress reports for school board exams.**

🔗 **Live:** https://udityamerit.github.io/BoardWise/ · built by [Uditya Narayan Tiwari](https://github.com/udityamerit)

---

## Exams and papers

The site opens on three tracks: **NEET**, **JEE** and **Board** preparation.

| Track | Pack | Class | Subjects | Tests |
|---|---|---|---|---|
| NEET | NEET (UG) pattern, +4 / −1 (Hindi / English) | XI | Physics, Chemistry, Biology, Maths | 10 per subject |
| Board | Maharashtra SSC (English medium) | X | Maths, Science, History & Pol. Sci., Geography, English, Hindi, Marathi | 10 per subject |
| Board | UP Board Class IX, MCQ (Hindi + English medium) | IX | Science, Maths, Social Science, English, Hindi, Sanskrit | 10 per subject |
| Board | UP Board (UPMSP, Hindi medium) | X | Hindi, English, Sanskrit, Maths, Science, Social Science | 10 per subject |
| Board | UP Board science, MCQ (Hindi medium) | XI | Physics, Chemistry, Maths (PCM), Biology (PCB) | 10 per subject |

**Coming soon:** JEE Main tests, MP Board, Bihar Board, UP Class XII, CBSE / ICSE.

> All mocks are original practice papers written in each board's layout. They are not official board papers.

## Features

- **Timed tests** in the real paper layout, including "attempt any N of M" choices
- **Fresh retakes**: every retake swaps in unseen questions of the same type and marks
- **Instant marking**: MCQs and short answers auto-marked; written answers checked against model answers
- **AI examiner and AI tutor** (optional), with a built-in rule-based fallback
- **Photo answers**: photograph a handwritten answer and convert it to text
- **Worked solutions**, grades, printable report cards and CSV export
- **Progress dashboard**: score trends, weak chapters, streaks, time and pace analysis
- **Weak-chapter practice** sets
- **Hindi / English** interface switch (EN | हिं)
- **Private accounts**: each student signs in with email + password; data is stored per user

## Run locally

No build step and no dependencies: it is a static site.

```powershell
python -m http.server 8765
```

Then open http://localhost:8765.

## Tech stack

- Plain HTML, CSS and JavaScript (no framework)
- **Firebase Auth + Firestore** for accounts and data (REST APIs, no SDK), cached in `localStorage`
- **Cloudflare Worker** for AI marking, tutor and photo transcription. Setup: [`worker/README.md`](worker/README.md)
- Hosted on **GitHub Pages** (Vercel also supported via `vercel.json`)

## Project structure

```
index.html          App entry point
css/                Styles
js/app.js           Main app (tests, marking, results, dashboard)
js/auth.js          Sign-in and data sync (Firebase)
js/check.js         Rule-based answer checker
js/ai.js            AI examiner and tutor client
js/i18n*.js         Hindi / English interface
js/data/            Board configs and question banks
worker/             Cloudflare Worker for the AI features
tools/              Validators, tests and deploy helpers
firestore.rules     Firestore security rules
```

## Deploying

1. After changing any served file, update the cache-busting version stamps and commit the result:
   ```powershell
   node tools/stamp-version.js
   ```
2. Push to `main`. GitHub Pages deploys it automatically.
3. Add the site's domain under Firebase console → Authentication → Settings → **Authorized domains**.
4. Publish `firestore.rules` (Firestore → Rules, or `firebase deploy --only firestore:rules`).

## Checks

```powershell
node tools/validate.js
```
```powershell
node tools/test-neet-hindi.js
```
```powershell
node tools/test-up9.js
```
```powershell
node tools/mock-ai.mjs
```
```powershell
node tools/stamp-version.js --check
```

The **Site checks** GitHub workflow runs the validator, answer tests, Hindi checks (NEET and Class IX) and version check on every push.
