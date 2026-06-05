import { mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';

const root = 'src/assets/Gear_Rental';
const out = path.join(root, 'opt');
mkdirSync(out, { recursive: true });

// Gallery order mirrors projects.ts: user flow first (idx 0-4), then admin (idx 5-9)
const gallery = [
  'images/login.png',
  'images/rentalpage.png',
  'images/equipment_selecting.png',
  'images/renting.png',
  'images/myrental_list.png',
  'images/admin_dashboard.png',
  'images/admin_approve.png',
  'images/admin_read_detail.png',
  'images/admin_edit_equipment.png',
  'images/admin_edit_equipment2.png',
];

// 1) Full gallery -> WebP, max 1600w, q80
for (let i = 0; i < gallery.length; i++) {
  await sharp(path.join(root, gallery[i]))
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(out, `gallery-${String(i).padStart(2, '0')}.webp`));
}

// 2) Card cover (rentalpage = gallery idx 1)
await sharp(path.join(root, gallery[1])).resize({ width: 1000 }).webp({ quality: 82 })
  .toFile(path.join(out, 'cover.webp'));

// 3) Preview video -> 720p H.264 (+faststart); played inside the gallery modal
execFileSync(ffmpeg, ['-y', '-i', path.join(root, 'VDO/Gear Rental PreviewVDO.mp4'),
  '-vf', 'scale=-2:720', '-c:v', 'libx264', '-crf', '28', '-preset', 'veryfast',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '96k',
  path.join(out, 'gear-rental.mp4')], { stdio: 'inherit' });

console.log('optimisation done ->', out);
