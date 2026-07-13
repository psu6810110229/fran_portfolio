import React, { useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import WordsPullUp from '../../components/Resume/WordsPullUp';
import WordsPullUpMultiStyle from '../../components/Resume/WordsPullUpMultiStyle';
import AnimatedLetter from '../../components/Resume/AnimatedLetter';
import styles from './Resume.module.css';

const Resume: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const aboutText =
    'As a Computer Engineering student, I thrive under pressure and solve problems methodically. But beyond the code, my experience hosting Open Houses has taught me the value of empathy and clear communication when engaging with youth.';
  const chars = aboutText.split('');

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1] as any, duration: 0.8 } },
  };

  return (
    <div className={styles.page}>
      {/* SECTION 1: HERO */}
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className={styles.videoBg}
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          />
          {/* Noise Overlay */}
          <div className={styles.noiseOverlay} />
          {/* Gradient Overlay */}
          <div className={styles.gradientOverlay} />

          {/* Navbar */}
          <div className={styles.navContainer}>
            <nav className={styles.navBar}>
              {['Back to Portfolio', 'My Story', 'Methodology', 'Experience', 'Skills', 'Contact'].map((item, i) => (
                <a
                  key={item}
                  href={i === 0 ? '/' : `#${item.toLowerCase()}`}
                  className={styles.navLink}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Hero Content */}
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
                A Year 2 Computer Engineering student at PSU. Highly logical, systematic, yet approachable. I build rigorous systems with an empathetic touch, ready to support the next generation of engineers.
              </motion.p>
              <motion.a
                href="#contact"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, ease: [0.16, 1, 0.3, 1] as any, duration: 0.8 }}
                className={styles.ctaButton}
              >
                <span className={styles.ctaText}>View Application</span>
                <div className={styles.ctaIconBox}>
                  <ArrowRight className={styles.ctaIcon} />
                </div>
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutInner}>
          <span className={styles.aboutBadge}>
            Systematic Thinker
          </span>
          
          <WordsPullUpMultiStyle
            containerClassName={styles.aboutTitle}
            segments={[
              { text: 'I am Fran, ', className: styles.aboutTitleNormal },
              { text: 'a builder of logical systems. ', className: styles.aboutTitleItalic },
              { text: 'I balance engineering precision with a soft, approachable demeanor.', className: styles.aboutTitleNormal },
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
      <section className={styles.featuresSection}>
        <div className={styles.featuresBgNoise} />
        
        <div className={styles.featuresInner}>
          <WordsPullUpMultiStyle
            containerClassName={styles.featuresTitle}
            segments={[
              { text: 'Rigorous execution. ', className: styles.featuresTitlePrimary },
              { text: 'Empathetic support.', className: styles.featuresTitleMuted },
            ]}
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className={styles.featuresGrid}
          >
            {/* Card 1 */}
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
                Under pressure.
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={cardVariants} className={styles.cardStandard}>
              <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85" alt="Icon" className={styles.cardIcon} />
              <div className={styles.cardNumber}>01</div>
              <h3 className={styles.cardTitle}>Systematic Approach.</h3>
              <ul className={styles.cardList}>
                {['Root cause analysis', 'Edge-case planning', 'Calm execution under stress'].map((item, i) => (
                  <li key={i} className={styles.cardListItem}>
                    <Check className={styles.cardListIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className={styles.cardLink}>
                Learn more
                <ArrowRight className={styles.cardLinkIcon} />
              </a>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={cardVariants} className={styles.cardStandard}>
              <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85" alt="Icon" className={styles.cardIcon} />
              <div className={styles.cardNumber}>02</div>
              <h3 className={styles.cardTitle}>Youth Engagement.</h3>
              <ul className={styles.cardList}>
                {['Active listening', 'Distilling complex ideas', 'Approachable mentorship'].map((item, i) => (
                  <li key={i} className={styles.cardListItem}>
                    <Check className={styles.cardListIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className={styles.cardLink}>
                Learn more
                <ArrowRight className={styles.cardLinkIcon} />
              </a>
            </motion.div>

            {/* Card 4 */}
            <motion.div variants={cardVariants} className={styles.cardStandard}>
              <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85" alt="Icon" className={styles.cardIcon} />
              <div className={styles.cardNumber}>03</div>
              <h3 className={styles.cardTitle}>Open House.</h3>
              <ul className={styles.cardList}>
                {['Guided lab tours', 'Live technical demos', 'Crowd management'].map((item, i) => (
                  <li key={i} className={styles.cardListItem}>
                    <Check className={styles.cardListIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className={styles.cardLink}>
                Learn more
                <ArrowRight className={styles.cardLinkIcon} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Resume;
