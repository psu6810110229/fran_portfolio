import { useLanguage } from '../hooks/useLanguage';
import franImg from '../assets/fran-profile.jpg';
import githubIcon from '../assets/icons/github.svg';
import linkedinIcon from '../assets/icons/linkedin.svg';
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
    btnGhost: 'Say hello',
  },
  th: {
    intro: 'สวัสดีครับ ผมฟราน',
    headingPre: 'เปลี่ยนไอเดียบนกระดาษ',
    headingLine2: 'ให้เป็น ',
    headingAccent: 'Web Product',
    headingPost: 'ที่ใช้งานได้จริง',
    subhead:
      'นักศึกษาชั้นปีที่ 2 วิศวกรรมคอมพิวเตอร์ ม.อ. มีประสบการณ์พัฒนาเว็บแอปพลิเคชันแบบ Full-Stack สนใจการสร้างโปรดักต์ที่แก้ปัญหาได้จริง',
    btnPrimary: 'ดูผลงาน',
    btnGhost: 'ทักทายกัน',
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
            {lang === 'th' ? (
              <>
                <br />
                {c.headingPost}
                <span className={styles.cursor} aria-hidden="true">|</span>
              </>
            ) : (
              c.headingPost
            )}
          </h1>
          <p className={styles.subhead}>{c.subhead}</p>
          <div className={styles.btns}>
            <a href="#projects" className={styles.btnPrimary}>{c.btnPrimary}</a>
            <a href="#contact" className={styles.btnGhost}>
              <span>{c.btnGhost}</span>
            </a>
            <a href="https://github.com/psu6810110229" target="_blank" rel="noreferrer" className={styles.socialButton} aria-label="GitHub">
              <img src={githubIcon} alt="" aria-hidden="true" className={styles.socialIcon} />
            </a>
            <a href="https://www.linkedin.com/in/patcharapon-matsuden-864883413" target="_blank" rel="noreferrer" className={styles.socialButton} aria-label="LinkedIn">
              <img src={linkedinIcon} alt="" aria-hidden="true" className={styles.socialIcon} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

