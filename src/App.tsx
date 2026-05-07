import Navbar from './components/Navbar/Navbar';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.screen}>
      <Navbar />
      <main>
        {/* pages will be added here */}
      </main>
    </div>
  );
}

export default App;
