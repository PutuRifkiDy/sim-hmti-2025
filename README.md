# Sistem Informasi Himpunan Mahasiswa Teknologi Informasi

Proyek ini adalah sistem informasi untuk mengelola kegiatan Himpunan Mahasiswa Teknologi Informasi (HMTI) menggunakan teknologi modern: Laravel sebagai backend, ReactJS dengan InertiaJS untuk frontend, dan SHADCNUI untuk komponen UI.

## Fitur Utama

Berdasarkan routes dan controller yang ada dalam proyek:

### Halaman Publik (Front-end)
- **Halaman Welcome**: Halaman utama sistem.
- **Program Kerja**: Tampilan program kerja himpunan.
- **Fungsionaris**: Tampilan fungsionaris/struktur kepengurusan.

### Dashboard Admin (dengan Role-based Access Control)
- **Manajemen Master User**: CRUD untuk pengguna sistem (role: divisi_it).
- **Manajemen Master Sie**: CRUD untuk sie/bidang himpunan (role: divisi_it).
- **Manajemen Master Period**: CRUD untuk periode akademik (role: divisi_it).
- **Manajemen Master Position**: CRUD untuk posisi/jabatan (role: divisi_it).
- **Manajemen Master Himpunan**: CRUD untuk data himpunan terkait periode (role: divisi_it).
- **Manajemen Master Program Kerja**: CRUD untuk program kerja terkait periode (role: divisi_it).
- **Manajemen Master Open Rekruitmen**: CRUD untuk open recruitment, termasuk melihat pendaftar (role: divisi_it, ketua_kegiatan).
- **Manajemen Master Financial**: CRUD untuk data keuangan terkait periode (role: divisi_it).
- **Grafik Keuangan**: Tampilan grafik dan laporan keuangan (role: divisi_it).
- **ADART**: Sistem untuk AD/RT atau manajemen terkait (role: guest, ketua_kegiatan, divisi_it).

### Sistem Open Recruitment
- **Oprec Registration**: Sistem pendaftaran oprec dengan show detail dan store data (role: guest, ketua_kegiatan, divisi_it).
- **Registered Users**: Melihat pengguna yang sudah terdaftar di oprec tertentu.

### Manajemen Profil dan Autentikasi
- **Profile Management**: Edit, update, dan delete profil pengguna (authenticated users).
- **Authentication**: Sistem login/logout dan autentikasi (berdasarkan routes/auth.php).

### Fitur Tambahan
- **Upload File**: Menggunakan trait HasFile untuk upload file.
- **Flash Messages**: Notifikasi menggunakan FlashMessageHelper.
- **Responsive UI**: Interface menggunakan ReactJS, InertiaJS, SHADCNUI, dan Tailwind CSS.

## Persyaratan Sistem

- PHP >= 8.1
- Composer
- Node.js >= 16
- NPM atau Yarn
- Database: MySQL atau PostgreSQL
- Laravel >= 10

## Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/username/sim-hmti-2025.git
cd sim-hmti-2025
```

### 2. Install Dependencies

#### Backend (Laravel)
```bash
composer install
```

#### Frontend
```bash
npm install
# atau
yarn install
```

### 3. Setup Environment

Salin file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Edit file `.env` dan konfigurasikan pengaturan berikut:

```env
APP_NAME="SIM HMTI"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sim_hmti
DB_USERNAME=your_username
DB_PASSWORD=your_password

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

# InertiaJS settings
VITE_APP_NAME="${APP_NAME}"
```

### 4. Generate Application Key

```bash
php artisan key:generate
```

### 5. Setup Database

Buat database baru di MySQL/PostgreSQL dengan nama `sim_hmti` (sesuai dengan konfigurasi di `.env`).

### 6. Jalankan Migrasi Database

```bash
php artisan migrate
```

### 7. Jalankan Seeder (Opsional)

Untuk mengisi data awal:

```bash
php artisan db:seed
```

### 8. Build Assets Frontend

```bash
npm run build
# atau untuk development
npm run dev
```

## Menjalankan Aplikasi

### Development Mode

Jalankan server Laravel dan frontend secara bersamaan:

#### Terminal 1: Laravel Server
```bash
php artisan serve
```

#### Terminal 2: Frontend Development Server
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:8000`.

### Production Mode

Untuk production, pastikan assets sudah di-build dan konfigurasikan web server (Apache/Nginx) untuk menjalankan Laravel.

## Struktur Proyek

- `app/`: Kode aplikasi Laravel (Models, Controllers, dll.)
- `resources/js/`: Kode frontend React dengan InertiaJS
- `resources/views/`: Template views Laravel
- `database/migrations/`: Migrasi database
- `routes/`: Definisi routes
- `frontend-template/`: Template frontend terpisah (jika digunakan)

## Teknologi yang Digunakan

- **Backend**: Laravel 10
- **Frontend**: ReactJS, InertiaJS
- **UI Framework**: SHADCNUI, Tailwind CSS
- **Database**: MySQL/PostgreSQL
- **Build Tool**: Vite
- **Testing**: PHPUnit, Pest

## Kontribusi

1. Fork repository
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## Lisensi

Proyek ini menggunakan lisensi MIT. Lihat file `LICENSE` untuk detail lebih lanjut.

## Kontak

Untuk pertanyaan atau dukungan, hubungi tim pengembang HMTI.
