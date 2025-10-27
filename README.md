# Next Store

Next Store adalah aplikasi toko online modern berbasis [Next.js](https://nextjs.org/) dengan dukungan admin panel, manajemen produk, transaksi, pembayaran, dan autentikasi multi-faktor.

## Fitur Utama

- **Frontend & Backend Terintegrasi**: Menggunakan Next.js App Router.
- **Manajemen Produk**: CRUD produk untuk admin.
- **Transaksi & Pembayaran**: Checkout, status pembayaran, dan integrasi payment gateway (Xendit).
- **Autentikasi & MFA**: Login, register, OTP, dan verifikasi multi-faktor.
- **Admin Panel**: Kelola produk, transaksi, dan pengguna.
- **Notifikasi WhatsApp**: Integrasi pengiriman notifikasi via WhatsApp.
- **Database**: MongoDB untuk penyimpanan data.

## Struktur Proyek

```
src/
  app/
    (admin)/admin/         # Halaman admin (produk, transaksi, users)
    (main)/                # Halaman utama user (produk, cart, payment)
    api/                   # API routes (auth, orders, payment, webhook, dsb)
  components/              # Komponen UI (table, sidebar, form, dsb)
  lib/                     # Helper & utilitas (cart, payment, WhatsApp, dsb)
  models/                  # Skema data (Product, User, Order, dsb)
  styles/                  # File CSS global
```

## Instalasi & Menjalankan

1. **Clone repo & install dependencies**
   ```bash
   git clone https://github.com/febriaricandra/fullstack-next-mongoose.git
   cd store-next
   npm install
   ```

2. **Konfigurasi environment**
   - Buat file `.env.local` dan isi variabel yang dibutuhkan (contoh: koneksi MongoDB, API key Xendit, dsb).

   Contoh isi file `.env.local`:
   ```env
   # Contoh .env.local
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
   XENDIT_API_KEY=your_xendit_api_key
   WHATSAPP_API_KEY=your_whatsapp_api_key
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

3. **Jalankan development server**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser.

## Script Penting

- `npm run dev` — Menjalankan server development
- `npm run build` — Build aplikasi untuk production
- `npm start` — Menjalankan server production

## Deployment

Deploy dengan mudah ke [Vercel](https://vercel.com/) atau platform lain yang mendukung Next.js.

## Kontribusi

Pull request dan issue sangat diterima! Silakan fork repo ini dan ajukan perubahan.

## Lisensi

MIT
