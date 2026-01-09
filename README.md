# Novel Chat (Monorepo)

End-to-end demo untuk chat generator novel dengan tombol revisi dan regenerate.
Frontend (Next.js) dan backend (Fastify + Drizzle + Postgres) berada di satu repo.

## Fitur

- UI chat seperti ChatGPT
- Revisi sebagian atau regenerate total per pesan
- Penyimpanan ke Postgres
- Rules + outline otomatis disuntikkan ke prompt

## Menjalankan

### Lokal (PNPM workspace)

```bash
pnpm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
pnpm dev
```

Frontend: `http://localhost:3000`  
Backend: `http://localhost:4000`

### Docker Compose (semua service)

```bash
pnpm docker:all
```

Frontend berjalan di `http://localhost:3000`.

### Docker Compose terpisah

```bash
pnpm backend:docker
pnpm frontend:docker
```

Backend: `http://localhost:4000`  
Frontend: `http://localhost:3000`

## Catatan

- Konten prompt dibaca dari `frontend/src/contents`.
- Backend memakai `backend/.env` untuk `CODEX_API_KEY` dan `CODEX_MODEL`.
