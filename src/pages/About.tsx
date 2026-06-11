import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useLanguage } from '../hooks/useLanguage';
import styles from './About.module.css';

interface OwnItem {
  num: string;
  title: string;
  desc: string;
}

interface AboutCopy {
  secTitle: string;
  leadPre: string;
  leadAccent: string;
  leadPost: string;
  body: string;
  own: OwnItem[];
}

const content: Record<'en' | 'th', AboutCopy> = {
  en: {
    secTitle: 'About',
    leadPre: "I'm a first-year Computer Engineering student at Prince of Songkla University who builds web products ",
    leadAccent: 'end to end',
    leadPost: '.',
    body: "I take an idea, plan it, design the interface, and write the front-end and the APIs behind it, thinking about the person using the product rather than only the screen. I've led a team build from first sketch to a working result, and I'm now looking for an internship to keep building with people who do this every day.",
    own: [
      { num: '01', title: 'Plan', desc: 'Turn a rough idea into a clear scope and a path to build it.' },
      { num: '02', title: 'Build', desc: 'Write the front-end and the APIs behind it. Across the stack, not just the screen.' },
      { num: '03', title: 'Ship', desc: 'Debug, deliver, and keep a team moving to something that works.' },
    ],
  },
  th: {
    secTitle: 'เกี่ยวกับ',
    leadPre: 'ผมเป็นนักศึกษาปี 1 วิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยสงขลานครินทร์ ที่ลงมือสร้างเว็บ product ',
    leadAccent: 'จากไอเดียถึงมือผู้ใช้',
    leadPost: '',
    body: 'ในการทำงาน ผมให้ความสำคัญกับการมองภาพรวมของระบบ เริ่มตั้งแต่การออกแบบสถาปัตยกรรม ไปจนถึงการเขียนโค้ดทั้งฝั่ง Front-end และ Backend โดยคำนึงถึงประสบการณ์ของผู้ใช้เป็นหลัก ที่ผ่านมาผมมีโอกาสได้ทำงานร่วมกับทีมในหลายบทบาท และพร้อมที่จะพัฒนาทักษะเพิ่มเติมผ่านการฝึกงานในสภาพแวดล้อมการทำงานจริง',
    own: [
      { num: '01', title: 'System Design', desc: 'แปลงความต้องการของโปรเจกต์ให้เป็นโครงสร้างระบบที่ชัดเจน และวางแผนการพัฒนาอย่างเป็นขั้นตอน' },
      { num: '02', title: 'Full-Stack Build', desc: 'พัฒนาทั้งระบบ Front-end ที่ตอบสนองการใช้งาน และ Backend API ที่รองรับการจัดการข้อมูลอย่างมีประสิทธิภาพ' },
      { num: '03', title: 'Quality & Launch', desc: 'ตรวจสอบคุณภาพโค้ด แก้ไขปัญหา และจัดการกระบวนการส่งมอบงานร่วมกับทีม' },
    ],
  },
};

/* ── Entrance choreography ──
   Section reveals once on scroll: prose first, then the numbered list
   staggers its items. Same easing family as the bento section. */
const aboutEase = [0.22, 1, 0.36, 1] as const;

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: aboutEase } },
};

/* Hero's last item starts at 0.66s; let About begin as that fade settles
   so the sequence reads navbar → hero → about without a dead gap. */
const HERO_SETTLE_MS = 900;

function About() {
  const { lang } = useLanguage();
  const c = content[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '0px 0px -120px 0px' });
  const [heroDone, setHeroDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroDone(true), HERO_SETTLE_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.section
      id="about"
      ref={sectionRef}
      className={styles.about}
      variants={sectionVariants}
      initial="hidden"
      animate={inView && heroDone ? 'show' : 'hidden'}
    >
      <div className={styles.inner}>
        <motion.div className={styles.secHeader} variants={itemVariants}>
          <span className={styles.secTitle}>{c.secTitle}</span>
          <span className={styles.secLine} aria-hidden="true" />
        </motion.div>
        <div className={styles.grid}>
          <div className={styles.prose}>
            <motion.p className={styles.lead} variants={itemVariants}>
              {c.leadPre}<span className={styles.leadAccent}>{c.leadAccent}</span>{c.leadPost}
            </motion.p>
            <motion.p className={styles.body} variants={itemVariants}>{c.body}</motion.p>
          </div>

          <motion.ol className={styles.own} variants={listVariants}>
            {c.own.map((item) => (
              <motion.li key={item.num} className={styles.ownItem} variants={itemVariants}>
                <span className={styles.ownNum}>{item.num}</span>
                <div>
                  <span className={styles.ownTitle}>{item.title}</span>
                  <p className={styles.ownDesc}>{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>


        </div>
      </div>
    </motion.section>
  );
}

export default About;
