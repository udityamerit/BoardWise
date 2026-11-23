#!/usr/bin/env node
/* Builds tools/eval/golden-rubric.json: partial answers whose fair mark is EXACT, because each answer is made of chosen points of a
   question's marking scheme (js/data/rubrics.js). Use it to test whether the examiner follows a marking scheme:

     node tools/eval/build-rubric-partials.mjs
     node tools/eval-grader.mjs --local --deep 0 --golden golden-rubric.json --rubrics        (with the scheme)
     node tools/eval-grader.mjs --local --deep 0 --golden golden-rubric.json                  (without it, for the comparison)

   Per question with 3 or more points: "all but the last point", and "first point only". With 2 points: "first point only".
   The full answer (every point) is added as a control. Questions whose scheme offers alternatives (either/or, अथवा) are skipped:
   splitting those into points would label a complete answer as partial. */
import { readFileSync, writeFileSync } from 'node:fs';
import { createContext, runInContext } from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const sb = { console }; sb.window = sb; sb.self = sb; createContext(sb);
for (const m of html.matchAll(/<script src="(js\/data\/[^"]+)"/g)) runInContext(readFileSync(join(root, m[1]), 'utf8'), sb, { filename: m[1] });

const decode = s => s.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
const text = h => decode(String(h || '')
  .replace(/<sub>(.*?)<\/sub>/gi, '_$1').replace(/<sup>(.*?)<\/sup>/gi, '^$1').replace(/<b>([\s\S]*?)<\/b>/gi, '**$1**')
  .replace(/<\/(p|div|li|tr|h\d)>|<br\s*\/?>/gi, '\n').replace(/<\/t[dh]>/gi, ' | ').replace(/<[^>]+>/g, '')).replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
const ALT = /अथवा|\beither\b|\bor\b\s*\(|\(\s*[कखab]\s*\)|\bOR\b/;

const rows = []; let skipped = 0;
for (const P of sb.PAPERS) for (const S of P.sections) for (const q of S.questions) {
  const rub = sb.RUBRICS && sb.RUBRICS[P.id + '::' + q.id]; if (!rub) continue;
  if (rub.some(x => ALT.test(x.p)) || ALT.test(text(q.q))) { skipped++; continue; }
  const base = { source: 'synthetic-rubric', qid: q.id, paper: P.id, subject: P.subject || P.id.replace(/-mock.*$/, ''), chapter: q.chapter || '', marks: q.marks, question: text(q.q), model: text(q.solution) };
  const sum = pts => pts.reduce((a, x) => a + x.m, 0), join_ = pts => pts.map(x => x.p).join(' ');
  const add = (cat, pts) => rows.push(Object.assign({ id: cat + ':' + P.id + ':' + q.id, cat }, base, { answer: join_(pts), expect: { marks: sum(pts) } }));
  add('rubric-full', rub);
  if (rub.length >= 3) add('rubric-most', rub.slice(0, -1));
  if (rub.length >= 2) add('rubric-first', rub.slice(0, 1));
}
const out = join(root, 'tools', 'eval', 'golden-rubric.json');
writeFileSync(out, JSON.stringify({ version: 1, note: 'made by build-rubric-partials.mjs from js/data/rubrics.js', rows }, null, 1));
const n = c => rows.filter(r => r.cat === c).length;
console.log(`${rows.length} rows (${n('rubric-full')} full, ${n('rubric-most')} all-but-last, ${n('rubric-first')} first-point-only); ${skipped} questions skipped (alternatives).  -> ${out}`);
