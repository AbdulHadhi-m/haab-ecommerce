# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json next.config.ts ./
RUN npm ci

COPY src/ ./src/
COPY public/ ./public/
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json next.config.ts ./

USER appuser

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
