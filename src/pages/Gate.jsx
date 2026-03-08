import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Gate.module.css';

const PASSWORD = 'Mmamyy&970529';
const SESSION_KEY = 'admin_auth';

export function isAuthed() {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

export function setAuthed() {
  sessionStorage.setItem(SESSION_KEY, '1');
}

export default function Gate() {
  const [value, setValue] = useState('');
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      if (value === PASSWORD) {
        setAuthed();
        navigate('/admin');
      } else {
        setShake(true);
        setValue('');
        setTimeout(() => setShake(false), 500);
        inputRef.current?.focus();
      }
    }
  }

  return (
    <div className={styles.page}>
      <div className={`${styles.inputWrap} ${shake ? styles.shake : ''}`}>
        <input
          ref={inputRef}
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className={styles.input}
          spellCheck={false}
          autoComplete="off"
        />
        <div className={styles.line} />
      </div>
    </div>
  );
}
