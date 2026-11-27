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
AI marking and the AI tutor run through a small Cloudflare Worker that holds the provider keys (see [`worker/README.md`](worker/README.md)); without it the site still works with its built-in rule-based checker.

## Roadmap

* **Done:** Maharashtra SSC Class X, all seven subjects with 10 mocks each; **UP Board (UPMSP) Class X, Hindi medium**, six subjects (Hindi, English, Sanskrit, Maths, Science, Social Science) with 10 mocks each (`js/data/up-*.js`: 70-mark written paper, 3 h 15 min = 15 min reading + 3 h writing, pass 23/70; the 30 internal/practical marks are not tested). Passages and some question banks are original and recur across mocks, and written answers are self-marked (stated in each paper note); AI examiner (grader + cross-provider verifier); AI tutor on every reviewed question; weak-chapter practice sets; question-bank validator and mock-AI test harness (`tools/`).
* **Done — UP Board Class XI · NEET** (`#/board/upneet`, `js/data/neet-*.js`): NEET (UG)-pattern mocks on the NCERT Class XI books that UP Board prescribes, for NEET aspirants — Physics (45 Q / 45 min), Chemistry (45 / 45), Biology (Botany 45 + Zoology 45 / 90 min) and Mathematics (45 / 60 min, NEET format although Maths is not a NEET subject); 10 mocks each, 4-option MCQs, +4 / −1. See "How the NEET-pattern mocks are made".
* **Deferred (not started):** MP / Bihar board packs, UP Class XII, and Class XII / CBSE / ICSE.
* **Not possible yet:** real past papers 2019–2024, which need a source that can be fetched and trusted (see "Adding a real paper").
* **Boards section** (done, `js/data/boards.js`, `#/boards`): UP Board is live; MP Board and Bihar Board have their own pages marked *Coming soon*, with planned subjects and the pattern *as reported by third-party sites* (not verified). No papers exist for those two yet. Next step for each: verify the pattern against the board's own model paper, then build mocks.
* **More boards** (CBSE, ICSE, other state boards): papers are data (`window.PAPERS`), and the board's layout lives in `js/data/config.js`, so a board is a new data pack plus its layout.
* **Deep agents**: AI tutors and answer evaluators, which need server-side secrets, so they will run as serverless functions beside the static site (see Hosting).

## Hosting

The site is plain static files, so any static host works. Recommended: **Vercel** (free tier, deploys from the GitHub repo, preview URL for every branch, and the serverless functions the AI agents will need, in the same project). `vercel.json` is included, so "Import Git Repository" in Vercel is all that is required. GitHub Pages also works with no extra files (Settings → Pages → deploy from branch `main`, folder `/`). Whichever host you use, add its domain (for GitHub Pages: `udityamerit.github.io`) under Firebase console → Authentication → Settings → *Authorized domains*.

**Every deploy is picked up at once (no stale files).** `node tools/stamp-version.js` stamps each script and stylesheet in `index.html` with `?v=<hash of the file>` and writes the site version to `<meta name="bw-version">` and `version.json`. Run it after changing any served file and commit the result (`--check` fails if it is out of date; the "Site checks" workflow runs it on every push). A browser therefore fetches a file again exactly when it changed, even on GitHub Pages, which caches everything for 10 minutes. A page left open across a deploy sees the new `version.json` (checked on load, when the tab comes back, and every 15 minutes) and reloads once — never during a test: then a note offers to load it after the test is submitted. `vercel.json` makes Vercel serve the page and `version.json` uncached and the stamped files as immutable.

## Accounts and data (Firebase)



* Project `ssc-board-prep` (web config in `js/data/backend.js`), **Email/Password** sign-in, Firestore in `asia-south1`. No SDK: `js/auth.js` talks to the REST APIs.
* Data lives at `users/{uid}/…`. `firestore.rules` allows a signed-in user to read/write **only** their own `users/{their uid}` subtree and denies everything else. Publish the rules in the Firebase console (Firestore → Rules) or with `firebase deploy --only firestore:rules`.
* **Before sharing the site**: host it (Firebase Hosting, GitHub Pages, Netlify …) and add that domain under Firebase console → Authentication → Settings → *Authorized domains*. `localhost` works already.
* Password reset uses Firebase's reset e-mail ("Forgot password?"); check that the e-mail template and sender suit you.
* Offline / test mode: set `localStorage['ssc.forceLocal']='1'` (or an empty `apiKey`) to use accounts that exist only in the current browser. Results are written locally first and synced when online.
* **Tested**: local-mode flow end to end in a browser, and the Firebase code paths against a stub. **Not tested here**: a live Firebase sign-up, the reset e-mail and the deployed rules — please try one real sign-up after deploying.

## Hindi and English interface

The whole site can be used in Hindi or English: the **EN | हिं** switch in the top bar (kept on the device as `bw_lang`). With no choice made, UP Board and Bihar Board open in Hindi and other boards in English. Pages are written in English; `js/i18n.js` translates what is rendered, run by run (text with its inline tags), from `js/i18n-hi.js` (`id|हिन्दी` lines plus hand-written `I18N.add` keys and `{n}` patterns) and `js/i18n-en.js` (English keys, generated). Question papers are never touched by it: UP Board papers are in Hindi already, and NEET papers have their own Hindi medium (above). After changing interface text, run `node tools/i18n-extract.js --out ui.tsv` to regenerate `js/i18n-en.js` and list the English with no Hindi yet; in a browser, `I18N.left()` lists English still on the page.

## What students get

* **Timed tests** in the real paper layout — Q.1(A), Q.1(B), Q.2 … with "attempt any N of M" choices, scaled timer (3 min/mark).
* **Retakes are always fresh**: the first attempt at a mock is the paper as written; every retake swaps each question for an unseen one of the same section, type and marks from the other mocks of that subject (never-seen questions first, same chapter and difficulty preferred). There is nothing to pick.
* **Difficulty labels**: every question is tagged *Easy* or *Medium* with a suggested time, in the test, the review and the instructions page. A question can set `difficulty: 'easy' | 'medium'`; otherwise it is derived from marks, type and model-answer length (`diffOf` in `js/app.js`).
* **Real board timings**: Maths and Science are two separate 2-hour papers (Part 1, Part 2) as on the board timetable; History & Political Science is 2 h; the language papers (Marathi, Hindi, English) are 3 h. Any single section can also be practised on its own.
* **Marking**: MCQ and short answers are auto-marked (typed answers tolerate `x = 3`, `Rs. 1,150`, `(2, 1)`, `3 cm`). Written answers are auto-checked against the model answer (`js/check.js`: bold final answers are matched as numbers / equations / words, otherwise key-point coverage; marks in 0.5 steps) and the student can override any of them. Drawings, constructions, graphs and proofs cannot be checked by a computer, so those stay self-marked. Model answers are shown step by step (givens, numbered calculation lines, marks per step, highlighted result). Only the best N answers of an "any N" group count.
* **AI examiner (optional)**: written answers are marked by AI models (MiniMax first, strong OpenRouter models as backup) through a Cloudflare Worker that holds the API keys, double-checked by a second model from another provider, and switches models automatically when one is rate-limited — see [`worker/README.md`](worker/README.md). Without it the built-in rule-based checker is used.
* **Photo answers**: on any written question, "Take a photo" (the phone camera, or a live camera preview on a computer) and "Upload a photo" let a student photograph their handwritten answer. A vision model only copies the handwriting into text (English, Hindi, Marathi, maths in plain text); the student reads and fixes that text, and only then is it added to the answer, which is marked like any typed one. The photo is shrunk in the browser, is not stored, and is never written to the Worker log (sizes only). Needs the Worker's `/transcribe` route; the button only appears when `/health` lists it. Test photos so far were rendered, not real handwriting, so accuracy on messy real handwriting is still to be measured.
* **AI tutor**: in the review of any question, "Ask the AI tutor" opens a short chat (step-by-step explanation, "where did I go wrong?", a similar practice question, or an explanation in Hindi). It knows the question, the model answer and the student's answer. Needs the Worker's `/tutor` route; whenever the AI service is old, down, busy or offline, a built-in tutor answers from the model answer instead, so the chat never dead-ends.
* **Weak-chapter practice**: the result page and the Progress page offer "Practice" drills (up to 12 questions, new ones first) built from the chapters where the student lost the most marks. Practice sets are saved like any attempt and shown as "practice set" in history and reports; they never count as papers.
* **Scores & grades**: Distinction ≥ 75 %, First Class ≥ 60 %, Second Class ≥ 45 %, Pass Class ≥ 35 % (`BOARD.passPercent`).
* **Progress dashboard**: score trend, per-subject averages, weak chapters, history of every attempt.
* **Streaks and activity heatmap**: current and longest day streak, a GitHub-style 52-week heatmap of tests per day, last-14-day test time.
* **Time and pace**: a live per-question timer and pace hint during the test, then on the result page time used, time per question and section, marks per minute, accuracy, attempt rate, answers changed, slowest questions and pace tips. The progress page adds total study time, time by subject and best time of day.
* **Safer answer saving**: every answer is time-stamped and merged with the stored copy, so a second tab or a restored phone tab can't overwrite a newer answer; "Clear answer" has an Undo; submitting shows a review of unanswered and flagged questions with jump links.
* **Report card**: per attempt and overall, printable / save-as-PDF from the browser. **CSV export** of all attempts.
* **Student profile** (name, school, seat no.) printed on the report cards.

## Papers in this build

| Subject | Papers | Source status |
|---|---|---|
| Mathematics (Algebra 40 + Geometry 40) | `maths-2025-algebra`, `maths-2025-geometry`, `maths-mock-1` … `maths-mock-10` | 2025 papers: **adapted** from a third-party transcription; 10 mocks: original (mock 1 hand-written, mocks 2–10 generated, see below) |
| Science & Technology 1 + 2 (40 + 40) | `science-mock-1` … `science-mock-10` | 10 mocks: original (mock 1 hand-written, mocks 2–10 assembled from a chapter question bank, see below); layout **approximate** |
| History & Political Science (40) | `history-2025-partial`, `history-mock-1` … `history-mock-10` | 2025: **partial, adapted** (marks assumed); 10 mocks: original (mock 1 hand-written, mocks 2–10 assembled from a chapter question bank, see below); mark split **approximate** |
| Geography (28) | `geography-mock-1` … `geography-mock-10` | 10 mocks: original (mock 1 hand-written, mocks 2–10 assembled from a chapter question bank, see below); layout **approximate** |
| English (80) | `english-mock-1` … `english-mock-10` | 10 mocks: original (mock 1 hand-written, mocks 2–10 assembled from banks of original passages, poems, tables, grammar items and writing tasks, see below); layout **approximate** |
| Hindi (80) | `hindi-mock-1` … `hindi-mock-10` | 10 mocks: original (mock 1 hand-written, mocks 2–10 assembled from banks of original passages, poems, grammar items and writing tasks, see below); layout **approximate** |
| Marathi (80) | `marathi-mock-1` … `marathi-mock-10` | 10 mocks: original (mock 1 hand-written, mocks 2–10 assembled from banks of original passages, poems, grammar items and writing tasks, see below); layout **approximate** |

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

### How Geography mocks 2–10 are made

`js/data/geo-1.js`, `geo-2.js` and `geo-3.js` hold an original question bank for each of the 9 chapters (Field Visit, Location and Extent, Physiography and Drainage, Climate, Natural Vegetation and Wildlife, Population, Human Settlements, Economy and Occupations, Tourism / Transport / Communication): 6–8 MCQs, five 2-mark, three 3-mark and three 4-mark questions each. `geo-build.js` interleaves the chapters and gives each mock the next block, so **no question repeats across mocks 2–10 or from mock 1**, and each mock totals 28 marks in the layout of mock 1 (6×1, any 4 of 5 at 2, any 2 of 3 at 3, any 2 of 3 at 4). MCQs are auto-marked; written answers show a model answer with marking points and are **self-marked by the student**. These are practice questions, not board papers.

### How Hindi mocks 2–10 are made

`js/data/hin-1.js` holds 9 original unseen prose passages (each with 6 MCQs, three 2-mark questions, a 3-mark summary and a title); `hin-2.js` holds 9 original poems (4 MCQs, four 2-mark questions and a 4-mark central-idea question each); `hin-3.js` holds the grammar pools (eight kinds of 1-mark MCQ: synonyms, antonyms, idioms, tense, prefixes, abstract nouns, number, gender; four kinds of 2-mark MCQ: sandhi, samas, alankar, karak; four kinds of 2-mark written task: sentence correction, voice change, idiom use, punctuation); `hin-4.js` holds 9 letter, 9 essay and 9 dialogue tasks with marking guides. `hindi-build.js` gives paper *k* the *k*-th item of every list, so **no question repeats across mocks 2–10 or from mock 1**, and each mock totals 80 marks in the layout of mock 1 (unseen passage 16, poetry 16, grammar 24, writing 24). MCQs are auto-marked; written answers and the writing tasks show a model answer or marking guide for you to **self-mark**. These are practice papers, not board papers.

### How Marathi mocks 2–10 are made

`js/data/mar-1.js` holds 9 original unseen prose passages (each with 6 MCQs, three 2-mark questions, a 3-mark summary and a title); `mar-2.js` holds 9 original poems (4 MCQs, four 2-mark questions and a 4-mark central-idea question each); `mar-3.js` holds the grammar pools (eight kinds of 1-mark MCQ: synonyms, antonyms, idioms, tense, plural, gender, noun type, abstract nouns; four kinds of 2-mark MCQ: sandhi, samas, alankar, sentence type; four kinds of 2-mark written task: correct the sentence, change of tense, idiom use, punctuation); `mar-4.js` holds 9 letter, 9 essay and 9 advertisement tasks with marking guides. `marathi-build.js` gives paper *k* the *k*-th item of every list, so **no question repeats across mocks 2–10 or from mock 1**, and each mock totals 80 marks in the layout of mock 1 (unseen passage 16, poetry 16, grammar 24, writing 24). MCQs are auto-marked; written answers and the writing tasks show a model answer or marking guide for you to **self-mark**. These are practice papers, not board papers.

### How Maths mocks 2–10 are made

`js/data/lib.js` (helpers), `mm-alg.js` / `mm-geo.js` (question templates by chapter) and `mm-build.js` (assembly). Every question is built from a parameter table, and its answer, MCQ options and worked solution are computed from the same numbers, so they cannot disagree. Each paper follows the Q1–Q5 layout above for Algebra (Part 1) and Geometry (Part 2); templates rotate so mocks differ in topics and numbers. Validate with a Node script that loads the data files (marks per part, duplicate ids/texts, MCQ options).
Limits: the templates cover Balbharati chapter topics but similar *types* repeat across mocks (different numbers); figure-based board questions are described in words; construction and proof questions are self-marked against the steps (everything else is auto-checked).

### How the NEET-pattern mocks are made

`js/data/neet-config.js` (board settings, subjects, chapter lists and the `NL` question toolkit), one question bank per subject (`neet-phy.js` 638 items, `neet-chem.js` 513, `neet-bot.js` 789, `neet-zoo.js` 774, `neet-maths.js` ≈566) and `neet-build.js`, which shuffles each chapter (seeded) and deals it across 10 mocks so every mock covers every chapter in proportion and no question is in two mocks. Numerical items are computed from parameter tables (answer, distractors and worked solution come from the same numbers); conceptual items follow recent NEET question types — direct, Assertion–Reason, two-statement, "how many are correct" and Match List-I/List-II. Chapters follow the rationalised NCERT Class XI textbooks (cross-checked with the Class 11 chapter lists on tiwariacademy.com); deleted topics are left out.

The board sets `alwaysMix`: every attempt (the first one too) is rebuilt in `makeVariant` from the whole subject bank — each slot of the chosen mock is filled with an unseen question of the same section, difficulty and chapter from any of the 10 mocks — and the test screens show no "mix" label. Negative marking comes from `neg` on each question (`evaluate`).

**Hindi medium.** Every NEET question, option and solution is also available in Hindi (NCERT Hindi-medium terms; numbers, formulae, units and scientific names unchanged; names with no real Hindi equivalent, such as chemicals and elements, IUPAC names, people, taxa, enzymes and hormones, stay in English rather than being written out in Devanagari). The English banks stay the source: `js/data/neet-hi-{phy,chem,bot,zoo,maths}.js` hold `id|हिन्दी` lines keyed by the FNV-1a hash of each English piece, `neet-hi-tpl.js` (generated) holds the English templates of numerical items with `{n}` slots, and the statement / matching / assertion–reason frames are built in Hindi in `neet-config.js`. `js/data/neet-hi.js` translates a question at render time, so the shuffling, answers and marking are identical in both languages. Students pick **English / हिन्दी / हिन्दी + English** on the instructions page, in the test bar and on the result page (`bw_qlang`; default follows the interface language). After changing a bank, `node tools/neet-hi-extract.js` regenerates the templates and lists English pieces with no Hindi yet; `node tools/test-neet-hindi.js` must report 100%.

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

## Checking the code

```powershell
node tools/stamp-version.js --check  # every script/stylesheet in index.html carries its current ?v= hash (run without --check to update)
node tools/test-neet-hindi.js     # every NEET question, option and solution has Hindi (100%), slots and tags match
node tools/validate.js            # question bank: ids, types, marks, MCQ answer index, HTML balance, totals (add --verbose for warnings)
node tools/gen-rubrics.mjs --dry     # lists what the one-time marking-scheme generator would send (see worker/README.md, "Marking schemes")
node tools/mock-ai.mjs            # 100+ checks of worker/worker.js against a fake AI provider (grader, verifier, prompt boundary, cache, feedback, limiter, fallback, tutor, photo transcription, limits, /stats)
node tools/eval-grader.mjs --fake # smoke test of the marking-quality eval; with an API key use --local (see worker/README.md, "Measuring marking quality")
node tools/test-failover.mjs      # 12 checks that the site switches to a standby AI service when the main one is down
node tools/check-worker.mjs       # read-only health check of the LIVE AI service(s); run every 30 min by .github/workflows/ai-uptime.yml
node tools/mock-ai.mjs --serve    # same fake provider as a local Worker on :8787 for browser testing
```

To try the AI in a browser without keys: run the `--serve` line, open the site on `localhost`, and in the console set `localStorage['ssc.ai.endpoint']='http://localhost:8787'`, then reload. (The override only works on localhost.) In the fake provider an answer containing "correct" earns full marks, "half" earns half.

## Not verified — please check

* The Geography total of 28 marks is the project's configured value, not checked against the board's own paper.
* The Science, Geography, English, Hindi and Marathi layouts (see above); the History mark split.
* Pass mark: 35 % is used (`BOARD.passPercent`); some sources say 33 %.
* Whether a 2021 SSC exam was held is unconfirmed; it is shown as "not held" in `YEARS`.
* Model answers were hand-checked but a teacher's review is advisable. Some History model answers for 2025 are ours, not the board's.
* Chapter lists should be cross-checked against the current Balbharati textbooks.
