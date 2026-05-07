import Navbar from './components/Navbar/Navbar';
import Hero from './pages/Hero';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.screen}>
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}

export default App;
