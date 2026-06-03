import { mkdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';

const root = 'src/assets/9tours';
const out = path.join(root, 'opt');
mkdirSync(out, { recursive: true });

// Gallery order mirrors projects.ts: user 452-462 (idx 0-10), admin 463-467 (idx 11-15)
const gallery = [
  ...Array.from({ length: 11 }, (_, i) => `user/Screenshot (${452 + i}).png`),
  ...Array.from({ length: 5 },  (_, i) => `admin/Screenshot (${463 + i}).png`),
];

// 1) Full gallery -> WebP, max 1600w, q80
for (let i = 0; i < gallery.length; i++) {
  await sharp(path.join(root, gallery[i]))
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(out, `gallery-${String(i).padStart(2, '0')}.webp`));
}

// 2) Preview derivatives (hero + 3 thumbs) for the in-page block
await sharp(path.join(root, gallery[0])).resize({ width: 1000 }).webp({ quality: 82 })
  .toFile(path.join(out, 'preview-hero.webp'));
for (const [i, name] of [[1, 'preview-thumb-01'], [2, 'preview-thumb-02'], [11, 'preview-thumb-03']]) {
  await sharp(path.join(root, gallery[i])).resize({ width: 520 }).webp({ quality: 80 })
    .toFile(path.join(out, `${name}.webp`));
}

// 3) Videos -> 720p H.264 (+faststart) and a WebP poster; loaded only inside the case reader
for (const [rel, base] of [['user/user_flow.mp4', 'user-flow'], ['admin/admin_flow.mp4', 'admin-flow']]) {
  const src = path.join(root, rel);
  execFileSync(ffmpeg, ['-y', '-i', src, '-vf', 'scale=-2:720', '-c:v', 'libx264',
    '-crf', '28', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    '-c:a', 'aac', '-b:a', '96k', path.join(out, `${base}.mp4`)], { stdio: 'inherit' });
  const posterPng = path.join(out, `${base}-poster.png`);
  execFileSync(ffmpeg, ['-y', '-ss', '1', '-i', src, '-frames:v', '1', '-update', '1', posterPng], { stdio: 'inherit' });
  await sharp(posterPng).resize({ width: 1000 }).webp({ quality: 80 })
    .toFile(path.join(out, `${base}-poster.webp`));
  rmSync(posterPng); // drop the intermediate full-size PNG; keep only the webp poster
}
console.log('optimisation done ->', out);
