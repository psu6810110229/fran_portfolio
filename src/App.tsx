import Navbar from './components/Navbar/Navbar';
import Hero from './pages/Hero';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { LanguageProvider } from './hooks/useLanguage';
import styles from './App.module.css';

function App() {
  return (
    <LanguageProvider>
      <div className={styles.screen}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;
