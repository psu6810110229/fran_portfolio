import type { Project } from '../types';

// Optimised 9tours media (Phase 0, see scripts/optimize-9tours-media.mjs).
// Raw originals under ../assets/9tours/{user,admin} are intentionally left unreferenced.
import heroOpt from '../assets/9tours/opt/preview-hero.webp';
import thumb1 from '../assets/9tours/opt/preview-thumb-01.webp';
import thumb2 from '../assets/9tours/opt/preview-thumb-02.webp';
import thumb3 from '../assets/9tours/opt/preview-thumb-03.webp';
import g00 from '../assets/9tours/opt/gallery-00.webp';
import g01 from '../assets/9tours/opt/gallery-01.webp';
import g02 from '../assets/9tours/opt/gallery-02.webp';
import g03 from '../assets/9tours/opt/gallery-03.webp';
import g04 from '../assets/9tours/opt/gallery-04.webp';
import g05 from '../assets/9tours/opt/gallery-05.webp';
import g06 from '../assets/9tours/opt/gallery-06.webp';
import g07 from '../assets/9tours/opt/gallery-07.webp';
import g08 from '../assets/9tours/opt/gallery-08.webp';
import g09 from '../assets/9tours/opt/gallery-09.webp';
import g10 from '../assets/9tours/opt/gallery-10.webp';
import g11 from '../assets/9tours/opt/gallery-11.webp';
import g12 from '../assets/9tours/opt/gallery-12.webp';
import g13 from '../assets/9tours/opt/gallery-13.webp';
import g14 from '../assets/9tours/opt/gallery-14.webp';
import g15 from '../assets/9tours/opt/gallery-15.webp';
import userFlow from '../assets/9tours/opt/user-flow.mp4';
import userFlowPoster from '../assets/9tours/opt/user-flow-poster.webp';

// GO-OUT assets
import goOutG00 from '../assets/GO-OUT/images/IMG_20260604_18495797.jpeg';
import goOutG01 from '../assets/GO-OUT/images/IMG_20260604_18502263.jpeg';
import goOutG02 from '../assets/GO-OUT/images/IMG_20260604_18504836.jpeg';
import goOutG03 from '../assets/GO-OUT/images/IMG_20260604_18505443.jpeg';
import goOutG04 from '../assets/GO-OUT/images/IMG_20260604_18510418.jpeg';
import goOutG05 from '../assets/GO-OUT/images/IMG_20260604_18511376.jpeg';
import goOutG06 from '../assets/GO-OUT/images/IMG_20260604_18512308.jpeg';
import goOutG07 from '../assets/GO-OUT/images/IMG_20260604_18512589.jpeg';
import goOutG08 from '../assets/GO-OUT/images/IMG_20260604_18513373.jpeg';
import goOutVideo from '../assets/GO-OUT/vdo/GO-OUT preview.mp4';

// Gallery order preserved from the original screenshots: user 452-462 (0-10), admin 463-467 (11-15).
const tours9Gallery = [g00, g01, g02, g03, g04, g05, g06, g07, g08, g09, g10, g11, g12, g13, g14, g15];
const goOutGallery = [goOutG00, goOutG01, goOutG02, goOutG03, goOutG04, goOutG05, goOutG06, goOutG07, goOutG08];

export const projects: Project[] = [
  {
    title: '9tours',
    description:
      'Tour booking platform built by a student team at PSU. I was the group lead and project manager, and built the front-end and parts of the API with my teammates.',
    descriptionTh:
      'แพลตฟอร์มจองทัวร์ที่ทีมนักศึกษา ม.อ. ช่วยกันสร้าง ผมเป็นหัวหน้ากลุ่มและดูแลภาพรวมโปรเจกต์ และลงมือทำทั้ง front-end และบางส่วนของ API ร่วมกับเพื่อนในทีม',
    tag: 'Team · 240-124',
    techs: ['React', 'TypeScript', 'CSS', 'SQL', 'Git'],
    githubUrl: 'https://github.com/psu6810110712/9Tours',
    badge: 'Featured',
    thumbnail: heroOpt,
    previewVideo: userFlow,
    gallery: tours9Gallery,
    caseStudy: {
      problem: {
        en: 'People booking a tour want it done in a few taps: pick a trip, choose a date, pay, done. No dead ends, no guessing whether it went through.',
        th: 'คนจองทัวร์อยากให้จบในไม่กี่แตะ เลือกทริป เลือกวัน จ่าย จบ ไม่มีทางตัน ไม่ต้องเดาว่าจองติดหรือยัง',
      },
      role: {
        en: '9tours was a team project at PSU, and I was the group lead and project manager. I set and supervised the product and design direction, from the first wireframes through to the production look, and kept the team aligned on what we were building. I also built alongside my teammates, on both the front-end and parts of the API.',
        th: '9tours เป็นงานทีมที่ ม.อ. โดยผมเป็นหัวหน้ากลุ่มและดูแลภาพรวมโปรเจกต์ ผมเป็นคนกำหนดและคุมทิศทางของโปรดักต์และดีไซน์ ตั้งแต่ wireframe แรกจนถึงหน้าตาเวอร์ชันจริง และคอยทำให้ทีมเห็นภาพเดียวกันว่าเรากำลังสร้างอะไร นอกจากคุมทิศทาง ผมลงมือทำเองด้วย ทั้งฝั่ง front-end และบางส่วนของ API ร่วมกับเพื่อนในทีม',
      },
      whatTeamBuilt: {
        en: 'Together we built the booking experience end to end: browse tours, book a trip, get a confirmation, and an admin side to manage it all.',
        th: 'ทั้งทีมช่วยกันสร้างระบบจองครบทั้งกระบวนการ ตั้งแต่ดูทริป จองทริป ได้รับการยืนยัน ไปจนถึงฝั่ง admin สำหรับจัดการทั้งหมด',
      },
      personalContribution: {
        en: 'As lead I owned the direction: the wireframes, the design decisions, and keeping the build consistent from sketch to the final look. Hands-on, I worked with teammates on the front-end and on parts of the API.',
        th: 'ในฐานะหัวหน้า ผมดูแลทิศทางทั้งหมด ทั้ง wireframe การตัดสินใจด้านดีไซน์ และคุมให้งานออกมาสอดคล้องกันตั้งแต่ภาพร่างจนถึงเวอร์ชันจริง ส่วนงานลงมือ ผมทำร่วมกับเพื่อนทั้งฝั่ง front-end และบางส่วนของ API',
      },
      hardestIssue: {
        headline: {
          en: 'The bug that mattered most: two people could book the last seat at the same moment, and both screens would say it worked.',
          th: 'บั๊กที่สำคัญที่สุด คนสองคนกดจองที่นั่งสุดท้ายพร้อมกันได้ แล้วจอทั้งสองฝั่งขึ้นว่าจองสำเร็จ',
        },
        plain: {
          en: 'On a busy tour, two people could tap book on the last seat at almost the same time. The screen told each of them it had worked before the server had actually saved either booking, so the seat count and the price could end up wrong.',
          th: 'เวลาทริปไหนคนจองเยอะ สองคนอาจกดจองที่นั่งสุดท้ายพร้อมกันได้ จอขึ้นว่าสำเร็จทั้งคู่ก่อนที่เซิร์ฟเวอร์จะบันทึกจริง ทำให้จำนวนที่นั่งและราคาเพี้ยนได้',
        },
        whatWeDid: {
          en: 'I made the server the single source of truth. The screen now waits for the server to confirm a booking before it shows success and recalculates how many seats are left, instead of trusting what the browser assumed. We worked through it across the front-end and the API together.',
          th: 'ผมแก้โดยให้เซิร์ฟเวอร์เป็นตัวตัดสินความถูกต้องเพียงจุดเดียว จอจะรอให้เซิร์ฟเวอร์ยืนยันก่อน ค่อยขึ้นว่าสำเร็จและคำนวณที่นั่งที่เหลือใหม่ แทนที่จะเชื่อค่าที่เบราว์เซอร์เดาไว้เอง โดยเราช่วยกันไล่แก้ทั้งฝั่ง front-end และ API',
        },
      },
      // Draft examples from the brief. Confirm the real specifics before shipping copy.
      decisions: {
        en: 'I pushed the booking flow to the fewest clear steps, and drove a shared set of components so the product looked consistent from wireframe to production.',
        th: 'ผมดันให้ flow การจองเหลือขั้นตอนที่ชัดและน้อยที่สุด และผลักดันให้ใช้ชุด component ร่วมกัน เพื่อให้หน้าตาโปรดักต์สอดคล้องกันตั้งแต่ wireframe จนถึงเวอร์ชันจริง',
      },
      collaboration: {
        en: 'I coordinated the work across the team and stayed close to both sides of the stack, so the screens and the API agreed on what was true, especially around booking.',
        th: 'ผมประสานงานในทีมและดูแลใกล้ชิดทั้งสองฝั่งของระบบ เพื่อให้หน้าจอกับ API เข้าใจตรงกันว่าอะไรคือข้อมูลจริง โดยเฉพาะเรื่องการจอง',
      },
      result: {
        en: 'The flow holds up end to end: browse, book, confirm, plus an admin side to manage it. Here it is, actually running.',
        th: 'ทั้ง flow ทำงานครบตั้งแต่ต้นจนจบ ดูทริป จอง ยืนยัน และมีฝั่ง admin ไว้จัดการ นี่คือตอนมันทำงานจริง',
      },
      contactHandoff: {
        en: 'That is 9tours. If you want to hear how I would lead and build something like this for you, I am one message away.',
        th: 'นี่แหละครับ 9tours ถ้าอยากรู้ว่าผมจะนำทีมและสร้างแบบนี้ให้คุณยังไง ทักผมมาได้เลย',
      },
      media: {
        hero: heroOpt,
        thumbs: [thumb1, thumb2, thumb3],
        gallery: tours9Gallery,
        video: userFlow,
        videoPoster: userFlowPoster,
      },
    },
  },
  {
    title: 'GO-OUT',
    description:
      'Mobile-first shared savings tracker for small groups. I designed and built it as a privacy-first scoreboard for goals, habits, and social accountability without connecting to real bank accounts.',
    descriptionTh:
      'แอปบันทึกการออมเงินร่วมกันบนมือถือสำหรับกลุ่มเล็ก ผมออกแบบและพัฒนาให้เป็นกระดานคะแนนที่ช่วยติดตามเป้าหมาย สร้างนิสัยการออม และสร้างแรงจูงใจร่วมกันโดยไม่เชื่อมต่อบัญชีธนาคารจริง',
    tag: 'Full-stack · Mobile/PWA',
    techs: ['React', 'TypeScript', 'Vite', 'Supabase', 'Capacitor', 'PWA', 'FCM'],
    githubUrl: 'https://github.com/psu6810110229/Project_Saving',
    badge: 'Featured',
    thumbnail: goOutG00,
    previewVideo: goOutVideo,
    gallery: goOutGallery,
    caseStudy: {
      problem: {
        en: 'Saving money together for a big goal can lose momentum when everyone tracks it alone, but sharing a real bank account creates privacy and trust concerns.',
        th: 'การออมเงินร่วมกันเพื่อเป้าหมายใหญ่ มักขาดแรงจูงใจหากแต่ละคนติดตามเอง และการใช้บัญชีธนาคารร่วมกันก็ทำให้กังวลเรื่องความเป็นส่วนตัวและความน่าเชื่อถือ',
      },
      role: {
        en: 'I designed and built GO-OUT as a mobile-first shared savings tracker for small groups of up to 7 people. The app does not hold money or connect to banks; it acts as a transparent scoreboard for progress, saving habits, and social accountability.',
        th: 'ผมออกแบบและพัฒนา GO-OUT ให้เป็นแอปบันทึกการออมเงินร่วมกันบนมือถือสำหรับกลุ่มขนาดเล็กสูงสุด 7 คน แอปไม่ได้เก็บเงินจริงหรือเชื่อมต่อธนาคาร แต่ทำหน้าที่เป็นกระดานคะแนนที่โปร่งใสสำหรับติดตามความคืบหน้า นิสัยการออม และแรงจูงใจร่วมกัน',
      },
      whatTeamBuilt: {
        en: 'The product supports project rooms, member buckets, saving plans, streak tracking, progress views, push notifications, and a mobile/PWA experience from one React codebase.',
        th: 'ระบบรองรับห้องโปรเจกต์ กระเป๋าเงินของสมาชิก แผนการออม การติดตามสตรีก หน้าความคืบหน้า การแจ้งเตือน และประสบการณ์ใช้งานแบบมือถือ/PWA จากโค้ดเบส React เดียว',
      },
      personalContribution: {
        en: 'I owned the product design, front-end build, Supabase data model, RLS/RPC security rules, saving-plan engine, and Capacitor/PWA delivery. I also built the Android home-screen widget by rendering the React UI through a hidden WebView and converting it to a widget image.',
        th: 'ผมดูแลทั้งการออกแบบผลิตภัณฑ์ การพัฒนา front-end โมเดลข้อมูลบน Supabase กฎความปลอดภัย RLS/RPC ระบบแผนการออม และการต่อยอดเป็น Capacitor/PWA รวมถึงพัฒนา Android Home-Screen Widget ด้วยการเรนเดอร์ React UI ผ่าน WebView ที่ซ่อนไว้แล้วแปลงเป็นภาพสำหรับ widget',
      },
      hardestIssue: {
        headline: {
          en: 'The hardest part was the Money-State Model & Append-only Ledger.',
          th: 'ส่วนที่ยากที่สุดคือ Money-State Model และ Append-only Ledger',
        },
        plain: {
          en: 'Financial records need to stay trustworthy, so I avoided hard deletes, negative entries, and editing old logs. The app separates money into Recorded Deposits, Verified Balance, and Planned Balance.',
          th: 'ข้อมูลทางการเงินต้องน่าเชื่อถือ ผมจึงไม่ให้มีการลบถาวร บันทึกยอดติดลบ หรือแก้ไขประวัติเก่าโดยตรง และแยกตัวเลขออกเป็น Recorded Deposits, Verified Balance และ Planned Balance',
        },
        whatWeDid: {
          en: 'When numbers need correction, users go through a Reconcile flow that creates a signed adjustment checkpoint instead of rewriting history. Supabase Row-Level Security and Security-Definer RPCs enforce the rules at the database level.',
          th: 'เมื่อจำเป็นต้องแก้ไขตัวเลข ผู้ใช้จะทำผ่าน Reconcile flow ที่สร้างรายการปรับปรุงพร้อมประวัติแทนการย้อนกลับไปแก้ข้อมูลเก่า โดยบังคับใช้กฎนี้ด้วย Supabase Row-Level Security และ Security-Definer RPCs ในระดับฐานข้อมูล',
        },
      },
      decisions: {
        en: 'I designed project rooms so members can share one goal while keeping individual buckets separate. Everyone can see high-level progress for motivation, while private notes and storage details stay personal.',
        th: 'ผมออกแบบ Project Rooms ให้สมาชิกมีเป้าหมายร่วมกัน แต่แยก Buckets ของแต่ละคนออกจากกัน ทุกคนเห็นภาพรวมความคืบหน้าเพื่อสร้างแรงจูงใจ แต่บันทึกส่วนตัวและรายละเอียดการเก็บเงินยังเป็นส่วนตัว',
      },
      collaboration: {
        en: 'The saving plan engine supports multiple rules such as fixed daily and increasing daily plans. To reduce burnout, I added streak tracking with monthly Streak Freezes for missed days.',
        th: 'ระบบแผนการออมรองรับกฎหลายแบบ เช่น ออมเท่ากันทุกวัน หรือเพิ่มขึ้นทุกวัน และเพื่อลดความกดดัน ผมเพิ่มการติดตามสตรีกพร้อม Streak Freezes รายเดือนสำหรับวันที่พลาด',
      },
      result: {
        en: 'GO-OUT became a mobile-first shared savings scoreboard that helps small groups track goals, keep each other motivated, and protect trust without touching real bank accounts.',
        th: 'GO-OUT กลายเป็นกระดานคะแนนการออมร่วมกันบนมือถือที่ช่วยให้กลุ่มเล็กติดตามเป้าหมาย สร้างแรงจูงใจร่วมกัน และรักษาความน่าเชื่อถือโดยไม่แตะบัญชีธนาคารจริง',
      },
      contactHandoff: {
        en: 'That is GO-OUT: a savings app built around trust, privacy, and steady progress. If you want to talk through a product like this, I am one message away.',
        th: 'นี่คือ GO-OUT แอปออมเงินที่สร้างจากความน่าเชื่อถือ ความเป็นส่วนตัว และความคืบหน้าที่จับต้องได้ ถ้าอยากคุยเรื่องโปรดักต์แบบนี้ ทักผมมาได้เลย',
      },
      media: {
        hero: goOutG00,
        thumbs: [goOutG01, goOutG03, goOutG08],
        gallery: goOutGallery,
        video: goOutVideo,
        videoPoster: goOutG00,
      },
    },
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
