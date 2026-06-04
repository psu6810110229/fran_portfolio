import { useLanguage } from '../hooks/useLanguage';
import franImg from '../assets/fran.jpg';
import styles from './Hero.module.css';

const content = {
  en: {
    intro: "Hi, I'm Fran.",
    headingPre: 'A developer who turns ideas',
    headingLine2: 'into ',
    headingAccent: 'real products',
    headingPost: '.',
    subhead:
      'First-year Computer Engineering student at PSU, building clean web interfaces with React and TypeScript.',
    btnPrimary: 'View Projects',
    btnGhost: 'Say hello →',
  },
  th: {
    intro: 'สวัสดีครับ ผมฟราน',
    headingPre: 'นักพัฒนาที่เปลี่ยนไอเดีย',
    headingLine2: 'ให้เป็น ',
    headingAccent: 'product',
    headingPost: ' จริง',
    subhead:
      'นักศึกษาปี 1 วิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยสงขลานครินทร์ สร้างเว็บที่ใช้ได้จริง ทั้งฝั่ง front-end และ back-end',
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
            {c.headingLine2 && <><br />{c.headingLine2}</>}
            <em className={styles.accent}>{c.headingAccent}</em>
            {c.headingPost}
          </h1>
          <p className={styles.subhead}>{c.subhead}</p>
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
