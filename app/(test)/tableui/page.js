'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import DataTable from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';

export default function TableUIPage() {
  const router = useRouter();

  return (
    <div>
      {/* 헤더 영역 */}
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-2" />
          뒤로가기
        </Button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Table UI 테스트</h1>
          <p className="text-gray-600">TanStack Table과 shadcn/ui를 활용한 데이터 테이블 컴포넌트</p>
        </div>
      </div>

      {/* 테이블 영역 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <DataTable />
      </div>
    </div>
  );
}
