# syntax=docker/dockerfile:1
FROM node:20-alpine3.21 AS base
# Patch all Alpine packages to fix known vulnerabilities
RUN apk upgrade --no-cache

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts --no-audit --no-fund && npm cache clean --force

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build \
    # Remove Prisma binary query engines (not needed with Neon driver adapter)
    && find .next/standalone -name "libquery_engine*" -delete 2>/dev/null || true \
    && find .next/standalone -name "query-engine-*" -delete 2>/dev/null || true \
    # Remove Prisma schema from standalone (already embedded in client)
    && find .next/standalone -name "schema.prisma" -delete 2>/dev/null || true

# Production image — minimal runner
FROM node:20-alpine3.21 AS runner
WORKDIR /app

# Patch Alpine packages and create non-root user
RUN apk upgrade --no-cache \
    && addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
