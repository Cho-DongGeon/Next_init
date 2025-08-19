import { NextResponse } from 'next/server';
import getApiBaseUrl from '@/lib/config';

export async function POST(req) {
  const { loginId, password, userType } = await req?.json();

  const apiBaseUrl = getApiBaseUrl();
  // console.log(apiBaseUrl);

  const resp = await fetch(`${apiBaseUrl}/api/account/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ loginId, password, userType }),
  });
  const data = await resp.json();
  // console.log('[route.js] ', data);
  if (data.success) {
    const response = NextResponse.json({ success: true, user: data.datas.user });
    response.cookies.set('checkly_WEB_access_token', data.datas.accessToken, {
      httpOnly: true, // httpOnly Secure 쿠키로 설정
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    response.cookies.set('checkly_WEB_refresh_token', data.datas.refreshToken, {
      httpOnly: true, // httpOnly Secure 쿠키로 설정
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    return response;
  }
  return NextResponse.json({ success: false, message: data.respMessage }, { status: 401 });
}
