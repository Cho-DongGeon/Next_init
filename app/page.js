import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">테스트 페이지</h1>
          <p className="text-gray-600">원하는 페이지를 선택하세요</p>
        </div>

        <div className="space-y-4">
          <Link
            href="/test"
            className="block w-full px-6 py-4 text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-medium">
            Modal 테스트 페이지로 이동하기
          </Link>

          <Link
            href="/testui"
            className="block w-full px-6 py-4 text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-medium">
            UI 테스트 페이지로 이동하기
          </Link>
        </div>
      </div>
    </div>
  );
}
