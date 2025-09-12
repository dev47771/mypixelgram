# Установка зависимостей
FROM node:20.11-alpine AS dependencies
WORKDIR /app

# Установка pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Копируем lock-файл и package.json для кеширования
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

# Билдим приложение
FROM node:20.11-alpine AS builder
WORKDIR /app

# Установка pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Копируем исходники
COPY . .

# Копируем зависимости из предыдущего стейджа
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/.pnpm-store /app/.pnpm-store

# Билдим
RUN pnpm run build:production

# Финальный стейдж
FROM node:20.11-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Установка pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Копируем билд
COPY --from=builder /app ./

EXPOSE 3000
CMD ["pnpm", "start"]
