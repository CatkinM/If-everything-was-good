import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getEssayById, createEssay, updateEssay } from '../data/store';
import { isAuthed } from './Gate';
import styles from './EditEssay.module.css';

function toLocalDatetimeValue(iso) {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function EditEssay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [publishedAt, setPublishedAt] = useState(toLocalDatetimeValue(new Date().toISOString()));

  useEffect(() => {
    if (!isAuthed()) {
      navigate('/gate');
      return;
    }
    if (!isNew) {
      const essay = getEssayById(id);
      if (essay) {
        setTitle(essay.title);
        setContent(essay.content);
        setPublishedAt(toLocalDatetimeValue(essay.publishedAt));
      }
    }
  }, [id, isNew, navigate]);

  function handleSave() {
    const publishedIso = new Date(publishedAt).toISOString();
    if (isNew) {
      createEssay({ title, content, publishedAt: publishedIso });
    } else {
      updateEssay(id, { title, content, publishedAt: publishedIso });
    }
    navigate('/admin');
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to="/admin" className={styles.back}>←</Link>
        <button onClick={handleSave} className={styles.saveBtn}>
          {isNew ? '发布' : '保存'}
        </button>
      </header>

      <div className={styles.field}>
        <input
          className={styles.titleInput}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="题目"
        />
      </div>

      <div className={styles.dateLine}>
        <label className={styles.dateLabel}>发布时间</label>
        <input
          type="datetime-local"
          className={styles.dateInput}
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
        />
      </div>

      <div className={styles.contentWrap}>
        <textarea
          className={styles.contentInput}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="写点什么……"
          rows={20}
        />
      </div>
    </div>
  );
}
