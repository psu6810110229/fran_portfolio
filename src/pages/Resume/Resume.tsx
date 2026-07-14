import React from 'react';
import { motion, useMotionValue } from 'motion/react';
import { useLenis } from 'lenis/react';
import { ArrowRight, Check } from 'lucide-react';
import WordsPullUp from '../../components/Resume/WordsPullUp';
import WordsPullUpMultiStyle from '../../components/Resume/WordsPullUpMultiStyle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { DockItem } from '../../components/DockItem/DockItem';
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
    heroDesc: 'A Year 2 Computer Engineering student at PSU who learns by building real products and working closely with people.',
    viewApp: 'Explore My Story',
    aboutBadge: 'Web Developer',
    about1a: 'Hi, I am ',
    about1b: 'Fran. ',
    about2: 'A Year 2 Computer Engineering student at PSU ',
    about3: 'who learns by building real products and working with people.',
    aboutFull: 'I am a Year 2 Computer Engineering student at PSU. Organizing Hat Yai Open House 2026 taught me to prepare equipment, coordinate people, and stay calm when problems appeared. I am still growing, but I take responsibility for the next step and learn from the people around me.',
    feat1: 'What I am learning. ',
    feat2: 'How I work with people.',
    card1Label: 'Skills Learned',
    card2Title: 'Thinking & Learning',
    card2Items: ['Breaking problems into steps', 'Building and testing as I learn', 'Turning feedback into improvements'],
    card3Title: 'Working With People',
    card3Items: ['Listening before acting', 'Keeping teammates updated', 'Helping people find the next step'],
    card4Title: 'Hat Yai Open House 2026',
    card4Items: ['Preparing rooms and equipment', 'Guiding visiting students', 'Helping with queues and unexpected issues'],
    card2Link: 'Read my story',
    card3Link: 'Start a conversation',
    card4Link: 'Read my story'
  },
  th: {
    nav: [
      { label: 'กลับสู่พอร์ตโฟลิโอ', href: '/' },
      { label: 'เรื่องราวของฉัน', href: '#about' },
      { label: 'วิธีการทำงาน', href: '#features' },
      { label: 'ติดต่อ', href: '#contact' }
    ],
    heroDesc: 'นักศึกษาวิศวกรรมคอมพิวเตอร์ชั้นปีที่ 2 ม.สงขลานครินทร์ ที่เรียนรู้จากการลงมือสร้างผลงานจริงและการทำงานร่วมกับผู้คน',
    viewApp: 'ไปกันต่อ',
    aboutBadge: 'นักพัฒนาเว็บไซต์',
    about1a: 'สวัสดีครับ ',
    about1b: 'ผมฟาน ',
    about2: 'นักศึกษาวิศวกรรมคอมพิวเตอร์ชั้นปีที่ 2 มหาวิทยาลัยสงขลานครินทร์ ',
    about3: 'ที่เรียนรู้จากการลงมือทำและการทำงานร่วมกับผู้คน',
    aboutFull: 'ผมเป็นนักศึกษาวิศวกรรมคอมพิวเตอร์ชั้นปีที่ 2 มหาวิทยาลัยสงขลานครินทร์ การจัดงาน Open House หาดใหญ่ 2026 สอนให้ผมเตรียมอุปกรณ์ ประสานงานกับผู้คน และรับมือกับปัญหาที่เกิดขึ้นหน้างาน ผมยังคงพัฒนาตัวเอง แต่พร้อมรับผิดชอบขั้นตอนถัดไปและเรียนรู้จากคนรอบตัวครับ',
    feat1: 'สิ่งที่กำลังเรียนรู้ ',
    feat2: 'และวิธีทำงานร่วมกับผู้คน',
    card1Label: 'ทักษะที่ได้เรียนรู้',
    card2Title: 'การคิดและการเรียนรู้',
    card2Items: ['แบ่งปัญหาเป็นขั้นตอน', 'ลงมือทำและตรวจสอบงาน', 'นำคำแนะนำไปปรับปรุง'],
    card3Title: 'การทำงานร่วมกับผู้คน',
    card3Items: ['รับฟังก่อนลงมือทำ', 'สื่อสารสถานะให้ทีมรู้', 'ช่วยให้ทีมเห็นขั้นตอนถัดไป'],
    card4Title: 'งาน Open House หาดใหญ่ 2026',
    card4Items: ['เตรียมอุปกรณ์และตรวจความพร้อม', 'แนะนำน้องๆ และพาชมห้องแล็บ', 'ช่วยจัดคิวและรับมือกับปัญหาหน้างาน'],
    card2Link: 'อ่านเรื่องราวของผม',
    card3Link: 'เริ่มพูดคุยกัน',
    card4Link: 'อ่านเรื่องราวของผม'
  }
};

const Resume: React.FC = () => {
  const { lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = dictionary[lang];

  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);
  const [enableDockEffect, setEnableDockEffect] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMediaState = () => {
      setEnableDockEffect(pointerQuery.matches && !reducedMotionQuery.matches);
      setPrefersReducedMotion(reducedMotionQuery.matches);
    };

    updateMediaState();
    pointerQuery.addEventListener('change', updateMediaState);
    reducedMotionQuery.addEventListener('change', updateMediaState);

    const handleMouseMove = (e: MouseEvent) => {
      if (pointerQuery.matches && !reducedMotionQuery.matches) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      pointerQuery.removeEventListener('change', updateMediaState);
      reducedMotionQuery.removeEventListener('change', updateMediaState);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const lenis = useLenis();
  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (lenis) {
        lenis.scrollTo(href, { duration: 1.5, immediate: reduce, easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t) });
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1] as const, duration: prefersReducedMotion ? 0 : 0.8 } },
  };

  return (
    <div className={styles.page}>
      {/* SECTION 1: HERO */}
      <section id="hero" aria-labelledby="resume-hero-title" className={styles.heroSection}>
        <div className={styles.heroInner}>
          <video
            autoPlay={!prefersReducedMotion}
            loop
            muted
            playsInline
            preload={prefersReducedMotion ? 'none' : 'metadata'}
            aria-hidden="true"
            tabIndex={-1}
            className={styles.videoBg}
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          />
          <div className={styles.noiseOverlay} />
          <div className={styles.gradientOverlay} />

          <div className={styles.navContainer}>
            <nav className={styles.navBar}>
              <div className={styles.navLinks}>
                {t.nav.map((item) => (
                  <DockItem key={item.label} mouseX={mouseX} mouseY={mouseY} isDesktop={enableDockEffect} as="a" href={item.href} className={styles.navLink} onClick={(e) => handleNavClick(e, item.href)}>
                    {item.label}
                  </DockItem>
                ))}
              </div>
              <div className={styles.navToggles}>
                <DockItem mouseX={mouseX} mouseY={mouseY} isDesktop={enableDockEffect}>
                  <button
                    className={styles.langToggle}
                    onClick={toggleLang}
                    aria-label={`Switch to ${lang === 'en' ? 'Thai' : 'English'}`}
                  >
                    {lang === 'en' ? 'EN' : 'TH'}
                  </button>
                </DockItem>
                <DockItem mouseX={mouseX} mouseY={mouseY} isDesktop={enableDockEffect}>
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
                </DockItem>
              </div>
            </nav>
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <WordsPullUp
                text="Patcharapon"
                showAsterisk={true}
                as="h1"
                id="resume-hero-title"
                className={styles.heroTitle}
              />
            </div>
            <div className={styles.heroRight}>
              <motion.p
                initial={prefersReducedMotion ? false : { y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] as const, duration: prefersReducedMotion ? 0 : 0.8 }}
                className={styles.heroDesc}
              >
                {t.heroDesc}
              </motion.p>
              <motion.a
                href="#about"
                initial={prefersReducedMotion ? false : { y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] as const, duration: prefersReducedMotion ? 0 : 0.8 }}
                className={styles.ctaButton}
                onClick={(e) => handleNavClick(e, '#about')}
              >
                <span className={styles.ctaText}>{t.viewApp}</span>
                <div className={styles.ctaIconBox}>
                  <ArrowRight className={styles.ctaIcon} />
                </div>
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section id="about" aria-labelledby="resume-about-title" className={styles.aboutSection}>
        <div className={styles.aboutInner}>

          
          <WordsPullUpMultiStyle
            key={lang}
            as="h2"
            id="resume-about-title"
            containerClassName={styles.aboutTitle}
            segments={[
              { text: t.about1a, className: styles.aboutTitleNormal },
              { text: t.about1b, className: styles.aboutTitleHighlight },
              { text: t.about2, className: styles.aboutTitleItalic },
              { text: t.about3, className: styles.aboutTitleNormal },
            ]}
          />

          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={1}
            textClassName={styles.aboutRevealText}
          >
            {t.aboutFull}
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3: FEATURES */}
      <section id="features" aria-labelledby="resume-features-title" className={styles.featuresSection}>
        <div className={styles.featuresBgNoise} />
        
        <div className={styles.featuresInner}>
          <WordsPullUpMultiStyle
            key={lang}
            as="h2"
            id="resume-features-title"
            containerClassName={styles.featuresTitle}
            segments={[
              { text: t.feat1, className: styles.featuresTitlePrimary },
              { text: t.feat2, className: styles.featuresTitleMuted },
            ]}
          />

          <motion.div
            initial={prefersReducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className={styles.featuresGrid}
          >
            <motion.div variants={cardVariants} className={styles.cardVideo}>
              <video
                autoPlay={!prefersReducedMotion}
                loop
                muted
                playsInline
                preload="none"
                aria-hidden="true"
                tabIndex={-1}
                className={styles.cardVideoInner}
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              />
              <div className={styles.cardVideoOverlay} />
              <div className={styles.cardVideoLabel}>
                {t.card1Label}
              </div>
            </motion.div>

            <motion.div variants={cardVariants} className={styles.cardStandard}>
              <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85" alt={t.card2Title} loading="lazy" decoding="async" className={styles.cardIcon} />
              <h3 className={styles.cardTitle}>{t.card2Title}</h3>
              <ul className={styles.cardList}>
                {t.card2Items.map((item, i) => (
                  <li key={i} className={styles.cardListItem}>
                    <Check className={styles.cardListIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className={styles.cardLink}>
                {t.card2Link}
                <ArrowRight className={styles.cardLinkIcon} />
              </a>
            </motion.div>

            <motion.div variants={cardVariants} className={styles.cardStandard}>
              <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85" alt={t.card3Title} loading="lazy" decoding="async" className={styles.cardIcon} />
              <h3 className={styles.cardTitle}>{t.card3Title}</h3>
              <ul className={styles.cardList}>
                {t.card3Items.map((item, i) => (
                  <li key={i} className={styles.cardListItem}>
                    <Check className={styles.cardListIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className={styles.cardLink}>
                {t.card3Link}
                <ArrowRight className={styles.cardLinkIcon} />
              </a>
            </motion.div>

            <motion.div variants={cardVariants} className={styles.cardStandard}>
              <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85" alt={t.card4Title} loading="lazy" decoding="async" className={styles.cardIcon} />
              <h3 className={styles.cardTitle}>{t.card4Title}</h3>
              <ul className={styles.cardList}>
                {t.card4Items.map((item, i) => (
                  <li key={i} className={styles.cardListItem}>
                    <Check className={styles.cardListIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className={styles.cardLink}>
                {t.card4Link}
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
