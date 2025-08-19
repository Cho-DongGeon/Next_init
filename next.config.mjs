/** @type {import('next').NextConfig} */
const nextConfig = {
  // ➜ 빌드 산출물을 .next/standalone 에 묶어
  //    Dockerfile runner 스테이지로 복사하기 쉽게 함
  output: 'standalone', //*****도커 게시할때 주석해제*****

  // 이미지 최적화를 Cloudinary·S3 등 외부로 넘기려면 그대로 두세요
  // images: { unoptimized: true },
  images: {
    remotePatterns: [
      
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' 
      ? {
          exclude: ['error', 'warn']
        }
      : false,
  },

  // 권장 옵션들
  reactStrictMode: true,
};

export default nextConfig;
