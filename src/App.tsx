import { useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import { MotionConfig, useReducedMotion } from 'motion/react';
import Grainient from './components/Grainient/Grainient';
import Navbar from './components/Navbar/Navbar';
import Hero from './pages/Hero';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Resume from './pages/Resume/Resume';
import { LanguageProvider } from './hooks/useLanguage';
import { useRouteSwitchNotice } from './hooks/useRouteSwitchNotice';
import SectionNav from './components/SectionNav/SectionNav';
import RouteSwitchNotice from './components/RouteSwitchNotice/RouteSwitchNotice';
import styles from './App.module.css';

const scrollDuration = 1.25;
const scrollLerp = 0.18;
const easeOutQuint = (x: number): number => 1 - Math.pow(1 - x, 5);
type Theme = 'dark' | 'light';

const getCurrentTheme = (): Theme => {
  const activeTheme = document.documentElement.getAttribute('data-theme');
  if (activeTheme === 'dark' || activeTheme === 'light') return activeTheme;

  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark' || storedTheme === 'light') return storedTheme;

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

function App() {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = Boolean(prefersReducedMotion);
  const [theme, setTheme] = useState<Theme>(getCurrentTheme);
  const useSmoothScroll = !shouldReduceMotion;

  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const isResumeRoute = normalizedPath === '/resume';
  const routeSwitchNotice = useRouteSwitchNotice(isResumeRoute ? '/resume' : '/');

  useEffect(() => {
    const updateTheme = () => setTheme(getCurrentTheme());
    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    updateTheme();

    return () => observer.disconnect();
  }, []);

  const content = (
    <LanguageProvider>
      <div className={styles.screen}>
        {!isResumeRoute && (
          <Grainient
            className={styles.grainient}
            color1="#b8641a"
            color2={theme === 'dark' ? '#131110' : '#faf8f5'}
            color3="#6f3f1a"
            timeSpeed={1.2}
            colorBalance={-0.1}
            warpStrength={4}
            warpFrequency={2.9}
            warpSpeed={2}
            warpAmplitude={50}
            blendAngle={180}
            blendSoftness={0}
            rotationAmount={500}
            noiseScale={0}
            grainAmount={0}
            grainScale={0.2}
            grainAnimated={false}
            contrast={1.55}
            gamma={1}
            saturation={0.65}
            centerX={0}
            centerY={0}
            zoom={0.9}
          />
        )}
        {!isResumeRoute && <Navbar />}
        <main className={isResumeRoute ? '' : styles.main}>
          {isResumeRoute ? (
            <Resume />
          ) : (
            <>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </>
          )}
        </main>
        <RouteSwitchNotice
          isOpen={routeSwitchNotice.isOpen}
          sourcePath={routeSwitchNotice.sourcePath}
          onClose={routeSwitchNotice.dismiss}
          onReturn={routeSwitchNotice.returnToSource}
        />
        <SectionNav isResumeRoute={isResumeRoute} />
      </div>
    </LanguageProvider>
  );

  return (
    <MotionConfig reducedMotion="user">
      {useSmoothScroll ? (
        <ReactLenis
          root
          options={{
            autoRaf: true,
            smoothWheel: true,
            syncTouch: false,
            lerp: scrollLerp,
            anchors: {
              duration: scrollDuration,
              easing: easeOutQuint,
            },
          }}
        >
          {content}
        </ReactLenis>
      ) : content}
    </MotionConfig>
  );
}

export default App;
