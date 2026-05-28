# 🌊 RiverLoad

**Aplikasi Perhitungan Beban Pencemaran Sungai**  
Berdasarkan **PP 22/2021 — Lampiran VI** (Baku Mutu Air Sungai)

> Dibuat oleh **Andyka Adhyaksa Sumarno**

---

## ✨ Fitur Utama

| Modul | Deskripsi |
|---|---|
| 🌊 **Beban Pencemar** | Hitung BPM & BPA per parameter, dua musim (kemarau & hujan) |
| ⚗️ **Usulan Baku Mutu** | Hitung C_maks yang diizinkan dari sumber air limbah |
| 🗺 **Modeling** | Visualisasi sebaran konsentrasi sepanjang alur sungai |
| 🗄 **Database BM** | 49 parameter · 4 kelas sungai (PP 22/2021 Lampiran VI) |
| 📋 **Laporan** | Ekspor hasil analisis ke Excel (.xlsx) |

---

## 🚀 Cara Penggunaan

### Tanpa instalasi (langsung buka)
```
Buka file index.html di browser modern (Chrome / Edge / Firefox)
```

### Via GitHub Pages
1. Fork repositori ini
2. Buka **Settings → Pages**
3. Set source ke branch `main`, folder `/` (root)
4. Akses via `https://<username>.github.io/<repo-name>/`

---

## 📁 Struktur Proyek

```
riverload/
├── index.html          ← Entry point utama
├── css/
│   └── style.css       ← Semua styling (Industrial Scientific / Data Terminal theme)
├── js/
│   └── app.js          ← Logika aplikasi, database BM, kalkulasi
├── assets/             ← Ikon & aset statis (opsional)
├── .gitignore
└── README.md
```

---

## 🧮 Rumus Perhitungan

```
BPM  = Q × C_Maks × 3,6          (kg/jam)
BPA  = Q × C_Aktual × 3,6        (kg/jam)
C_maks = (Qs × BM - Qs × Cs) / Qd   (Usulan Baku Mutu)
```

Keterangan:
- `Q` = Debit sungai (m³/detik)
- `C_Maks` = Baku mutu air sungai sesuai kelas (mg/L)
- `C_Aktual` = Konsentrasi terukur di lapangan (mg/L)
- `BPM` = Beban Pencemaran Maksimum
- `BPA` = Beban Pencemaran Aktual

---

## 🛠️ Teknologi

- **Vanilla HTML/CSS/JS** — tanpa framework, ringan dan portabel
- [Chart.js 4.4.1](https://www.chartjs.org/) — grafik modeling sungai
- [chartjs-plugin-annotation](https://www.chartjs.org/chartjs-plugin-annotation/) — anotasi grafik
- [SheetJS (xlsx)](https://sheetjs.com/) — ekspor Excel
- [IBM Plex Mono/Sans](https://fonts.google.com/specimen/IBM+Plex+Mono) + [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) — tipografi

---

## 📜 Referensi Regulasi

- **PP No. 22 Tahun 2021** — Penyelenggaraan Perlindungan dan Pengelolaan Lingkungan Hidup
- **Lampiran VI PP 22/2021** — Baku Mutu Air Sungai (Kelas I–IV)
- **PermenLHK** — Baku Mutu Air Limbah berbagai jenis kegiatan

---

## 📄 Lisensi

© Andyka Adhyaksa Sumarno — Untuk keperluan analisis lingkungan hidup.
