FROM node:20-bookworm

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json ./frontend/package.json
RUN pnpm install --frozen-lockfile --filter frontend...

EXPOSE 3000

WORKDIR /app/frontend
CMD ["pnpm", "dev", "--", "--hostname", "0.0.0.0", "--port", "3000"]
