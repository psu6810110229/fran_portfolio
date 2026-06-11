import { mkdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';

const root = 'src/assets/GO-OUT';
const out = path.join(root, 'opt');
mkdirSync(out, { recursive: true });

// Gallery order mirrors projects.ts.
const gallery = [
  'images/IMG_20260604_18495797.jpeg',
  'images/IMG_20260604_18502263.jpg',
  'images/IMG_20260604_18504836.jpeg',
  'images/IMG_20260604_18505443.jpeg',
  'images/IMG_20260604_18510418.jpeg',
  'images/IMG_20260604_18511376.jpeg',
  'images/IMG_20260604_18512308.jpeg',
  'images/IMG_20260604_18512589.jpeg',
  'images/IMG_20260604_18513373.jpeg',
];

// 1) Full gallery -> WebP, max 1400w, q78.
for (let i = 0; i < gallery.length; i++) {
  await sharp(path.join(root, gallery[i]))
    .rotate()
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(path.join(out, `gallery-${String(i).padStart(2, '0')}.webp`));
}

// 2) Compact card cover and the cropped bento screenshot override.
await sharp(path.join(root, gallery[0]))
  .rotate()
  .resize({ width: 1000, withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile(path.join(out, 'cover.webp'));

await sharp(path.join(root, 'images/IMG_20260604_18513373_COPY.jpeg'))
  .rotate()
  .resize({ width: 900, withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile(path.join(out, 'preview-shot-02.webp'));

// 3) Preview video -> 720p H.264 (+faststart) and WebP poster.
const videoSrc = path.join(root, 'vdo/GO-OUT preview.mp4');
execFileSync(ffmpeg, [
  '-y',
  '-i',
  videoSrc,
  '-vf',
  'scale=-2:720',
  '-c:v',
  'libx264',
  '-crf',
  '30',
  '-preset',
  'veryfast',
  '-pix_fmt',
  'yuv420p',
  '-movflags',
  '+faststart',
  '-c:a',
  'aac',
  '-b:a',
  '96k',
  path.join(out, 'go-out-preview.mp4'),
], { stdio: 'inherit' });

const posterPng = path.join(out, 'go-out-preview-poster.png');
execFileSync(ffmpeg, ['-y', '-ss', '1', '-i', videoSrc, '-frames:v', '1', '-update', '1', posterPng], { stdio: 'inherit' });
await sharp(posterPng)
  .rotate()
  .resize({ width: 1000, withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile(path.join(out, 'go-out-preview-poster.webp'));
rmSync(posterPng);

console.log('optimisation done ->', out);
