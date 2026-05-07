import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../hooks/useLanguage';
import styles from './About.module.css';

const content = {
  en: {
    secTitle: 'About',
    bio1: "I'm a first-year Computer Engineering student at Prince of Songkla University (PSU), Hat Yai. I build front-end interfaces with React and TypeScript — focused on clean, minimal UI that actually works.",
    bio2: "Outside of class I'm exploring web performance, design systems, and picking up new tools. I'm currently open to internship opportunities where I can contribute and keep learning.",
  },
  th: {
    secTitle: 'เกี่ยวกับ',
    bio1: 'ผมเป็นนักศึกษาชั้นปีที่ 1 สาขาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยสงขลานครินทร์ (ม.อ.) หาดใหญ่ พัฒนา front-end ด้วย React และ TypeScript โดยเน้น UI ที่เรียบง่ายและใช้งานได้จริง',
    bio2: 'นอกเวลาเรียน ผมสนใจ web performance, design systems และเครื่องมือใหม่ๆ ตอนนี้กำลังมองหาโอกาสฝึกงานที่จะได้ลงมือทำจริงและเรียนรู้เพิ่มเติม',
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
      <div className={styles.snapshot}>
        <div className={styles.snapshotInner}>
          {snapshot.map((item) => (
            <div key={item.label} className={styles.snapItem}>
              <span className={styles.snapLabel}>{item.label}</span>
              <p className={styles.snapVal}>
                <strong>{item.value}</strong><br />{item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.secHeader}>
          <span className={styles.secTitle}>{c.secTitle}</span>
        </div>
        <div className={styles.content}>
          <p className={styles.bio}>{c.bio1}</p>
          <p className={styles.bio}>{c.bio2}</p>
        </div>
      </div>
    </section>
  );
}

export default About;
