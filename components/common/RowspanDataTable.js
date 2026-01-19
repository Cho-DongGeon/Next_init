'use client';
import { useContext } from 'react';
import { ModalCtx } from '@/components/modal/ModalProvider';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown, ChevronUp } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function AdvancedTable() {
  const { alert, confirm, toast } = useContext(ModalCtx);
  const [data] = useState([
    { id: 1, name: '홍길동', age: 25, department: '개발팀', status: '활성화' },
    { id: 2, name: '김철수', age: 30, department: '디자인팀', status: '비활성화' },
    { id: 3, name: '이영희', age: 28, department: '개발팀', status: '활성화' },
    { id: 4, name: '박민수', age: 35, department: '기획팀', status: '활성화' },
    { id: 5, name: '최수진', age: 27, department: '디자인팀', status: '비활성화' },
    { id: 6, name: '정대호', age: 32, department: '개발팀', status: '활성화' },
    { id: 7, name: '강민지', age: 29, department: '기획팀', status: '활성화' },
    { id: 8, name: '윤서준', age: 26, department: '개발팀', status: '비활성화' },
  ]);

  const [selected, setSelected] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 정렬 함수
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // 정렬된 데이터
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // 페이지네이션
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleAll = () => {
    setSelected(selected.length === paginatedData.length ? [] : paginatedData.map((d) => d.id));
  };

  const toggleRow = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  // 정렬 아이콘 렌더링
  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronsUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-blue-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-blue-600" />
    );
  };

  // 수정 버튼 클릭 핸들러
  const showalert = async () => {
    await alert('수정버튼 클릭 alert 창입니다.');
  };

  // 삭제 버튼 클릭 핸들러
  const showconfirm = async () => {
    const ok = await confirm('삭제하시겠습니까?');
    ok ? toast('삭제되었습니다', 3000, 'success') : toast('삭제가 취소되었습니다', 3000, 'error');
  };

  return (
    <>
      {/* 선택된 항목 표시 */}
      {selected.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-blue-700">
            <span className="font-semibold">{selected.length}개</span> 항목이 선택되었습니다.
          </p>
        </div>
      )}

      {/* 테이블 */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            {/* 1번째 헤더 줄 */}
            <TableRow className="bg-gray-50">
              <TableHead rowSpan={2} className="w-12 align-middle">
                <Checkbox
                  checked={selected.length === paginatedData.length && paginatedData.length > 0}
                  onCheckedChange={toggleAll}
                />
              </TableHead>

              <TableHead rowSpan={2} className="align-middle border-l border-r">
                <button onClick={() => handleSort('name')} className="flex items-center gap-2 hover:text-blue-600 font-semibold">
                  이름
                  <SortIcon columnKey="name" />
                </button>
              </TableHead>

              <TableHead colSpan={2} className="text-center font-semibold border-l border-r">
                인적 정보
              </TableHead>

              <TableHead rowSpan={2} className="align-middle font-semibold border-l">
                상태
              </TableHead>

              <TableHead rowSpan={2} className="align-middle font-semibold border-l">
                관리
              </TableHead>
            </TableRow>

            {/* 2번째 헤더 줄 */}
            <TableRow className="bg-gray-50">
              <TableHead className="border-l border-r">
                <button onClick={() => handleSort('age')} className="flex items-center gap-2 hover:text-blue-600 font-semibold ">
                  나이
                  <SortIcon columnKey="age" />
                </button>
              </TableHead>

              <TableHead className="border-l border-r">
                <button
                  onClick={() => handleSort('department')}
                  className="flex items-center gap-2 hover:text-blue-600 font-semibold">
                  부서
                  <SortIcon columnKey="department" />
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id} className={`${selected.includes(row.id) ? 'bg-blue-50' : ''} transition-colors`}>
                <TableCell>
                  <Checkbox checked={selected.includes(row.id)} onCheckedChange={() => toggleRow(row.id)} />
                </TableCell>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>{row.age}세</TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.status === '활성화' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors duration-200 border border-blue-300"
                      onClick={showalert}>
                      수정
                    </button>
                    <button
                      className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors duration-200 border border-red-300"
                      onClick={showconfirm}>
                      삭제
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-between mt-3">
        <div className="text-sm text-gray-600">
          전체 <span className="font-semibold">{sortedData.length}</span>개 중{' '}
          <span className="font-semibold">
            {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, sortedData.length)}
          </span>
          개 표시
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page ? 'bg-blue-600 text-white' : 'border hover:bg-gray-100'
                }`}>
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
