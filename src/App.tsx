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
        <Grainient
          className={styles.grainient}
          color1="#ff9372"
          color2="#e4e4e4"
          color3="#ff8d6a"
          timeSpeed={1.55}
          colorBalance={-0.1}
          warpStrength={2.5}
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
          saturation={0.8}
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
