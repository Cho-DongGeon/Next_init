import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import getApiBaseUrl from '@/lib/config';

export async function POST() {
  const apiBaseUrl = getApiBaseUrl();

  try {
    const cookieStore = await cookies(); // httpOnly 쿠키에서 읽어오기
    const accessToken = cookieStore.get('checkly_WEB_access_token')?.value;

    // Authorization 헤더 설정
    const headers = {
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const resp = await fetch(`${apiBaseUrl}/api/account/logout`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({}),
    });

    const data = await resp.json();

    if (data.success) {
      const response = NextResponse.json({ success: true, message: '로그아웃 되었습니다.' });

      // 쿠키 삭제
      response.cookies.delete('checkly_WEB_access_token');
      response.cookies.delete('checkly_WEB_refresh_token');

      return response;
    }

    return NextResponse.json(
      {
        success: false,
        message: data.respMessage || '로그아웃에 실패했습니다.',
      },
      { status: 401 },
    );
  } catch (error) {
    console.error('로그아웃 API 호출 중 오류:', error);
  }
}
