<p align="center"><img src="assets/logo.svg" width="96" alt="BoardWise logo"></p>

# BoardWise

**Live:** https://udityamerit.github.io/BoardWise/ · built by [Uditya Narayan Tiwari](https://github.com/udityamerit)

**Board-pattern mock tests, marks, grades and progress reports for school board exams.**

BoardWise is being built for many boards and for both Class X and Class XII. The first pack is **Maharashtra SSC Class X (English medium)**, for the exams due Feb–Mar 2027: timed papers in the board's own
question layout, instant marking, grades, worked solutions, report cards and a progress dashboard. More boards and AI-assisted
features are on the roadmap below. A static, dependency-free site: no build step.

```
python -m http.server 8765      # then open http://localhost:8765   (or just open index.html)
```

Each student signs in with their own **email + password**. Attempts, results, the in-progress test and the profile are stored
per account (Firebase Auth + Firestore, with a per-user cache in `localStorage`), so ~100 students can share one site and never see each other's data.
AI features are planned (see the roadmap) and are **not** part of this build.

## Roadmap

* **More subjects** for the Maharashtra SSC pack: 9 more mocks each for Geography, Hindi and Marathi (Maths, Science, History & Political Science and English already have 10).
* **Boards section** (done, `js/data/boards.js`, `#/boards`): UP Board, MP Board and Bihar Board have their own pages marked *Coming soon*, with planned subjects and the pattern *as reported by third-party sites* (not verified). No papers exist for them yet. Next step for each: verify the pattern against the board's own model paper, then build mocks.
* **More boards** (CBSE, ICSE, other state boards): papers are data (`window.PAPERS`), and the board's layout lives in `js/data/config.js`, so a board is a new data pack plus its layout.
* **Deep agents**: AI tutors and answer evaluators, which need server-side secrets, so they will run as serverless functions beside the static site (see Hosting).

## Hosting

The site is plain static files, so any static host works. Recommended: **Vercel** (free tier, deploys from the GitHub repo, preview URL for every branch, and the serverless functions the AI agents will need, in the same project). `vercel.json` is included, so "Import Git Repository" in Vercel is all that is required. GitHub Pages also works with no extra files (Settings → Pages → deploy from branch `main`, folder `/`). Whichever host you use, add its domain (for GitHub Pages: `udityamerit.github.io`) under Firebase console → Authentication → Settings → *Authorized domains*.

## Accounts and data (Firebase)

* Project `ssc-board-prep` (web config in `js/data/backend.js`), **Email/Password** sign-in, Firestore in `asia-south1`. No SDK: `js/auth.js` talks to the REST APIs.
* Data lives at `users/{uid}/…`. `firestore.rules` allows a signed-in user to read/write **only** their own `users/{their uid}` subtree and denies everything else. Publish the rules in the Firebase console (Firestore → Rules) or with `firebase deploy --only firestore:rules`.
* **Before sharing the site**: host it (Firebase Hosting, GitHub Pages, Netlify …) and add that domain under Firebase console → Authentication → Settings → *Authorized domains*. `localhost` works already.
* Password reset uses Firebase's reset e-mail ("Forgot password?"); check that the e-mail template and sender suit you.
* Offline / test mode: set `localStorage['ssc.forceLocal']='1'` (or an empty `apiKey`) to use accounts that exist only in the current browser. Results are written locally first and synced when online.
* **Tested**: local-mode flow end to end in a browser, and the Firebase code paths against a stub. **Not tested here**: a live Firebase sign-up, the reset e-mail and the deployed rules — please try one real sign-up after deploying.

## What students get

* **Timed tests** in the real paper layout — Q.1(A), Q.1(B), Q.2 … with "attempt any N of M" choices, scaled timer (3 min/mark).
* **Full paper, one part, or one section** — e.g. Maths: both parts (4 h) or Algebra only (2 h).
* **Marking**: MCQ and short answers are auto-marked; written answers are self-marked against the model answer (0 to max, steps of 0.5). Only the best N answers of an "any N" group count.
* **Scores & grades**: Distinction ≥ 75 %, First Class ≥ 60 %, Second Class ≥ 45 %, Pass Class ≥ 35 % (`BOARD.passPercent`).
* **Progress dashboard**: score trend, per-subject averages, weak chapters, history of every attempt.
* **Report card**: per attempt and overall, printable / save-as-PDF from the browser. **CSV export** of all attempts.
* **Student profile** (name, school, seat no.) printed on the report cards.

## Papers in this build

| Subject | Papers | Source status |
|---|---|---|
| Mathematics (Algebra 40 + Geometry 40) | `maths-2025-algebra`, `maths-2025-geometry`, `maths-mock-1` … `maths-mock-10` | 2025 papers: **adapted** from a third-party transcription; 10 mocks: original (mock 1 hand-written, mocks 2–10 generated, see below) |
| Science & Technology 1 + 2 (40 + 40) | `science-mock-1` … `science-mock-10` | 10 mocks: original (mock 1 hand-written, mocks 2–10 assembled from a chapter question bank, see below); layout **approximate** |
| History & Political Science (40) | `history-2025-partial`, `history-mock-1` … `history-mock-10` | 2025: **partial, adapted** (marks assumed); 10 mocks: original (mock 1 hand-written, mocks 2–10 assembled from a chapter question bank, see below); mark split **approximate** |
| Geography (28) | `geography-mock-1` | original, layout **approximate** |
| English (80) | `english-mock-1` … `english-mock-10` | 10 mocks: original (mock 1 hand-written, mocks 2–10 assembled from banks of original passages, poems, tables, grammar items and writing tasks, see below); layout **approximate** |
| Hindi, Marathi (80 each) | `hindi-mock-1`, `marathi-mock-1` | original, layout **approximate** |

### What is real, adapted, original

* **Real board paper**: none. The board's own PDFs could not be fetched, and nothing here is a verbatim copy.
* **Adapted from the 2025 paper**: the Maths Algebra and Geometry papers use the question topics, numbers and answers shown on a third-party answer-key site (omtexclasses.com), with wording paraphrased. Two Algebra tables had no data on the source page and were reconstructed to match the published answers (labelled in the question). Geometry figures are described in words. The History 2025 paper has assumed marks and omits the Q.4 passage; the session (March or July) is unconfirmed. Each carries a note saying so in the app.
* **Original mock tests**: written for this site from the Balbharati chapters, in the layout of the 2025 papers. No question carries a fake "asked in YEAR" tag.
* **Years 2019–2024**: not present. Past papers are not available from a source that could be fetched and trusted, so they are not invented. To add one, see below.

### How Science mocks 2–10 are made

`js/data/sci-*.js` hold an original question bank per chapter (Part 1: Gravitation, Heat, Electric Current, Refraction, Lenses, Space Missions, Periodic Table, Chemical Reactions, Metallurgy, Carbon Compounds. Part 2: Heredity & Evolution, Life Processes, Animal Classification, Microbiology, Cell Biology & Biotechnology, Environmental Management, Green Energy, Social Health, Disaster Management). `sci-build.js` interleaves the chapters and gives each mock the next block of questions, so every mock covers every chapter, **no question repeats across mocks 2–10 or from mock 1**, and each mock is checked to total 80 marks. Numerical questions are auto-marked with a tolerance; one-word answers are matched against accepted spellings; descriptive answers show a model answer and are **self-marked by the student**. Layout is the approximate one described below. These are practice questions, not board papers.

### How History & Political Science mocks 2–10 are made

`js/data/hist-1.js`, `hist-2.js` and `hist-3.js` hold an original question bank for each of the 9 History chapters (3 MCQ, 3 one-word, 6 two-mark, 4 three-mark, 2 four-mark and 1 passage each); `pol.js` holds the 5 Political Science chapters (4 MCQ, 6 true/false with reasons and 8 three-mark each). `hist-build.js` interleaves the chapters and gives each mock the next block, so **no question repeats across mocks 2–10 or from mock 1**, and each mock totals 40 marks in the Q1–Q9 layout of mock 1. One-word answers are auto-marked against accepted spellings; descriptive answers show a model answer and are **self-marked by the student**. These are practice questions, not board papers.

### How English mocks 2–10 are made

`js/data/eng-1.js` holds 9 original prose passages and 9 original poems (each with its questions); `eng-2.js` holds 9 data tables and 9 original unseen passages; `eng-3.js` holds the grammar pools (36 MCQs, 32 fill-ins, 18 reported-speech and 18 active/passive items); `eng-4.js` holds 9 formal-letter, 9 notice and 9 essay tasks with content points and samples. `eng-build.js` gives paper *k* the *k*-th passage, poem, table and writing tasks, so **no question repeats across mocks 2–10 or from mock 1**, and each mock totals 80 marks in the layout of mock 1. Table questions (highest value, total, difference, percentage) are computed from the table's numbers, so the answers always match; the builder throws if a percentage is not whole. One-word answers are auto-marked against accepted spellings (including units such as "200 litres"); written answers and the three writing tasks show a model answer and marking scheme for you to **self-mark**. These are practice papers, not board papers.

### How Maths mocks 2–10 are made

`js/data/lib.js` (helpers), `mm-alg.js` / `mm-geo.js` (question templates by chapter) and `mm-build.js` (assembly). Every question is built from a parameter table, and its answer, MCQ options and worked solution are computed from the same numbers, so they cannot disagree. Each paper follows the Q1–Q5 layout above for Algebra (Part 1) and Geometry (Part 2); templates rotate so mocks differ in topics and numbers. Validate with a Node script that loads the data files (marks per part, duplicate ids/texts, MCQ options).
Limits: the templates cover Balbharati chapter topics but similar *types* repeat across mocks (different numbers); figure-based board questions are described in words; construction and proof questions are self-marked against the steps.

## Paper layout (`window.SUBJECTS` in `js/data/config.js`)

* Maths / Algebra / Geometry — 40 marks, 2 h each: Q1A 4×1, Q1B 4×1, Q2A any 2 of 3 (2), Q2B any 4 of 5 (2), Q3A any 1 of 2 (3), Q3B any 2 of 4 (3), Q4 any 2 of 3 (4), Q5 any 1 of 2 (3). Read from the 2025 transcriptions.
* Science (per part): Q1A 5×1, Q1B 5×1, Q2 any 5 of 7 (2), Q3 any 5 of 8 (3), Q4 any 1 of 2 (5). **Approximate.**
* History & Political Science: Q1–Q9 numbering from the 2025 transcription; mark split ours. **Approximate.**
* Geography 28 marks, English/Hindi/Marathi 80 marks, 3 h: **approximate**.
* The real result also includes 20 internal marks per subject given by schools; they are not tested here.

## Adding a real paper

```js
window.PAPERS.push({
  id: 'maths-2024-algebra', subject: 'maths', kind: 'pyq', year: 2024, durationMin: 120,
  title: 'Mathematics Part 1 (Algebra) — Board 2024',
  note: 'Where this text came from and what was changed.',
  sections: [
    { id: 'q1a', part: 1, title: 'Q.1 (A) …', attempt: null, instruction: '…', questions: [ /* mk.mcq / mk.num / mk.self */ ] },
    { id: 'q2b', part: 1, title: 'Q.2 (B) …', attempt: 4,    instruction: 'Attempt any four', questions: [ /* 5 questions, equal marks */ ] }
  ]
});
```

* `kind: 'pyq'` files it under "Previous-year papers", grouped by `year`.
* `attempt: N` means "answer any N of the M questions"; give those questions the same marks. Section marks are the best N.
* Helpers: `mk.mcq(id, marks, chapter, q, options, answerIdx, solution)`, `mk.num(id, marks, chapter, q, acceptList, solution, hint)`, `mk.self(id, marks, chapter, q, modelAnswer)`; `year` on a question shows an "Asked in Board YYYY" badge.
* Check every question against an official copy (https://mahahsscboard.in) before tagging a year.
* Register the new file in `index.html` (after `config.js`/`lib.js`, before `backend.js`). A validator that checks marks per part, duplicate ids and MCQ answer indices is easy to rerun in Node; see how `window.PAPERS` is built.

## Not verified — please check

* The Science, Geography, English, Hindi and Marathi layouts (see above); the History mark split.
* Pass mark: 35 % is used (`BOARD.passPercent`); some sources say 33 %.
* Whether a 2021 SSC exam was held is unconfirmed; it is shown as "not held" in `YEARS`.
* Model answers were hand-checked but a teacher's review is advisable. Some History model answers for 2025 are ours, not the board's.
* Chapter lists should be cross-checked against the current Balbharati textbooks.
