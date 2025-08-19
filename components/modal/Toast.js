'use client';

import { useEffect } from 'react';
import styles from './modal.module.css';

export default function Toast({ message, duration = 2500, onClose }) {
  useEffect(() => {
    const time = setTimeout(onClose, duration);
    return () => clearTimeout(time);
  }, [duration, onClose]);

  const formattedMessage = message.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  return (
    <div className={styles['toast-wrapper']}>
      <div className={styles['toast-card']} style={{ '--duration': `${duration}ms` }}>
        {formattedMessage}
      </div>
    </div>
  );
}
