# Website Pondok Pesantren Nur Antika (Nur Antika)

Website ini adalah **media informasi Pondok Pesantren Nur Antika** yang menampilkan profil pesantren, jenjang pendidikan, fasilitas, dewan guru, galeri kegiatan, serta halaman **Tanya Jawab (FAQ)**.

Website dibangun menggunakan **React + Vite** dengan tampilan modern bergaya **green & cream**.

---

## Fitur Utama

- **Single Page App (SPA)** dengan navigasi internal (tanpa reload halaman)
- **Navbar responsif**:
  - Desktop: menu dengan dropdown (Jenjang & Profil)
  - Mobile: hamburger (menu samping/panel)
- Halaman yang tersedia:
  - Beranda
  - Tentang Pesantren
  - Sejarah
  - Galeri Kegiatan
  - Fasilitas
  - Dewan Guru
  - Jenjang Pendidikan (SMPIT, SMKIT, SMA IT)
  - Tanya Jawab (FAQ)
- **Scroll reveal animations** menggunakan `IntersectionObserver`
- **Galeri** dokumentasi kegiatan dari gambar lokal di `src/assets/`
- Integrasi konten eksternal:
  - Video **YouTube** via iframe
  - **Google Maps** via iframe
- CTA pendaftaran menuju **Google Forms** (tab baru)
- Media sosial/tautan kontak (Facebook, Instagram, YouTube, TikTok, WhatsApp)

---

## Teknologi yang Digunakan

- **React**: komponen UI dan state aplikasi
- **Vite**: bundler & server development
- Asset gambar:
  - disimpan di `src/assets/`
- Styling:
  - gaya utama dimuat di `src/App.jsx` sebagai string CSS (inline via `<style>`)

---

## Struktur Kode Penting

- `index.html`
  - Template HTML untuk aplikasi React/Vite.
- `src/main.jsx`
  - Entry utama aplikasi React.
- `src/App.jsx`
  - Semua komponen halaman dan navigasi SPA ditulis di file ini, termasuk:
    - state `page` untuk menentukan halaman yang ditampilkan
    - dropdown navbar (`activeDropdown`)
    - accordion FAQ (`openFaqs`)
    - komponen halaman: `BerandaPage`, `TentangPage`, `SejarahPage`, `GaleriPage`, `FasilitasPage`, `GuruPage`, `JenjangPage`, `SmpitPage`, `SmkitPage`, `SmaItPage`, `TanyaPage`, dan `Footer`

---

<!-- ## Cara Menjalankan Secara Lokal

1. Install dependencies:
   ```bash
   npm install
   ```

2. Jalankan mode development:
   ```bash
   npm run dev
   ```

3. Buka browser sesuai URL yang tampil (umumnya `http://localhost:5173`).

Untuk build produksi:
```bash
npm run build
```

--- -->

## URL & Konten Penting

- **Pendaftaran Online**: Google Form (dibuka di tab baru)
- **Video**: menggunakan iframe YouTube (hero & galeri)
- **Lokasi**: embed Google Maps
- Kontak utama:
  - Telepon/WhatsApp: `082113463606`
  - Email: `pondokpesantrennurantika@gmail.com`


