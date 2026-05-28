# 🌊 RiverLoad v2.0

**Aplikasi Perhitungan Beban Pencemaran Sungai** · PP 22/2021 Lampiran VI

---

## 🚀 Cara Deploy ke GitHub Pages

### ⚠️ PENTING — Ikuti persis langkah ini:

**Langkah 1 — Buat repository baru** (jika belum ada)
- Nama repo bebas, misal: `Riverload-app`

**Langkah 2 — Upload file**

Extract ZIP ini, lalu **upload SEMUA file berikut ke ROOT repository** (bukan dalam subfolder):

```
.nojekyll          ← WAJIB ada! Mencegah GitHub salah baca file
index.html         ← File utama
css/style.css
js/app.js
assets/logo.svg
assets/favicon.svg
README.md
```

Cara upload via GitHub web:
1. Buka repo → klik **"Add file"** → **"Upload files"**
2. Drag semua file & folder sekaligus
3. Commit

**Langkah 3 — Aktifkan GitHub Pages**
1. Buka **Settings** → kiri: **Pages**
2. Source: **"Deploy from a branch"**
3. Branch: **`main`** (atau `master`), Folder: **`/ (root)`**
4. Klik **Save**

**Langkah 4 — Tunggu & akses**
- Tunggu 1-3 menit
- Akses: `https://<username>.github.io/<repo-name>/`

---

## ❓ Jika Halaman Masih Tampil Raw JS / Kosong

Itu artinya `.nojekyll` tidak ter-upload. Solusi:
1. Di GitHub, klik **"Add file"** → **"Create new file"**
2. Nama file: `.nojekyll` (dengan titik di depan)
3. Isi kosongkan
4. Commit → tunggu 1 menit → refresh

---

## ✨ Fitur Aplikasi

| Modul | Deskripsi |
|---|---|
| 🌊 Beban Pencemar | Hitung BPM & BPA per parameter, 2 musim |
| ⚗️ Usulan Baku Mutu | Hitung C_maks dari sumber limbah |
| 🗺 Modeling | Visualisasi sebaran konsentrasi sungai |
| 🗄 Database BM | 49 parameter · 4 kelas (PP 22/2021) |
| 📋 Laporan | Ekspor ke Excel (.xlsx) |
| 📊 Import Excel Lab | AI baca hasil uji → auto-fill form |
| 📍 Peta Sungai | Titik sampling & sumber limbah (Beta) |
| 📚 Riwayat Proyek | Simpan banyak proyek di browser |

© Andyka Adhyaksa Sumarno
