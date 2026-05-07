import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../hooks/useLanguage';
import styles from './About.module.css';

const content = {
  en: {
    secTitle: 'About',
    bio1: "I’m a first-year Computer Engineering student at Prince of Songkla University, Hat Yai campus. I’m interested in Front-end Development and creating simple, easy-to-use user experiences with attention to detail.",
    bio2: "Right now, I build websites using React and TypeScript. I care about clean UI, good performance, and writing code that can grow in the future. I enjoy learning by building personal projects, trying new ideas, and finding ways to make websites work better.",
    bio3: "I’m currently looking for an internship where I can gain real experience, learn from a development team, and improve my skills as a developer."
  },
  th: {
    secTitle: 'เกี่ยวกับ',
    bio1: 'ผมเป็นนักศึกษาชั้นปีที่ 1 สาขาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ สนใจด้าน Front-end Development และการออกแบบประสบการณ์ผู้ใช้ที่เรียบง่าย ใช้งานได้จริง และมีรายละเอียดที่ใส่ใจต่อผู้ใช้งาน',
    bio2: 'ปัจจุบันพัฒนาเว็บด้วย React และ TypeScript โดยให้ความสำคัญกับทั้งด้าน UI, performance และโครงสร้างโค้ดที่สามารถต่อยอดได้ในระยะยาว ผมชอบเรียนรู้ผ่านการลงมือทำจริง ไม่ว่าจะเป็นการสร้างโปรเจกต์ส่วนตัว ทดลองแนวคิดใหม่ๆ หรือศึกษาวิธีพัฒนาเว็บให้มีประสิทธิภาพมากขึ้น',
    bio3: 'ตอนนี้กำลังมองหาโอกาสฝึกงานที่เปิดโอกาสให้ได้ทำงานจริง ได้เรียนรู้จากทีมพัฒนา และพัฒนาทักษะของตัวเองให้เติบโตมากขึ้นในสายงานนี้'
  },
};

const snapshot = [
  { label: 'Studying', value: 'Computer Eng.', sub: 'Year 1 · PSU' },
  { label: 'Focus', value: 'Front-end', sub: 'React · TypeScript' },
  { label: 'Based in', value: 'Hat Yai', sub: 'Songkhla, TH' },
];

function About() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const { lang } = useLanguage();
  const c = content[lang];

  return (
    <section
      id="about"
      className={`${styles.about} reveal ${isVisible ? 'show' : ''}`}
      ref={ref}
    >
      <div className={styles.inner}>
        <div className={styles.secHeader}>
          <span className={styles.secTitle}>{c.secTitle}</span>
        </div>
        <div className={styles.grid}>
          <div className={styles.content}>
            <p className={styles.bio}>{c.bio1}</p>
            <p className={styles.bio}>{c.bio2}</p>
            {'bio3' in c && <p className={styles.bio}>{(c as typeof content.th).bio3}</p>}
          </div>
          <div className={styles.snapshot}>
            {snapshot.map((item) => (
              <div key={item.label} className={styles.snapItem}>
                <span className={styles.snapLabel}>{item.label}</span>
                <p className={styles.snapVal}>
                  <strong>{item.value}</strong><br />{item.sub}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.links}>
            <span className={styles.snapLabel}>Links</span>
            <a href="https://github.com/psu6810110229" target="_blank" rel="noreferrer" className={styles.link}>
              GitHub ↗
            </a>
            <a href="mailto:farnpatcharapon@gmail.com" className={styles.link}>
              Email ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
