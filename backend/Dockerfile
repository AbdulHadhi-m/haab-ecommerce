# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm ci --only=production

COPY src/ ./src/
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

USER appuser

EXPOSE 5000

ENV NODE_ENV=production

CMD ["node", "dist/server.js"]
