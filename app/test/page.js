'use client';

import { useContext } from 'react';
import { ModalCtx } from '@/components/modal/ModalProvider';

export default function Page() {
  const { alert, confirm, toast } = useContext(ModalCtx);

  const handleShowModal = async () => {
    await alert('alert 창입니다.');
  };

  const handleShowConfirm = async () => {
    const ok = await confirm('confirm 창입니다.');

    ok ? alert('True 누름', ok) : alert('False 누름', ok);
  };

  const handleShowToast = async () => {
    toast('Toast 창입니다.', 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-2xl w-full px-6">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">Modal Test Page</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
            onClick={handleShowModal}>
            Modal
          </button>

          <button
            className="px-8 py-4 text-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
            onClick={handleShowConfirm}>
            Confirm
          </button>

          <button
            className="px-8 py-4 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
            onClick={handleShowToast}>
            Toast
          </button>
        </div>

        {/* 뒤로가기 버튼 */}
        <div className="mt-12 text-center">
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
            &larr; 홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
}
