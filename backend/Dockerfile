FROM node:20-bookworm

RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 python-is-python3 python3-setuptools make g++ \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/package.json
RUN pnpm install --frozen-lockfile --filter backend...

COPY backend/src ./backend/src
COPY backend/tsconfig.json ./backend/tsconfig.json

EXPOSE 4000

WORKDIR /app/backend
CMD ["pnpm", "dev"]
