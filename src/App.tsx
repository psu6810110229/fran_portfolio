import { useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import { MotionConfig, useReducedMotion } from 'motion/react';
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

function App() {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = Boolean(prefersReducedMotion);
  const [hasFinePointer, setHasFinePointer] = useState(() => (
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  ));
  const useSmoothScroll = hasFinePointer && !shouldReduceMotion;

  useEffect(() => {
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updatePointer = () => setHasFinePointer(pointerQuery.matches);

    updatePointer();
    pointerQuery.addEventListener('change', updatePointer);

    return () => pointerQuery.removeEventListener('change', updatePointer);
  }, []);

  const content = (
    <LanguageProvider>
      <div className={styles.screen}>
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
