'use client';

import { Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center max-w-md">
        {/* 오류 코드 */}
        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>

        {/* 제목 */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">페이지를 찾을 수 없습니다</h2>

        {/* 설명 */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          <br />
          정확한 주소를 확인해주세요.
        </p>

        {/* 버튼 */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl">
          <Home className="w-5 h-5" />
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
