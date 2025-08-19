import { NextResponse } from 'next/server';

export function middleware(request) {
  // const { pathname } = request.nextUrl;
  // console.log('################미들웨어실행###############', pathname);
  // const accessToken = request.cookies.get('checkly_WEB_access_token')?.value;
  // 정적 리소스 무조건 통과시키기
  // if (
  //   pathname.startsWith('/_next/') || // Next.js 빌드 리소스
  //   pathname.startsWith('/static/') ||
  //   pathname.startsWith('/images/') ||
  //   pathname.startsWith('/favicon.ico') ||
  //   pathname.startsWith('/api/') || // API 요청
  //   pathname.startsWith('/tag-login') // 퍼블리싱 개발로 임시로 허용
  // ) {
  //   return NextResponse.next();
  // }
  // if (accessToken) {
  //   if (pathname === '/login' || pathname.includes('/tag-login')) {
  //     return NextResponse.redirect(new URL('/', request.url));
  //   }
  //   return NextResponse.next();
  // }
  // if (!accessToken) {
  //   if (pathname === '/login' || pathname.includes('/tag-login')) {
  //     return NextResponse.next();
  //   }
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
  // return NextResponse.next();
}

// export const config = {
//   matcher: ['/:path*'], // 보호할 페이지 경로 설정, API 포함 가능
// };
