'use client';

import styles from './modal.module.css'; // 원하는 스타일

export default function Alert({ message, onClose }) {
  return (
    <div className={styles['modal-backdrop']}>
      <div className={styles['modal-card']}>
        {/* <p dangerouslySetInnerHTML={{ __html: message }}></p> */}
        <p className={styles.autoRowInsert}>{message}</p>
        <div className={styles['modal-btns']}>
          <button onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
}
