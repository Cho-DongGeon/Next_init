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

      {/* custom 모달만 별도로 렌더링 */}
      {modal?.type === 'custom' && (
        <AlertDialog
          open={!!modal}
          onOpenChange={(open) => {
            if (!open) setModal(null);
          }}>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>{modal?.message}</AlertDialogTitle>
              <AlertDialogDescription className="whitespace-pre-line">{modal?.description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-row gap-2">
              {Array.isArray(modal?.actions) &&
                modal.actions.map((action, idx) => (
                  <button
                    key={idx}
                    className={action.className + ' flex-1'}
                    onClick={() => {
                      modal.resolve(action.value);
                      setModal(null);
                    }}
                    type="button">
                    {action.label}
                  </button>
                ))}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* 기존 alert/confirm 모달 */}
      {(modal?.type === 'alert' || modal?.type === 'confirm') && (
        <AlertDialog
          open={!!modal}
          onOpenChange={(open) => {
            if (!open) setModal(null);
          }}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{modal?.type === 'confirm' ? '확인' : '알림'}</AlertDialogTitle>
              <AlertDialogDescription className="whitespace-pre-line">{modal?.message}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              {modal?.type === 'confirm' && (
                <AlertDialogCancel
                  onClick={() => {
                    modal.resolve(false);
                    setModal(null);
                  }}>
                  아니오
                </AlertDialogCancel>
              )}
              <AlertDialogAction
                onClick={() => {
                  modal.resolve(modal.type === 'confirm');
                  setModal(null);
                }}>
                확인
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </ModalCtx.Provider>
  );
}
