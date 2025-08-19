'use client';

import styles from './test.module.css';
import { useContext } from 'react';
import { ModalCtx } from '@/components/modal/ModalProvider';

export default function Page() {
  const { alert, confirm, toast } = useContext(ModalCtx);

  const handleShowModal = async () => {
    await alert('alert 창입니다.');
  };

  const handleShowConfirm = async () => {
    const ok = await confirm('alert 창입니다.');

    ok ? alert('True 누름', ok) : alert('False 누름', ok);
  };

  const handleShowToast = async () => {
    toast('Toast 창입니다.', 2000);
  };

  return (
    <>
      <h1 className={styles.title}>Test Page!!</h1>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleShowModal}>
          Modal
        </button>
        <button className={styles.button} onClick={handleShowConfirm}>
          Confirm
        </button>
        <button className={styles.button} onClick={handleShowToast}>
          Toast
        </button>
      </div>
    </>
  );
}
