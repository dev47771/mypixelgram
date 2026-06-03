# пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
FROM node:20-alpine AS dependencies
WORKDIR /app

# пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ pnpm (пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ v10 пїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅ Node 20)
RUN corepack enable && corepack prepare pnpm@10 --activate

# пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ lock-пїЅпїЅпїЅпїЅпїЅ пїЅ package.json пїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
COPY package.json pnpm-lock.yaml ./

# пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
RUN pnpm install --frozen-lockfile

# пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
FROM node:20-alpine AS builder
WORKDIR /app

# пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ pnpm
RUN corepack enable && corepack prepare pnpm@10 --activate

# пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
COPY . .

# пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
COPY --from=dependencies /app/node_modules ./node_modules

# Рў.Рє. @post РїР°СЂР°Р»Р»РµР»СЊРЅС‹Р№ СЂРѕСѓС‚ СЃС‚Р°С‚РёС‡РµСЃРєРё РіРµРЅРµСЂРёСЂСѓРµС‚ fetch-Р·Р°РїСЂРѕСЃ Р±РµР· Р±СЌРєРµРЅРґР°
# РЅСѓР¶РЅРѕ РїСЂРёРЅСѓРґРёС‚РµР»СЊРЅРѕ СЃРґРµР»Р°С‚СЊ СЃС‚СЂР°РЅРёС†Сѓ РґРёРЅР°РјРёС‡РµСЃРєРѕР№ РґР»СЏ РёР·Р±РµР¶Р°РЅРёСЏ Р·Р°РІРёСЃР°РЅРёСЏ
RUN sed -i '1iexport const dynamic = "force-dynamic";' 'src/app/(home)/@post/page.tsx'


# Абсолютный URL для сборки — чтобы fetch в серверных компонентах работал
ENV NEXT_PUBLIC_BASE_URL=http://main:3000/api/v1
# URL для сокетов (клиентская сторона, встраивается в бандл)
ENV NEXT_PUBLIC_APP_URL=https://mypixelgram.ru

# Сборка
RUN pnpm run build:production

# В собранном клиентском коде заменяем абсолютный URL на относительный
# Серверные чанки НЕ трогаем — им нужен абсолютный URL для SSR fetch
RUN find .next/static -type f -name "*.js" -exec sed -i 's|http://main:3000/api/v1|/api/v1|g' {} +

# пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ pnpm
RUN corepack enable && corepack prepare pnpm@10 --activate

# пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅ
COPY --from=builder /app ./

EXPOSE 3000
CMD ["pnpm", "start"]
