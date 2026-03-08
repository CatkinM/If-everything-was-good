import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getEssays, deleteEssay } from '../data/store';
import { isAuthed } from './Gate';
import styles from './Admin.module.css';

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function Admin() {
  const navigate = useNavigate();
  const [essays, setEssays] = useState([]);

  useEffect(() => {
    if (!isAuthed()) {
      navigate('/gate');
      return;
    }
    setEssays(getEssays());
  }, [navigate]);

  function handleDelete(id) {
    deleteEssay(id);
    setEssays(getEssays());
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.back}>←</Link>
        <Link to="/admin/new" className={styles.newBtn}>+ 新随笔</Link>
      </header>

      <div className={styles.list}>
        {essays.map((essay) => (
          <div key={essay.id} className={styles.item}>
            <div className={styles.itemLeft}>
              <span className={styles.title}>{essay.title}</span>
              <span className={styles.meta}>
                发布 {formatDate(essay.publishedAt)}
                {essay.updatedAt !== essay.publishedAt && (
                  <> · 编辑 {formatDate(essay.updatedAt)}</>
                )}
              </span>
            </div>
            <div className={styles.actions}>
              <Link to={`/admin/edit/${essay.id}`} className={styles.action}>编辑</Link>
              <button
                className={styles.action}
                onClick={() => handleDelete(essay.id)}
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
