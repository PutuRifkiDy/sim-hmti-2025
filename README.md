# Sistem Informasi Himpunan Mahasiswa Teknologi Informasi

Proyek ini adalah sistem informasi untuk mengelola kegiatan Himpunan Mahasiswa Teknologi Informasi (HMTI) menggunakan teknologi modern: Laravel sebagai backend, ReactJS dengan InertiaJS untuk frontend, dan SHADCNUI untuk komponen UI.

## Fitur Utama

### Manajemen Data Dasar
- **Manajemen Himpunan**: Pengelolaan informasi dasar himpunan, visi, misi, dan struktur organisasi.
- **Manajemen Periode**: Pengaturan periode akademik untuk mengorganisir kegiatan berdasarkan tahun ajaran.
- **Manajemen Posisi**: Definisi dan pengelolaan berbagai posisi/jabatan dalam himpunan.
- **Manajemen Sie (Bidang)**: Pengaturan divisi atau bidang kegiatan himpunan.

### Sistem Open Recruitment (Oprec)
- **Pendaftaran Online**: Platform untuk calon anggota mendaftar secara online.
- **Manajemen Registrasi**: Sistem untuk mengelola data pendaftaran oprec.
- **Seleksi Sie**: Penentuan dan pengelolaan sie (bidang) yang tersedia untuk oprec.
- **Tracking Status**: Monitoring status pendaftaran dan seleksi peserta.

### Manajemen Program Kerja
- **Perencanaan Program**: Pembuatan dan pengelolaan program kerja himpunan.
- **Pelacakan Progress**: Sistem untuk memantau kemajuan program kerja.
- **Evaluasi**: Fitur untuk mengevaluasi keberhasilan program kerja.

### Manajemen Keuangan
- **Pencatatan Pemasukan**: Sistem untuk mencatat berbagai sumber pemasukan himpunan.
- **Pencatatan Pengeluaran**: Tracking pengeluaran dengan kategori yang terstruktur.
- **Laporan Keuangan**: Generate laporan keuangan periodik dan real-time.
- **Budget Planning**: Perencanaan anggaran untuk program kerja.

### Manajemen Pengguna dan Autentikasi
- **Sistem Login**: Autentikasi pengguna dengan email dan password.
- **Role-Based Access Control**: Kontrol akses berdasarkan peran (admin, anggota, dll.).
- **Manajemen Profil**: Pengelolaan data profil pengguna.
- **Reset Password**: Fitur untuk mereset password melalui email.

### Dashboard dan Reporting
- **Dashboard Admin**: Interface utama untuk administrator dengan overview data.
- **Dashboard Anggota**: Tampilan khusus untuk anggota himpunan.
- **Laporan Terintegrasi**: Sistem pelaporan untuk semua aspek kegiatan himpunan.
- **Analytics**: Analitik data untuk pengambilan keputusan.

### Fitur Tambahan
- **Upload dan Manajemen File**: Sistem untuk upload dokumen, gambar, dan file terkait kegiatan.
- **Flash Messages**: Notifikasi sistem untuk feedback pengguna.
- **Responsive Design**: UI yang responsif menggunakan Tailwind CSS dan SHADCNUI.
- **API Integration**: RESTful API untuk integrasi dengan sistem eksternal.

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
