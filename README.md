# Novel Chat (Next.js)

End-to-end demo untuk chat generator novel dengan tombol revisi dan regenerate.

## Fitur

- UI chat seperti ChatGPT
- Revisi sebagian atau regenerate total per pesan
- Penyimpanan ke SQLite (database lokal)
- Rules + outline otomatis disuntikkan ke prompt

## Menjalankan

### Lokal

```bash
npm install
cp .env.example .env
npm run dev
```

Aplikasi berjalan di `http://localhost:3000`.

### Docker Compose (tanpa install SQLite di lokal)

```bash
docker compose up --build
```

Aplikasi berjalan di `http://localhost:3000` dan perubahan file akan otomatis ter-reload.

## Menjadikan project ini sebagai repo baru

Gunakan langkah berikut jika ingin memindahkan scaffold ini ke repo berbeda:

1. Buat repo baru di GitHub (kosong).
2. Clone repo baru tersebut ke lokal.
3. Salin folder/folder berikut dari repo ini ke repo baru:
   - `src/app/`
   - `src/lib/`
   - `src/contents/`
   - `data/` (biarkan `data/.gitkeep` agar folder ikut ke git)
   - `package.json`, `tsconfig.json`, `next.config.js`, `next-env.d.ts`
   - `.env.example`, `.gitignore`
   - `README.md`
4. Salin juga file aturan cerita yang ingin dipakai:
   - `rules.md` (aturan wajib)
   - `outline.md` (alur besar/fase)
5. Commit dan push ke repo baru.

Dengan begitu, user cukup mengganti `rules.md` dan `outline.md` sesuai cerita baru.

## Catatan

- Database lokal tersimpan di `data/app.db`.
- File `rules.md` dan `outline.md` di repo ini otomatis dipakai sebagai constraints.
