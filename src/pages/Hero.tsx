import { useLanguage } from '../hooks/useLanguage';
import franImg from '../assets/fran.jpg';
import styles from './Hero.module.css';

const content = {
  en: {
    intro: "Hi, I'm Fran.",
    headingPre: 'Front-end developer who cares about the ',
    headingAccent: 'half-pixel',
    headingPost: '.',
    subhead:
      'First-year Computer Engineering student at PSU, building clean web interfaces with React and TypeScript.',
    badge: 'Open to internship · 2026',
    btnPrimary: 'View Projects',
    btnGhost: 'Say hello →',
  },
  th: {
    intro: 'สวัสดีครับ ผมฟราน',
    headingPre: 'นักพัฒนา Front-end ที่ใส่ใจรายละเอียดระดับ',
    headingAccent: 'ครึ่งพิกเซล',
    headingPost: '',
    subhead:
      'นักศึกษาปี 1 วิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยสงขลานครินทร์ พัฒนาเว็บด้วย React และ TypeScript',
    badge: 'เปิดรับฝึกงาน · 2026',
    btnPrimary: 'ดูผลงาน',
    btnGhost: 'ทักทายกัน →',
  },
};

function Hero() {
  const { lang } = useLanguage();
  const c = content[lang];

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarRing} aria-hidden="true" />
          <img src={franImg} alt="Fran" className={styles.avatar} />
          <div className={styles.avatarDot} aria-hidden="true" />
        </div>

        <div className={styles.text}>
          <p className={styles.intro}>{c.intro}</p>
          <h1 className={styles.heading}>
            {c.headingPre}
            <em className={styles.accent}>{c.headingAccent}</em>
            {c.headingPost}
          </h1>
          <p className={styles.subhead}>{c.subhead}</p>
          <div className={styles.badge}>
            <span>{c.badge}</span>
          </div>
          <div className={styles.btns}>
            <a href="#projects" className={styles.btnPrimary}>{c.btnPrimary}</a>
            <a href="#contact" className={styles.btnGhost}>{c.btnGhost}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
