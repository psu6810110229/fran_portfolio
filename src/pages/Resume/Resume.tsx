import React, { useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import WordsPullUp from '../../components/Resume/WordsPullUp';
import WordsPullUpMultiStyle from '../../components/Resume/WordsPullUpMultiStyle';
import AnimatedLetter from '../../components/Resume/AnimatedLetter';
import '../../styles/resume.css'; // Load scoped Tailwind classes

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
    <div id="prisma-root" className="tw-bg-black tw-text-primary tw-min-h-screen tw-font-sans tw-antialiased selection:tw-bg-primary/30">
      {/* SECTION 1: HERO */}
      <section className="tw-h-screen tw-p-4 md:tw-p-6">
        <div className="tw-relative tw-w-full tw-h-full tw-rounded-2xl md:tw-rounded-[2rem] tw-overflow-hidden tw-bg-black">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          />
          {/* Noise Overlay */}
          <div className="noise-overlay tw-absolute tw-inset-0 tw-opacity-[0.7] tw-mix-blend-overlay tw-pointer-events-none" />
          {/* Gradient Overlay */}
          <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-b tw-from-black/30 tw-via-transparent tw-to-black/60 tw-pointer-events-none" />

          {/* Navbar */}
          <div className="tw-absolute tw-top-0 tw-left-1/2 tw--translate-x-1/2 tw-z-50">
            <nav className="tw-bg-black tw-rounded-b-2xl md:tw-rounded-b-3xl tw-px-4 tw-py-2 md:tw-px-8 tw-flex tw-items-center tw-gap-3 sm:tw-gap-6 md:tw-gap-12 lg:tw-gap-14">
              {['Back to Portfolio', 'My Story', 'Methodology', 'Experience', 'Skills', 'Contact'].map((item, i) => (
                <a
                  key={item}
                  href={i === 0 ? '/' : `#${item.toLowerCase()}`}
                  className="tw-text-[10px] sm:tw-text-xs md:tw-text-sm tw-transition-colors tw-duration-300 tw-whitespace-nowrap"
                  style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)')}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Hero Content */}
          <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-p-6 md:tw-p-10 tw-grid tw-grid-cols-12 tw-gap-4 tw-items-end">
            <div className="tw-col-span-12 md:tw-col-span-8">
              <WordsPullUp
                text="Patcharapon"
                showAsterisk={true}
                className="tw-text-[26vw] sm:tw-text-[24vw] md:tw-text-[22vw] lg:tw-text-[20vw] xl:tw-text-[19vw] 2xl:tw-text-[20vw] tw-font-medium tw-leading-[0.85] tw-tracking-[-0.07em] tw-text-[#E1E0CC]"
              />
            </div>
            <div className="tw-col-span-12 md:tw-col-span-4 tw-flex tw-flex-col tw-items-start md:tw-items-end tw-text-left md:tw-text-right tw-gap-6 md:tw-gap-8 tw-mb-2 md:tw-mb-4">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, ease: [0.16, 1, 0.3, 1] as any, duration: 0.8 }}
                className="tw-text-primary/70 tw-text-xs sm:tw-text-sm md:tw-text-base tw-leading-[1.2] tw-max-w-sm"
              >
                A Year 2 Computer Engineering student at PSU. Highly logical, systematic, yet approachable. I build rigorous systems with an empathetic touch, ready to support the next generation of engineers.
              </motion.p>
              <motion.a
                href="#contact"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, ease: [0.16, 1, 0.3, 1] as any, duration: 0.8 }}
                className="tw-group tw-flex tw-items-center tw-gap-2 hover:tw-gap-3 tw-bg-primary tw-text-black tw-rounded-full tw-pl-5 tw-pr-1 tw-py-1 tw-transition-all tw-duration-300"
              >
                <span className="tw-font-medium tw-text-sm sm:tw-text-base">View Application</span>
                <div className="tw-bg-black tw-rounded-full tw-w-9 tw-h-9 sm:tw-w-10 sm:tw-h-10 tw-flex tw-items-center tw-justify-center group-hover:tw-scale-110 tw-transition-transform tw-duration-300">
                  <ArrowRight className="tw-w-4 tw-h-4 sm:tw-w-5 sm:tw-h-5 tw-text-primary" />
                </div>
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section className="tw-bg-black tw-py-24 md:tw-py-32 tw-px-4 md:tw-px-6">
        <div className="tw-max-w-6xl tw-mx-auto tw-bg-[#101010] tw-rounded-2xl md:tw-rounded-[2rem] tw-p-8 md:tw-p-16 tw-flex tw-flex-col tw-items-center tw-text-center">
          <span className="tw-text-primary tw-text-[10px] sm:tw-text-xs tw-uppercase tw-tracking-widest tw-mb-8">
            Systematic Thinker
          </span>
          
          <WordsPullUpMultiStyle
            containerClassName="tw-text-3xl sm:tw-text-4xl md:tw-text-5xl lg:tw-text-6xl xl:tw-text-7xl tw-max-w-3xl tw-mx-auto tw-leading-[0.95] sm:tw-leading-[0.9] tw-mb-12"
            segments={[
              { text: 'I am Fran, ', className: 'tw-font-normal' },
              { text: 'a builder of logical systems. ', className: 'tw-font-serif tw-italic' },
              { text: 'I balance engineering precision with a soft, approachable demeanor.', className: 'tw-font-normal' },
            ]}
          />

          <p ref={aboutRef} className="tw-text-[#DEDBC8] tw-text-xs sm:tw-text-sm md:tw-text-base tw-leading-relaxed tw-max-w-2xl">
            {chars.map((char, i) => (
              <AnimatedLetter key={i} progress={scrollYProgress} charProgress={i / chars.length}>
                {char}
              </AnimatedLetter>
            ))}
          </p>
        </div>
      </section>

      {/* SECTION 3: FEATURES */}
      <section className="tw-min-h-screen tw-bg-black tw-relative tw-py-24 md:tw-py-32 tw-px-4 md:tw-px-6">
        <div className="bg-noise tw-absolute tw-inset-0 tw-opacity-[0.15] tw-pointer-events-none" />
        
        <div className="tw-relative tw-z-10 tw-max-w-7xl tw-mx-auto">
          <WordsPullUpMultiStyle
            containerClassName="tw-text-xl sm:tw-text-2xl md:tw-text-3xl lg:tw-text-4xl tw-font-normal tw-mb-16 tw-text-center md:tw-text-left"
            segments={[
              { text: 'Rigorous execution. ', className: 'tw-text-[#E1E0CC]' },
              { text: 'Empathetic support.', className: 'tw-text-gray-500' },
            ]}
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-3 sm:tw-gap-2 md:tw-gap-1 lg:tw-h-[480px]"
          >
            {/* Card 1 */}
            <motion.div variants={cardVariants} className="tw-relative tw-rounded-2xl tw-overflow-hidden tw-bg-[#212121] tw-h-[400px] lg:tw-h-full">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-object-cover"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              />
              <div className="tw-absolute tw-inset-0 tw-bg-black/20" />
              <div className="tw-absolute tw-bottom-6 tw-left-6 tw-text-[#E1E0CC] tw-font-medium tw-text-lg">
                Under pressure.
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={cardVariants} className="tw-bg-[#212121] tw-rounded-2xl tw-p-6 tw-flex tw-flex-col tw-h-[400px] lg:tw-h-full">
              <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85" alt="Icon" className="tw-w-10 tw-h-10 sm:tw-w-12 sm:tw-h-12 tw-rounded tw-mb-8" />
              <div className="tw-text-gray-500 tw-text-sm tw-mb-2">01</div>
              <h3 className="tw-text-[#E1E0CC] tw-text-xl tw-mb-6">Systematic Approach.</h3>
              <ul className="tw-space-y-4 tw-flex-grow">
                {['Root cause analysis', 'Edge-case planning', 'Calm execution under stress'].map((item, i) => (
                  <li key={i} className="tw-flex tw-items-start tw-gap-3 tw-text-gray-400 tw-text-sm">
                    <Check className="tw-w-5 tw-h-5 tw-text-primary tw-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className="tw-group tw-flex tw-items-center tw-gap-2 tw-text-primary tw-text-sm tw-mt-6">
                Learn more
                <ArrowRight className="tw-w-4 tw-h-4 tw--rotate-45 group-hover:tw-translate-x-1 group-hover:tw--translate-y-1 tw-transition-transform" />
              </a>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={cardVariants} className="tw-bg-[#212121] tw-rounded-2xl tw-p-6 tw-flex tw-flex-col tw-h-[400px] lg:tw-h-full">
              <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85" alt="Icon" className="tw-w-10 tw-h-10 sm:tw-w-12 sm:tw-h-12 tw-rounded tw-mb-8" />
              <div className="tw-text-gray-500 tw-text-sm tw-mb-2">02</div>
              <h3 className="tw-text-[#E1E0CC] tw-text-xl tw-mb-6">Youth Engagement.</h3>
              <ul className="tw-space-y-4 tw-flex-grow">
                {['Active listening', 'Distilling complex ideas', 'Approachable mentorship'].map((item, i) => (
                  <li key={i} className="tw-flex tw-items-start tw-gap-3 tw-text-gray-400 tw-text-sm">
                    <Check className="tw-w-5 tw-h-5 tw-text-primary tw-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className="tw-group tw-flex tw-items-center tw-gap-2 tw-text-primary tw-text-sm tw-mt-6">
                Learn more
                <ArrowRight className="tw-w-4 tw-h-4 tw--rotate-45 group-hover:tw-translate-x-1 group-hover:tw--translate-y-1 tw-transition-transform" />
              </a>
            </motion.div>

            {/* Card 4 */}
            <motion.div variants={cardVariants} className="tw-bg-[#212121] tw-rounded-2xl tw-p-6 tw-flex tw-flex-col tw-h-[400px] lg:tw-h-full">
              <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85" alt="Icon" className="tw-w-10 tw-h-10 sm:tw-w-12 sm:tw-h-12 tw-rounded tw-mb-8" />
              <div className="tw-text-gray-500 tw-text-sm tw-mb-2">03</div>
              <h3 className="tw-text-[#E1E0CC] tw-text-xl tw-mb-6">Open House.</h3>
              <ul className="tw-space-y-4 tw-flex-grow">
                {['Guided lab tours', 'Live technical demos', 'Crowd management'].map((item, i) => (
                  <li key={i} className="tw-flex tw-items-start tw-gap-3 tw-text-gray-400 tw-text-sm">
                    <Check className="tw-w-5 tw-h-5 tw-text-primary tw-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className="tw-group tw-flex tw-items-center tw-gap-2 tw-text-primary tw-text-sm tw-mt-6">
                Learn more
                <ArrowRight className="tw-w-4 tw-h-4 tw--rotate-45 group-hover:tw-translate-x-1 group-hover:tw--translate-y-1 tw-transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Resume;
