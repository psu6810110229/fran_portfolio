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
import { LanguageProvider } from './hooks/useLanguage';
import SectionNav from './components/SectionNav/SectionNav';
import styles from './App.module.css';

const scrollDuration = 0.38;
const scrollLerp = 0.18;
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
  const [hasFinePointer, setHasFinePointer] = useState(() => (
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  ));
  const [theme, setTheme] = useState<Theme>(getCurrentTheme);
  const useSmoothScroll = !shouldReduceMotion;

  useEffect(() => {
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updatePointer = () => setHasFinePointer(pointerQuery.matches);

    updatePointer();
    pointerQuery.addEventListener('change', updatePointer);

    return () => pointerQuery.removeEventListener('change', updatePointer);
  }, []);

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
        <Navbar />
        <main className={styles.main}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <SectionNav />
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
