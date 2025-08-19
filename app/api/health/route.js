import { NextResponse } from 'next/server';
import getApiBaseUrl from '@/lib/config';

export async function GET() {
  const apiBaseUrl = getApiBaseUrl();
  
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    apiBaseUrl: apiBaseUrl,
    envVars: {
      NODE_ENV: process.env.NODE_ENV,
      DEV_API_BASE_URL: process.env.DEV_API_BASE_URL,
      PROD_API_BASE_URL: process.env.PROD_API_BASE_URL,
    }
  });
}