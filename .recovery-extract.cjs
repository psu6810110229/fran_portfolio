const fs = require('fs');
const file = "C:/Users/farnp/.codex/sessions/2026/06/05/rollout-2026-06-05T11-24-36-019e9606-963d-76c3-965a-1eff16543afc.jsonl";
const BS = String.fromCharCode(92); // backslash
const data = fs.readFileSync(file, 'utf8').split(/\r?\n/);
function basename(p) {
  const i = Math.max(p.lastIndexOf(BS), p.lastIndexOf('/'));
  return i >= 0 ? p.slice(i + 1) : p;
}
const found = {};
let ln = 0;
for (const line of data) {
  ln++;
  if (!line.trim()) continue;
  let obj;
  try { obj = JSON.parse(line); } catch { continue; }
  const p = obj.payload || obj;
  if (p.type !== 'patch_apply_end' || !p.changes) continue;
  for (const path of Object.keys(p.changes)) {
    const ch = p.changes[path];
    const base = basename(path);
    if (base !== 'Projects.tsx' && base !== 'Projects.module.css') continue;
    const content = ch.content;
    if (typeof content === 'string') {
      if (!found[base] || content.length > found[base].len) {
        found[base] = { content, len: content.length, line: ln, type: ch.type };
      }
    }
  }
}
const keys = Object.keys(found);
if (!keys.length) { console.log('NOTHING FOUND'); process.exit(0); }
for (const base of keys) {
  const info = found[base];
  const out = '.recovery/' + base;
  fs.writeFileSync(out, info.content);
  console.log('WROTE ' + out + '  (' + info.content.split(/\r?\n/).length + ' lines, ' + info.len + ' bytes, line#' + info.line + ', change=' + info.type + ')');
}
