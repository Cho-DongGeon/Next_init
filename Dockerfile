# ---------- 1) deps: 의존성 설치 ----------
FROM node:20.18.0-alpine AS deps
WORKDIR /app

# 일부 패키지가 glibc 를 요구할 수 있으므로 추가
RUN apk add --no-cache libc6-compat

# lock-file 기준 설치
COPY package.json package-lock.json* ./
RUN npm ci --prefer-offline

# ---------- 2) builder: Next.js 빌드 ----------
FROM node:20.18.0-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# node_modules 재사용
COPY --from=deps /app/node_modules ./node_modules

# ✅ 모든 .env 파일 복사 (존재하는 것만)
COPY .env* ./

# 소스 복사 후 빌드
COPY . .
RUN npm run build

# ---------- 3) runner: 경량 런타임 ----------
FROM node:20.18.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# 비-root 사용자 생성
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# 정적 파일을 먼저 복사 (소유자 변경 전)
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 소유자 변경을 한 번에
RUN chown -R nextjs:nodejs /app

USER nextjs
EXPOSE 3000

# 0.0.0.0으로 바인딩하도록 명시적 설정
CMD ["node", "server.js"]