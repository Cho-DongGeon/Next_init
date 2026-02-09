'use client';

import { createContext, useState } from 'react';
import { toast as sonnerToast } from 'sonner';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

export const ModalCtx = createContext({
  alert: async () => {},
  confirm: async () => false,
  custom: async () => {},
});

export default function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  const alert = (message) => new Promise((res) => setModal({ type: 'alert', message, resolve: res }));

  const confirm = (message) => new Promise((res) => setModal({ type: 'confirm', message, resolve: res }));

  // custom: message, description, actions: [{label, value, className}]
  const custom = (message, description, actions) =>
    new Promise((res) => setModal({ type: 'custom', message, description, actions, resolve: res }));

  const toast = (message, duration = 2500, type = 'default') => {
    if (type === 'success') {
      sonnerToast.success(message, { duration });
    } else if (type === 'error') {
      sonnerToast.error(message, { duration });
    } else if (type === 'warning') {
      sonnerToast(message, { duration });
    } else {
      sonnerToast(message, { duration });
    }
  };

  const close = () => setModal(null);

  return (
    <ModalCtx.Provider value={{ alert, confirm, toast, custom }}>
      {children}

      <AlertDialog open={!!modal} onOpenChange={close}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {modal?.type === 'confirm' ? '확인' : modal?.type === 'custom' ? modal?.message : '알림'}
            </AlertDialogTitle>
            <AlertDialogDescription className="whitespace-pre-line">
              {modal?.type === 'custom' ? modal?.description : modal?.message}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className={modal?.type === 'custom' ? 'flex flex-row gap-2' : ''}>
            {modal?.type === 'custom' &&
              Array.isArray(modal?.actions) &&
              modal.actions.map((action, idx) => (
                <button
                  key={idx}
                  className={action.className + ' flex-1'}
                  onClick={() => {
                    modal.resolve(action.value);
                    close();
                  }}
                  type="button">
                  {action.label}
                </button>
              ))}
            {modal?.type === 'confirm' && (
              <AlertDialogCancel
                onClick={() => {
                  modal.resolve(false);
                  close();
                }}>
                아니오
              </AlertDialogCancel>
            )}

            {modal?.type !== 'custom' && (
              <AlertDialogAction
                onClick={() => {
                  modal.resolve(modal.type === 'confirm');
                  close();
                }}>
                확인
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ModalCtx.Provider>
  );
}
