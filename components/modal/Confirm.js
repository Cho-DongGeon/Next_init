'use client';

import styles from './modal.module.css';

export default function Confirm({ message, onOk, onCancel }) {
  return (
    <div className={styles['modal-backdrop']}>
      <div className={styles['modal-card']}>
        {/* <p dangerouslySetInnerHTML={{ __html: message }}></p> */}
        <p className={styles.autoRowInsert}>{message}</p>
        <div className={styles['modal-btns']}>
          <button onClick={onCancel}>아니오</button>
          <button onClick={onOk}>예</button>
        </div>
      </div>
    </div>
  );
}
