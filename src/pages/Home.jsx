import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEssays } from '../data/store';
import styles from './Home.module.css';

function formatDate(iso) {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

export default function Home() {
  const [essays, setEssays] = useState([]);

  useEffect(() => {
    setEssays(getEssays());
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroText}>
          <em>if everything was good</em>
        </h1>
      </section>

      <section className={styles.list}>
        {essays.map((essay) => (
          <Link key={essay.id} to={`/essay/${essay.id}`} className={styles.item}>
            <span className={styles.title}>{essay.title}</span>
            <span className={styles.date}>{formatDate(essay.publishedAt)}</span>
          </Link>
        ))}
      </section>

      <footer className={styles.footer}>
        <Link to="/gate" className={styles.footerLink}>
          if you were me
        </Link>
      </footer>
    </div>
  );
}
