import Navbar from './components/Navbar/Navbar';
import Hero from './pages/Hero';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.screen}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
      </main>
    </div>
  );
}

export default App;
