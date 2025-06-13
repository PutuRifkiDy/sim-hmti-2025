# SOP PENGERJAAN WEB HMTI 2025

## Struktur Folder
/app untuk seluruh aplikasi Laravel 11, React, Tailwind, Inertia, dan ShacdnUI <br/>
/frontend-template untuk hasil slicing desain figma

## Setup frontend-template
git clone https://github.com/PutuRifkiDy/sim-itcc-2025.git <br/>
cd frontend-template <br/>
npm install <br/>
npm run dev

## Setup Full Aplikasi
git clone https://github.com/PutuRifkiDy/sim-itcc-2025.git <br/>
cd app <br/>
npm install <br/>
composer install <br/>
update .env nya <br/>
php artisan key:generate <br/>
php artisan migrate <br/>
php artisan db:seed <br/>
php artisan serve <br/>
npm run dev (buka terminal baru)

## Flow frontend-template
Routing bisa di cek di main.tsx yang kubuat <br/>
/home untuk landing page <br/>
/competition untuk competition page <br/>
/semnas untuk semnas page <br/>
/merch untuk merch page <br/>
Kalian taruh kodenya sesuai dengan component yang ada di routingnya
