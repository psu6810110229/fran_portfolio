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

const scrollDuration = 0.9;

function App() {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = Boolean(prefersReducedMotion);

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        options={{
          autoRaf: true,
          smoothWheel: !shouldReduceMotion,
          anchors: {
            duration: scrollDuration,
            immediate: shouldReduceMotion,
          },
        }}
      >
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
      </ReactLenis>
    </MotionConfig>
  );
}

export default App;
