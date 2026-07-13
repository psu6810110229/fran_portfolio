import React, { useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import WordsPullUp from '../../components/Resume/WordsPullUp';
import WordsPullUpMultiStyle from '../../components/Resume/WordsPullUpMultiStyle';
import AnimatedLetter from '../../components/Resume/AnimatedLetter';
import Magnet from '../../components/Magnet/Magnet';
import Contact from '../../pages/Contact';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import styles from './Resume.module.css';

const dictionary = {
  en: {
    nav: [
      { label: 'Back to Portfolio', href: '/' },
      { label: 'My Story', href: '#about' },
      { label: 'Methodology', href: '#features' },
      { label: 'Contact', href: '#contact' }
    ],
    heroDesc: 'A Year 1 Computer Engineering student at PSU, passionate about web development and creating user-friendly digital experiences.',
    viewApp: 'Explore My Story',
    aboutBadge: 'Web Developer',
    about1a: 'Hi, I am ',
    about1b: 'Fran. ',
    about2: 'A Computer Engineering student ',
    about3: 'who enjoys learning new technologies and getting hands-on with real projects.',
    aboutFull: 'Currently studying Computer Engineering, which trains me to think analytically and solve problems methodically. Beyond coding, organizing events like the university Open House has helped me develop teamwork and communication skills, which I believe are just as important.',
    feat1: 'Learning & Development. ',
    feat2: 'Team Collaboration.',
    card1Label: 'Skills Learned',
    card2Title: 'Coding & Problem Solving',
    card2Items: ['Analytical thinking', 'Writing clean code', 'Eager to learn new tech'],
    card3Title: 'Teamwork & Communication',
    card3Items: ['Active listening', 'Clear communication', 'Supporting team members'],
    card4Title: 'Open House Activity',
    card4Items: ['Guiding high school students', 'Lab tours assistance', 'Event preparation'],
    learnMore: 'Learn more'
  },
  th: {
    nav: [
      { label: 'กลับสู่พอร์ตโฟลิโอ', href: '/' },
      { label: 'เรื่องราวของฉัน', href: '#about' },
      { label: 'วิธีการทำงาน', href: '#features' },
      { label: 'ติดต่อ', href: '#contact' }
    ],
    heroDesc: 'นักศึกษาวิศวกรรมคอมพิวเตอร์ปี 1 ม.สงขลานครินทร์ ที่หลงใหลในการพัฒนาเว็บไซต์และชื่นชอบการสร้างประสบการณ์ที่ดีให้กับผู้ใช้งาน',
    viewApp: 'ไปกันต่อ',
    aboutBadge: 'นักพัฒนาเว็บไซต์',
    about1a: 'สวัสดีครับ ',
    about1b: 'ผมฟาน ',
    about2: 'นักศึกษาวิศวกรรมคอมพิวเตอร์ ',
    about3: 'ที่สนุกกับการเรียนรู้เทคโนโลยีใหม่ๆ และชอบลงมือทำโปรเจกต์',
    aboutFull: 'ปัจจุบันผมกำลังศึกษาในสาขาวิศวกรรมคอมพิวเตอร์ ซึ่งช่วยฝึกให้ผมคิดวิเคราะห์และแก้ปัญหาอย่างเป็นระบบ นอกจากเรื่องเรียนแล้ว ผมยังมีโอกาสจัดกิจกรรมอย่าง Open House ที่ช่วยฝึกทักษะการสื่อสารและการทำงานเป็นทีม ซึ่งผมมองว่าสำคัญไม่แพ้กันครับ',
    feat1: 'การเรียนรู้และพัฒนา ',
    feat2: 'การทำกิจกรรมร่วมกับทีม',
    card1Label: 'ทักษะที่ได้เรียนรู้',
    card2Title: 'ด้านการเขียนโค้ด',
    card2Items: ['วิเคราะห์และแก้ปัญหา', 'เขียนโค้ดที่เป็นระเบียบ', 'พร้อมเรียนรู้เทคโนโลยีใหม่ๆ'],
    card3Title: 'ด้านการทำงานเป็นทีม',
    card3Items: ['รับฟังความคิดเห็น', 'สื่อสารให้เข้าใจง่าย', 'ช่วยเหลือเพื่อนร่วมทีม'],
    card4Title: 'กิจกรรม Open House',
    card4Items: ['แนะนำน้องๆ มัธยม', 'พาทัวร์ห้องปฏิบัติการ', 'ช่วยจัดเตรียมงาน'],
    learnMore: 'เรียนรู้เพิ่มเติม'
  }
};

const Resume: React.FC = () => {
  const { lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = dictionary[lang];

  const aboutRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = t.aboutFull.split('');

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1] as any, duration: 0.8 } },
  };

  return (
    <div className={styles.page}>
      {/* SECTION 1: HERO */}
      <section id="hero" className={styles.heroSection}>
        <div className={styles.heroInner}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className={styles.videoBg}
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          />
          <div className={styles.noiseOverlay} />
          <div className={styles.gradientOverlay} />

          <div className={styles.navContainer}>
            <nav className={styles.navBar}>
              <div className={styles.navLinks}>
                {t.nav.map((item) => (
                  <Magnet
                    key={item.label}
                    padding={20}
                    disabled={false}
                    magnetStrength={4}
                    activeTransition="transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)"
                  >
                    <a href={item.href} className={styles.navLink}>
                      {item.label}
                    </a>
                  </Magnet>
                ))}
              </div>
              <div className={styles.navToggles}>
                <button
                  className={styles.langToggle}
                  onClick={toggleLang}
                  aria-label={`Switch to ${lang === 'en' ? 'Thai' : 'English'}`}
                >
                  {lang === 'en' ? 'EN' : 'TH'}
                </button>
                <button
                  className={styles.themeToggle}
                  onClick={toggleTheme}
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  <span key={theme} className={styles.icon}>
                    {theme === 'dark' ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="5"/>
                        <line x1="12" y1="2" x2="12" y2="4"/>
                        <line x1="12" y1="20" x2="12" y2="22"/>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                        <line x1="2" y1="12" x2="4" y2="12"/>
                        <line x1="20" y1="12" x2="22" y2="12"/>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                      </svg>
                    )}
                  </span>
                </button>
              </div>
            </nav>
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <WordsPullUp
                text="Patcharapon"
                showAsterisk={true}
                className={styles.heroTitle}
              />
            </div>
            <div className={styles.heroRight}>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, ease: [0.16, 1, 0.3, 1] as any, duration: 0.8 }}
                className={styles.heroDesc}
              >
                {t.heroDesc}
              </motion.p>
              <Magnet
                padding={30}
                disabled={false}
                magnetStrength={3}
                activeTransition="transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
              >
                <motion.a
                  href="#about"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, ease: [0.16, 1, 0.3, 1] as any, duration: 0.8 }}
                  className={styles.ctaButton}
                >
                  <span className={styles.ctaText}>{t.viewApp}</span>
                  <div className={styles.ctaIconBox}>
                    <ArrowRight className={styles.ctaIcon} />
                  </div>
                </motion.a>
              </Magnet>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section id="about" className={styles.aboutSection}>
        <div className={styles.aboutInner}>

          
          <WordsPullUpMultiStyle
            key={lang}
            containerClassName={styles.aboutTitle}
            segments={[
              { text: t.about1a, className: styles.aboutTitleNormal },
              { text: t.about1b, className: styles.aboutTitleHighlight },
              { text: t.about2, className: styles.aboutTitleItalic },
              { text: t.about3, className: styles.aboutTitleNormal },
            ]}
          />

          <p ref={aboutRef} className={styles.aboutRevealText}>
            {chars.map((char, i) => (
              <AnimatedLetter key={i} progress={scrollYProgress} charProgress={i / chars.length}>
                {char}
              </AnimatedLetter>
            ))}
          </p>
        </div>
      </section>

      {/* SECTION 3: FEATURES */}
      <section id="features" className={styles.featuresSection}>
        <div className={styles.featuresBgNoise} />
        
        <div className={styles.featuresInner}>
          <WordsPullUpMultiStyle
            key={lang}
            containerClassName={styles.featuresTitle}
            segments={[
              { text: t.feat1, className: styles.featuresTitlePrimary },
              { text: t.feat2, className: styles.featuresTitleMuted },
            ]}
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className={styles.featuresGrid}
          >
            <motion.div variants={cardVariants} className={styles.cardVideo}>
              <video
                autoPlay
                loop
                muted
                playsInline
                className={styles.cardVideoInner}
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              />
              <div className={styles.cardVideoOverlay} />
              <div className={styles.cardVideoLabel}>
                {t.card1Label}
              </div>
            </motion.div>

            <motion.div variants={cardVariants} className={styles.cardStandard}>
              <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85" alt="Icon" className={styles.cardIcon} />
              <div className={styles.cardNumber}>01</div>
              <h3 className={styles.cardTitle}>{t.card2Title}</h3>
              <ul className={styles.cardList}>
                {t.card2Items.map((item, i) => (
                  <li key={i} className={styles.cardListItem}>
                    <Check className={styles.cardListIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className={styles.cardLink}>
                {t.learnMore}
                <ArrowRight className={styles.cardLinkIcon} />
              </a>
            </motion.div>

            <motion.div variants={cardVariants} className={styles.cardStandard}>
              <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85" alt="Icon" className={styles.cardIcon} />
              <div className={styles.cardNumber}>02</div>
              <h3 className={styles.cardTitle}>{t.card3Title}</h3>
              <ul className={styles.cardList}>
                {t.card3Items.map((item, i) => (
                  <li key={i} className={styles.cardListItem}>
                    <Check className={styles.cardListIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className={styles.cardLink}>
                {t.learnMore}
                <ArrowRight className={styles.cardLinkIcon} />
              </a>
            </motion.div>

            <motion.div variants={cardVariants} className={styles.cardStandard}>
              <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85" alt="Icon" className={styles.cardIcon} />
              <div className={styles.cardNumber}>03</div>
              <h3 className={styles.cardTitle}>{t.card4Title}</h3>
              <ul className={styles.cardList}>
                {t.card4Items.map((item, i) => (
                  <li key={i} className={styles.cardListItem}>
                    <Check className={styles.cardListIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className={styles.cardLink}>
                {t.learnMore}
                <ArrowRight className={styles.cardLinkIcon} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: CONTACT */}
      <Contact />
    </div>
  );
};

export default Resume;
