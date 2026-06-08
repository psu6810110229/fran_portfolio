import { motion } from 'motion/react';
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
    body: 'ผมรับโจทย์มาหนึ่งไอเดีย วางแผน ออกแบบหน้าจอ และเขียนทั้งฝั่ง front-end และ API ที่อยู่เบื้องหลัง โดยคิดถึงคนที่ใช้งานจริง ไม่ใช่แค่หน้าจอ ผมเคยนำทีมสร้างงานตั้งแต่ภาพร่างแรกจนออกมาเป็นผลงานที่ใช้ได้จริง และตอนนี้กำลังมองหาที่ฝึกงานเพื่อพัฒนาฝีมือไปกับคนที่ทำงานสายนี้ทุกวัน',
    own: [
      { num: '01', title: 'วางแผน', desc: 'เปลี่ยนไอเดียคร่าวๆ ให้เป็นขอบเขตงานที่ชัดและแผนที่ลงมือทำได้จริง' },
      { num: '02', title: 'ลงมือสร้าง', desc: 'เขียนทั้ง front-end และ API เบื้องหลัง ทำได้ทั้งสองฝั่ง ไม่ใช่แค่หน้าจอ' },
      { num: '03', title: 'ส่งมอบ', desc: 'ไล่แก้บั๊ก ส่งงาน และพาทีมไปให้ถึงผลงานที่ใช้งานได้จริง' },
    ],
  },
};

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

function About() {
  const { lang } = useLanguage();
  const c = content[lang];

  return (
    <motion.section
      id="about"
      className={styles.about}
      {...revealProps}
    >
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.prose}>
            <p className={styles.lead}>
              {c.leadPre}<span className={styles.leadAccent}>{c.leadAccent}</span>{c.leadPost}
            </p>
            <p className={styles.body}>{c.body}</p>
          </div>

          <ol className={styles.own}>
            {c.own.map((item) => (
              <li key={item.num} className={styles.ownItem}>
                <span className={styles.ownNum}>{item.num}</span>
                <div>
                  <span className={styles.ownTitle}>{item.title}</span>
                  <p className={styles.ownDesc}>{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>


        </div>
      </div>
    </motion.section>
  );
}

export default About;
