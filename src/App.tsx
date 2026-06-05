import { MotionConfig } from 'motion/react';
import Navbar from './components/Navbar/Navbar';
import Hero from './pages/Hero';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { LanguageProvider } from './hooks/useLanguage';
import SectionNav from './components/SectionNav/SectionNav';
import styles from './App.module.css';

function App() {
  return (
    <MotionConfig reducedMotion="user">
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
    </MotionConfig>
  );
}

export default App;
