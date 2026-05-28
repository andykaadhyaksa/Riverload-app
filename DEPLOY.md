# 🚀 Panduan Deploy ke GitHub Pages

## Langkah 1 — Buat Repository di GitHub

1. Buka [github.com/new](https://github.com/new)
2. Isi **Repository name**, misal: `riverload`
3. Set ke **Public**
4. Klik **Create repository**

---

## Langkah 2 — Upload File

### Cara A: Via GitHub Web (termudah)

1. Di halaman repository baru, klik **"uploading an existing file"**
2. Drag & drop seluruh folder proyek ini:
   ```
   index.html
   css/style.css
   js/app.js
   README.md
   .gitignore
   ```
3. Klik **Commit changes**

### Cara B: Via Git CLI

```bash
# Di folder proyek
git init
git add .
git commit -m "Initial commit — RiverLoad v2.0"

# Sambungkan ke GitHub
git remote add origin https://github.com/<USERNAME>/<REPO>.git
git branch -M main
git push -u origin main
```

---

## Langkah 3 — Aktifkan GitHub Pages

1. Buka tab **Settings** di repository
2. Scroll ke bagian **Pages** (menu kiri)
3. Di **"Source"**, pilih:
   - Branch: `main`
   - Folder: `/ (root)`
4. Klik **Save**

---

## Langkah 4 — Akses Website

Tunggu 1–2 menit, lalu buka:

```
https://<USERNAME>.github.io/<REPO-NAME>/
```

Contoh: `https://andyka.github.io/riverload/`

---

## ✅ Checklist Sebelum Deploy

- [ ] `index.html` ada di root folder
- [ ] `css/style.css` ada
- [ ] `js/app.js` ada
- [ ] Semua path referensi relative (bukan absolute)
- [ ] Tidak ada file `.env` atau data sensitif

---

## 🔄 Update Konten

Setiap kali ada perubahan:

```bash
git add .
git commit -m "Update: deskripsi perubahan"
git push
```

GitHub Pages otomatis rebuild dalam ~1 menit.
