import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEssayById } from '../data/store';
import styles from './Essay.module.css';

function formatDate(iso) {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

export default function Essay() {
  const { id } = useParams();
  const [essay, setEssay] = useState(null);

  useEffect(() => {
    setEssay(getEssayById(id));
  }, [id]);

  if (!essay) {
    return (
      <div className={styles.notFound}>
        <Link to="/" className={styles.back}>←</Link>
      </div>
    );
  }

  const paragraphs = essay.content.split('\n').filter((p) => p.trim() !== '');

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.back}>←</Link>

      <article className={styles.article}>
        <h1 className={styles.title}>{essay.title}</h1>

        <div className={styles.meta}>
          <span>发布于 {formatDate(essay.publishedAt)}</span>
          {essay.updatedAt !== essay.publishedAt && (
            <span>最近编辑于 {formatDate(essay.updatedAt)}</span>
          )}
        </div>

        <div className={styles.content}>
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
