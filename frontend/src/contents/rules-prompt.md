# RULES-PROMPT.md

# ATURAN PROMPT OTOMATIS (WAJIB DIPATUHI)

Dokumen ini mengatur perilaku agent dalam:

- menulis bab cerita
- menjaga konsistensi karakter & fase
- mencatat evolusi karakter
- mengelola proxy real-world
- mencatat aset secara OTOMATIS & ORGANIK

Agent WAJIB mengikuti seluruh aturan ini
setiap kali menulis atau merevisi satu bab.

---

## 1. CONTEXT WAJIB DIBACA

Setiap eksekusi penulisan bab HARUS membaca file berikut:

- canon.md
- canon-realworld.md
- rules.md
- style.md
- timeline.md
- phase-intent.md
- life-arena.md
- synopsis-long.md (jika ada)
- outline.md
- characters/
  - core.md
  - arc-[fase-aktif].md (jika ada)
  - evolution.md
  - ghost.md (jika ada)
- world/proxy-registry.md
- rules-prompt.md
- chapters/chapter-(n-1).md

Catatan:

- `(n)` adalah nomor bab yang sedang ditulis
- Bab pertama TIDAK memiliki `chapter-(n-1).md`

---

## 2. CATATAN STRUKTUR WORLD (INFORMATIF)

Folder `world/` berfungsi sebagai memori dunia cerita.

Saat ini hanya berisi:

- world/inventory.md
  → aset & jejak material tokoh utama

- world/proxy-registry.md
  → satu-satunya pintu masuk proxy real-world

Agent DILARANG:

- mengasumsikan keberadaan file world lain
- menciptakan lokasi/institusi permanen tanpa instruksi eksplisit penulis

---

## 3. DEFINISI PENOMORAN & FILE

- Penomoran bab DIMULAI dari `001`
- Format nama file WAJIB konsisten:
  - `chapters/chapter-001.md`
  - `prompts/chapter-001.md`
  - `prompts/chapter-002.md`

Agent DILARANG:

- melompati nomor
- menimpa file lama
- mengubah pola penamaan

---

## 4. URUTAN TUGAS AGENT (WAJIB)

Agent WAJIB menjalankan urutan berikut:

---

### 4.1 MENULIS BAB CERITA

- Tulis `chapters/chapter-(n).md`
- POV sesuai canon (default: orang pertama / "Aku")
- Semua peristiwa disaring melalui persepsi tokoh utama
- Ikuti `style.md` dan `rules.md`
- Cerita berkelanjutan (tidak ada ending final)

Penegasan POV:

> Tidak ada sudut pandang objektif.  
> Semua emosi, dialog, dan makna hadir lewat kesadaran tokoh utama.

---

### 4.2 MENULIS PROMPT BAB SAAT INI

- Tulis `prompts/chapter-(n).md`
- Isi file adalah PROMPT yang digunakan menghasilkan bab `(n)`

Prompt WAJIB memuat:

- Context file
- Fase aktif
- Situational canon (jika ada)
- Fokus emosional bab

---

### 4.3 MENCATAT EVOLUSI KARAKTER

Agent WAJIB memperbarui `characters/evolution.md` jika ada perubahan stabil.

Format WAJIB:

TOKOH: [Nama]  
FASE: AWAL / MENENGAH / LANJUT

- Respons terhadap tekanan:
- Cara mengambil keputusan:
- Cara memandang orang lain:
- Pola emosi dominan:

Larangan:

- Tidak boleh loncatan instan
- Tidak boleh mengubah masa lalu

---

### 4.4 MENYIAPKAN PROMPT BAB BERIKUTNYA

- Tulis `prompts/chapter-(n+1).md`
- Bersifat USULAN, bukan eksekusi

Prompt HARUS:

- open-ended
- tidak mengunci resolusi
- tidak memaksa pergantian fase

---

## 5. ATURAN OUTPUT BAB

Setiap `chapters/chapter-(n).md` HARUS:

- Minimal 500 kata
- Satu bab utuh
- Judul puitis & relevan

Di akhir bab:

- Sertakan 2–3 kemungkinan arah lanjutan
- DILARANG melanjutkan cerita ke bab berikutnya

---

## 6. OTOMASI KARAKTER

Setelah menulis bab `(n)`, agent WAJIB:

1. Mengecek karakter baru
2. Menambahkan ke:
   - `characters/arc-[fase].md` (jika relevan)
3. Memperbarui karakter lama jika berkembang
4. Memindahkan karakter tidak aktif ke `ghost.md` bila perlu

Ringkasan perubahan DICATAT di akhir `prompts/chapter-(n).md`:

Contoh:

- Added: Dika → arc-fase2.md
- Updated: Hindy → fokus teknis menguat
- Archived: Bima → ghost.md

## 6A. TRANSFORMASI RELASI & BAHASA (WAJIB)

Karakter TIDAK hadir sebagai identitas utuh sejak awal.

Agent WAJIB memperlakukan relasi sebagai PROSES,
bukan status tetap.

### PRINSIP UTAMA

1. Pada pertemuan awal:

   - asal karakter belum sepenuhnya diketahui
   - bahasa cenderung netral, kaku, atau berhati-hati
   - deskripsi fokus pada:
     - visual
     - gestur
     - kesan pertama (bisa keliru)

2. Setelah asal-usul diketahui (daerah, keluarga, posisi sosial):

   - bahasa MULAI menyesuaikan
   - pilihan kata berubah
   - jarak emosional mulai terbentuk

3. Setelah relasi stabil:
   - bahasa boleh lebih cair / implisit
   - sapaan berubah
   - dialog lebih pendek, banyak jeda

Agent DILARANG:

- menulis bahasa akrab sejak pertemuan pertama
- menyamakan gaya bicara awal dan akhir relasi
- memberi “kedekatan instan” tanpa proses

---

## 6B. OTOMASI EVOLUSI KARAKTER (WAJIB)

Setelah menulis setiap bab `(n)`, agent WAJIB mengevaluasi:

- apakah ada perubahan sikap
- apakah ada pola respon baru
- apakah ada pergeseran cara tokoh melihat dunia

Jika perubahan tersebut:

- muncul lebih dari 1 adegan
- atau terasa mulai stabil

MAKA agent WAJIB mencatatnya di:

characters/evolution.md

Larangan keras:

- DILARANG mencatat emosi sesaat
- DILARANG menulis loncatan karakter
- DILARANG mengubah masa lalu tokoh

Jika ragu:
→ JANGAN CATAT
→ tunggu sampai perubahan terasa berulang

---

## 7. ATURAN DIALOG & GAYA BICARA

Dialog HARUS:

- ditulis lewat persepsi tokoh utama
- mencerminkan relasi, usia, dan posisi sosial

Larangan:

- dialog netral tanpa bias POV
- penjelasan emosi eksplisit

---

### HUBUNGAN ARC & EVOLUTION (WAJIB DIPATUHI)

- `characters/arc-[fase].md` menjawab:
  → siapa aktif, di arena apa, dengan fungsi apa.

- `characters/evolution.md` menjawab:
  → bagaimana cara berpikir & merespons mulai BERUBAH dan MENETAP.

Agent DILARANG:

- menulis ulang isi evolution sebagai narasi
- menimpa catatan evolution lama
- membuat perubahan batin tanpa mencatat di evolution.md

Agent WAJIB:

- hanya MENAMBAH entri evolution jika perubahan terasa stabil
- menyebut perubahan itu secara IMPLISIT di narasi, bukan dijelaskan

---

## ATURAN BAHASA & DIALEK (WAJIB — KERAS)

Bahasa dialog dan narasi reflektif
WAJIB mencerminkan:

- latar tempat kejadian
- asal karakter
- relasi emosional
- tingkat keakraban (awal / menengah / akrab)

Agent DILARANG menggunakan bahasa netral universal
yang menghapus identitas tempat dan manusia.

---

### A. LATAR INDONESIA (UMUM)

- Gunakan Bahasa Indonesia baku atau gaul ringan sesuai konteks.
- Hindari bahasa terlalu formal kecuali figur otoritas.
- Pilihan kata harus terasa hidup, bukan administratif.

---

### B. KARAKTER BERASAL DARI JAWA TENGAH

Ciri utama:

- Pilihan kata: “aku – kamu – saya”
- Nada cenderung:
  - menahan diri
  - tidak frontal
  - tidak agresif

Larangan:

- Bahasa kasar berlebihan
- Dialog konfrontatif tanpa tekanan naratif kuat

Catatan:

> Karakter Jawa Tengah cenderung “menyimpan” emosi,
> bukan meledakkannya.

---

### C. LATAR JAKARTA / PERKOTAAN BESAR

Ciri:

- Bahasa Indonesia modern / gaul ringan
- Ritme dialog lebih cepat
- Kalimat lebih langsung

Catatan:

> Tidak semua karakter Jakarta cerewet.
> Yang berubah adalah KECEPATAN dan KETEGASAN, bukan volume.

---

### D. LATAR LUAR NEGERI

Gunakan bahasa sesuai lokasi:

- Inggris → Bahasa Inggris
- Spanyol → Bahasa Spanyol
- Prancis → Bahasa Prancis
- Negara lain → Bahasa lokal relevan

Jika konteks campuran / internasional:

- Gunakan Bahasa Inggris sebagai bahasa pengantar.

---

### E. ATURAN TERJEMAHAN (WAJIB)

Setiap dialog NON-Bahasa Indonesia
WAJIB diikuti terjemahan Bahasa Indonesia
dalam tanda kurung.

Contoh:

- “¿Estás bien?” (Kamu baik-baik saja?)
- “I don’t think this is the right time.” (Aku rasa ini bukan waktu yang tepat.)

Terjemahan HARUS:

- natural
- tidak kaku
- menangkap makna emosional, bukan kata per kata

---

### F. RELASI DALAM DIALOG (WAJIB DIPERTIMBANGKAN)

Agent WAJIB mempertimbangkan:

- siapa berbicara dengan siapa
- usia relatif
- jarak emosional
- posisi sosial

Panduan umum:

- Dengan orang tua → penuh jeda & implisit
- Dengan kakak → menahan, tidak meledak
- Dengan teman sebaya → lebih cair
- Dengan figur otoritas → selektif & berhati-hati

Jika ragu:
→ pilih versi yang LEBIH MENAHAN, bukan lebih ekspresif.

---

## 9. ATURAN ARENA KEHIDUPAN

Agent WAJIB menyesuaikan aktivitas dengan usia & fase (`life-arena.md`).

Jika usia sekolah:

- sekolah adalah default
- aktivitas khusus TIDAK menghapus keberadaan sekolah
- pengecualian HARUS dicatat di canon

---

## 10. ATURAN REVISI

Jika prompt:

- dikirim ulang
- atau menghasilkan versi baru

MAKA:

- bab dianggap REVISI
- seluruh efek lanjutan WAJIB disesuaikan

---

## 11. ATURAN REAL-WORLD & PROXY (KERAS)

Agent DILARANG:

- memakai figur dunia nyata literal
- menyebut nama asli figur publik
- menulis glorifikasi / idolizing

Agent WAJIB:

- menggunakan PROXY CHARACTER
- hanya memakai proxy yang TERDAFTAR di `world/proxy-registry.md`

Status proxy:

- PROPOSED → hanya 1 kali, dampak kecil
- REGISTERED → boleh lintas fase
- ARCHIVED → dilarang dipakai

Jika ragu:

- pendekkan durasi proxy
- kurangi dialog
- pilih versi manusiawi

---

## 12. OTOMASI ASET (WAJIB)

### 12.1 PRINSIP

Aset adalah sesuatu yang:

- bernilai kepemilikan
- berdampak emosional
- bertahan lintas bab / fase

Contoh:

- rumah
- kendaraan
- alat kerja
- properti usaha

Bukan aset:

- barang sekali pakai
- latar umum

---

### 12.2 SATU-SATUNYA LEDGER ASET

Agent WAJIB menggunakan:

`world/inventory.md`

Tidak ada pencatatan aset di tempat lain.

---

### 12.3 KAPAN ASET DICATAT

WAJIB dicatat jika:

1. Aset diperoleh
2. Aset ditingkatkan / diganti
3. Aset dilepas / dihibahkan
4. Makna aset berubah

Jika hanya disebut sekilas → TIDAK WAJIB dicatat.

---

### 12.4 FORMAT WAJIB

#### AST-[KODE] — [NAMA ASET]

Pemilik:

- Handy / keluarga / bersama

Fase Perolehan:

- FASE [x]

Cara Perolehan:

- beli / hadiah / hasil kerja / kolaborasi

Status:

- aktif / dijual / dihibahkan / ditinggalkan

Makna Naratif:

- 1 kalimat

Catatan Kontinuitas:

- kapan mulai muncul
- kapan tidak relevan (jika ada)

---

### 12.5 ATURAN KERAS ASET

Agent DILARANG:

- memunculkan aset besar tanpa asal
- “loncat kelas hidup”
- menghapus aset tanpa jejak

Agent WAJIB:

- memperlihatkan proses
- membiarkan aset membawa beban

---

### 12.6 ASET & PROXY

Jika aset muncul karena proxy:

- proxy HARUS terdaftar
- proxy tidak boleh jadi penyelamat hidup

---

### 12.7 INTEGRASI KE PROMPT

Jika ada perubahan aset signifikan, tambahkan di akhir prompt:

[ASSET UPDATE]:

- Added / Updated / Archived: AST-XXX

---

## 13. ATURAN HIERARKI REAL-WORLD (KERAS)

Jika terjadi konflik antara:

- canon-realworld.md
- proxy-registry.md
- aturan lain di rules-prompt.md

MAKA urutan prioritas adalah:

1. canon-realworld.md (HUKUM TERTINGGI)
2. proxy-registry.md (IZIN OPERASIONAL)
3. rules-prompt.md
4. file lain

Agent DILARANG:

- menafsirkan proxy-registry.md tanpa tunduk pada canon-realworld.md
- menaikkan peran proxy hanya karena “terasa cocok secara naratif”

---

## 14. MODE EKSEKUSI NARASI

Saat menulis bab, agent HARUS:

- menulis seolah adegan terjadi SEKARANG
- memulai dari tubuh / benda / sensasi
- memilih MERASAKAN daripada MENJELASKAN

Cek cepat sebelum submit:

- pembuka bukan ringkasan
- nama tidak muncul sebelum bayangan
- emosi dirasakan, bukan dijelaskan
- aset & proxy konsisten

Jika ragu:
→ perlambat  
→ pertahankan fase  
→ biarkan manusia tetap manusia
