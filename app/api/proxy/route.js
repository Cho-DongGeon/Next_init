// app/api/proxy/route.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import getApiBaseUrl from '@/lib/config';

const apiBaseUrl = getApiBaseUrl();

export async function GET(request) {
  return handleRequest(request, 'GET');
}

export async function POST(request) {
  return handleRequest(request, 'POST');
}

export async function PUT(request) {
  return handleRequest(request, 'PUT');
}

export async function DELETE(request) {
  return handleRequest(request, 'DELETE');
}

async function handleRequest(request, method) {
  console.log('라우트실행: ', request, method);
  try {
    // HttpOnly 쿠키에서 토큰 추출
    // 쿠키 상태 확인
    const cookieStore = await cookies();
    const token = cookieStore.get('checkly_WEB_access_token')?.value;

    console.log('🔑 AccessToken 존재여부:', !!token);
    console.log('🔑 AccessToken 길이:', token ? token.length : 0);

    if (!token) {
      console.log('❌ 토큰이 없음 - 401 반환');
      return NextResponse.json({ error: 'No access token found' }, { status: 401 });
    }

    // URL에서 path 파라미터 추출
    const url = new URL(request.url);
    const pathParam = url.searchParams.get('path');

    if (!pathParam) {
      return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 });
    }

    // 외부 API URL 구성
    const apiUrl = `${apiBaseUrl}${pathParam}`;
    console.log('외부API URL: ', apiUrl);

    // 헤더 설정
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': request.headers.get('content-type') || 'application/json',
    };

    // FormData 처리를 위해 Content-Type 제거 (브라우저가 자동 설정)
    if (request.headers.get('content-type')?.includes('multipart/form-data')) {
      delete headers['Content-Type'];
    }

    // 요청 본문 처리
    let body = undefined;
    if (method !== 'GET' && method !== 'DELETE') {
      if (request.headers.get('content-type')?.includes('multipart/form-data')) {
        body = await request.formData();
      } else {
        const text = await request.text();
        body = text ? text : undefined;
      }
    }

    // 외부 API 호출
    const response = await fetch(apiUrl, {
      method,
      headers,
      body,
    });

    // ✅ 응답 처리 개선
    let data;
    const responseContentType = response.headers.get('content-type') || '';
    const responseText = await response.text();

    // console.log('응답 본문 길이:', responseText.length);
    // console.log('응답 본문 미리보기:', responseText.substring(0, 200));

    // 응답이 비어있거나 JSON이 아닌 경우 처리
    if (!responseText.trim()) {
      console.log('✅ 빈 응답 - 성공으로 처리');
      data = { success: true, message: 'Request completed successfully' };
    } else if (responseContentType.includes('application/json')) {
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error('❌ JSON 파싱 실패:', jsonError);
        // JSON 파싱 실패 시 텍스트 그대로 반환
        data = {
          success: response.ok,
          message: responseText,
          raw: responseText,
        };
      }
    } else {
      // JSON이 아닌 응답인 경우
      console.log('📝 비JSON 응답 처리');
      data = {
        success: response.ok,
        message: responseText,
        contentType: responseContentType,
      };
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('API Proxy Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
