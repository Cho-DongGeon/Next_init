'use client';

import { createContext, useState } from 'react';
import Alert from './Alert';
import Confirm from './Confirm';
import Toast from './Toast';

export const ModalCtx = createContext({
  alert: () => Promise.resolve(),
  confirm: () => Promise.resolve(false),
  toast: () => {},
});

export default function ModalProvider({ children }) {
  const [modal, setModal] = useState(null); // { type, message, resolve } | null

  const alert = (message) => new Promise((res) => setModal({ type: 'alert', message, resolve: res }));
  const confirm = (message) => new Promise((res) => setModal({ type: 'confirm', message, resolve: res }));
  const toast = (msg, duration = 3000) => setModal({ type: 'toast', message: msg, duration });
  const close = () => setModal(null);

  return (
    <ModalCtx.Provider value={{ alert, confirm, toast }}>
      {children}

      {modal?.type === 'alert' && (
        <Alert
          message={modal.message}
          onClose={() => {
            modal.resolve();
            close();
          }}
        />
      )}

      {modal?.type === 'confirm' && (
        <Confirm
          message={modal.message}
          onOk={() => {
            modal.resolve(true);
            close();
          }}
          onCancel={() => {
            modal.resolve(false);
            close();
          }}
        />
      )}

      {modal?.type === 'toast' && <Toast message={modal.message} duration={modal.duration} onClose={close} />}
    </ModalCtx.Provider>
  );
}
