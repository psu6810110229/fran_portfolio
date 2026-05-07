import { useTyping } from '../hooks/useTyping';
import { useLanguage } from '../hooks/useLanguage';
import franImg from '../assets/fran.jpg';
import styles from './Hero.module.css';

const roles = ['Front-end Developer', 'Problem Solver', 'Builder', 'Learner'];

const content = {
  en: { badge: 'Open to internship · 2026', btnPrimary: 'View Projects', btnGhost: 'Say hello →' },
  th: { badge: 'ผมพร้อมที่จะออกจากคอมฟอร์ทโซนและเรียนรู้อยู่เสมอครับ', btnPrimary: 'รายละเอียด', btnGhost: 'ติดต่อผมได้ที่นี่' },
};

function Hero() {
  const typed = useTyping(roles);
  const { lang } = useLanguage();

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarRing} aria-hidden="true" />
          <img src={franImg} alt="Fran" className={styles.avatar} />
          <div className={styles.avatarDot} aria-hidden="true" />
        </div>

        <div className={styles.text}>
          <div className={styles.titleGroup}>
            <h1 className={styles.heading}>
              Hi, I'm <em className={styles.accent}>Fran</em>.
            </h1>
            <div className={styles.badge}>
              <span>{content[lang].badge}</span>
            </div>
          </div>
          <p className={styles.role} aria-label={typed}>
            <span aria-hidden="true">{typed}</span>
            <span className={styles.caret} aria-hidden="true" />
          </p>
          <div className={styles.btns}>
            <a href="#projects" className={styles.btnPrimary}>{content[lang].btnPrimary}</a>
            <a href="#contact" className={styles.btnGhost}>{content[lang].btnGhost}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
