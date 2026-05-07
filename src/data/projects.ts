import type { Project } from '../types';

import toursThumb    from '../assets/9tours/user/Screenshot (452).png';
import toursPreview  from '../assets/9tours/user/user_flow.mp4';

import u452 from '../assets/9tours/user/Screenshot (452).png';
import u453 from '../assets/9tours/user/Screenshot (453).png';
import u454 from '../assets/9tours/user/Screenshot (454).png';
import u455 from '../assets/9tours/user/Screenshot (455).png';
import u456 from '../assets/9tours/user/Screenshot (456).png';
import u457 from '../assets/9tours/user/Screenshot (457).png';
import u458 from '../assets/9tours/user/Screenshot (458).png';
import u459 from '../assets/9tours/user/Screenshot (459).png';
import u460 from '../assets/9tours/user/Screenshot (460).png';
import u461 from '../assets/9tours/user/Screenshot (461).png';
import u462 from '../assets/9tours/user/Screenshot (462).png';
import a463 from '../assets/9tours/admin/Screenshot (463).png';
import a464 from '../assets/9tours/admin/Screenshot (464).png';
import a465 from '../assets/9tours/admin/Screenshot (465).png';
import a466 from '../assets/9tours/admin/Screenshot (466).png';
import a467 from '../assets/9tours/admin/Screenshot (467).png';

export const projects: Project[] = [
  {
    title: '9tours',

    description: 'Tour booking platform built at PSU. Led front-end architecture, routing, and component design for the team.',
    descriptionTh: 'แพลตฟอร์มจองทัวร์ที่พัฒนาที่ ม.อ. ดูแลสถาปัตยกรรม front-end, routing และการออกแบบ component ของทีม',
    tag: 'Team · 240-124',
    techs: ['React', 'TypeScript', 'CSS', 'SQL', 'Git'],
    githubUrl: '#',
    liveUrl: '#',
    badge: 'Featured',
    thumbnail: toursThumb,
    previewVideo: toursPreview,
    gallery: [u452, u453, u454, u455, u456, u457, u458, u459, u460, u461, u462, a463, a464, a465, a466, a467],
  },
  {
    title: 'Gear Rental',
    description: 'Gear rental platform for the PSU photo club. Built as a paired warmup project before 9tours.',
    descriptionTh: 'ระบบยืม-คืนอุปกรณ์สำหรับชมรมถ่ายภาพ ม.อ. พัฒนาเป็นโปรเจกต์จับคู่ก่อน 9tours',
    tag: 'Pair · 240-124',
    techs: ['TypeScript', 'CSS', 'Docker'],
    githubUrl: 'https://github.com/psu6810110229/mini_project',
  },
  {
    title: 'MinusOnMine',
    description: 'Top-down mining RPG built with Python and Kivy. Grid-based resource collection, equipment upgrades, and persistent save states.',
    descriptionTh: 'เกม RPG แนว top-down mining พัฒนาด้วย Python และ Kivy มีระบบเก็บทรัพยากร อัปเกรดอุปกรณ์ และบันทึกเกม',
    tag: '3 devs · Algorithm',
    techs: ['Python', 'Kivy'],
    githubUrl: 'https://github.com/psu6810110712/MinusOnMine',
  },
];
