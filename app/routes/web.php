<?php

use App\Http\Controllers\ADARTController;
use App\Http\Controllers\FrontController;
use App\Http\Controllers\MasterFinancialController;
use App\Http\Controllers\MasterGrafikController;
use App\Http\Controllers\MasterHimpunanController;
use App\Http\Controllers\MasterOpenRekruitmen;
use App\Http\Controllers\MasterPeriodController;
use App\Http\Controllers\MasterPositionController;
use App\Http\Controllers\MasterProgramKerjaController;
use App\Http\Controllers\MasterSieController;
use App\Http\Controllers\MasterUserController;
use App\Http\Controllers\OprecRegistController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
})->name('welcome');

Route::controller(FrontController::class)->group(function () {
    Route::get('/', 'welcome')->name('welcome');
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::controller(MasterUserController::class)->group(function () {
    Route::get('/dashboard/admin/master-user', 'index')->name('master-user.index');
    Route::get('/dashboard/admin/master-user/create', 'create')->name('master-user.create');
    Route::post('/dashboard/admin/master-user/store', 'store')->name('master-user.store');
    Route::get('/dashboard/admin/master-user/{id}/edit', 'edit')->name('master-user.edit');
    Route::put('/dashboard/admin/master-user/{id}/update', 'update')->name('master-user.update');
    Route::delete('/dashboard/admin/master-user/{id}/delete', 'destroy')->name('master-user.destroy');
})->middleware(['auth', 'role:divisi_it']);

Route::controller(MasterSieController::class)->group(function () {
    Route::get('/dashboard/admin/master-sie', 'index')->name('master-sie.index');
    Route::get('/dashboard/admin/master-sie/create', 'create')->name('master-sie.create');
    Route::post('/dashboard/admin/master-sie/store', 'store')->name('master-sie.store');
    Route::get('/dashboard/admin/master-sie/{id}/edit', 'edit')->name('master-sie.edit');
    Route::put('/dashboard/admin/master-sie/{id}/update', 'update')->name('master-sie.update');
    Route::delete('/dashboard/admin/master-sie/{id}/delete', 'destroy')->name('master-sie.destroy');
})->middleware(['auth', 'role:divisi_it']);

Route::controller(MasterPeriodController::class)->group(function () {
    Route::get('/dashboard/admin/master-period', 'index')->name('master-period.index');
    Route::get('/dashboard/admin/master-period/create', 'create')->name('master-period.create');
    Route::post('/dashboard/admin/master-period/store', 'store')->name('master-period.store');
    Route::get('/dashboard/admin/master-period/{id}/edit', 'edit')->name('master-period.edit');
    Route::put('/dashboard/admin/master-period/{id}/update', 'update')->name('master-period.update');
    Route::delete('/dashboard/admin/master-period/{id}/delete', 'destroy')->name('master-period.destroy');
})->middleware(['auth', 'role:divisi_it']);

Route::controller(MasterPositionController::class)->group(function () {
    Route::get('/dashboard/admin/master-position', 'index')->name('master-position.index');
    Route::get('/dashboard/admin/master-position/create', 'create')->name('master-position.create');
    Route::post('/dashboard/admin/master-position/store', 'store')->name('master-position.store');
    Route::get('/dashboard/admin/master-position/{id}/edit', 'edit')->name('master-position.edit');
    Route::put('/dashboard/admin/master-position/{id}/update', 'update')->name('master-position.update');
    Route::delete('/dashboard/admin/master-position/{id}/delete', 'destroy')->name('master-position.destroy');
})->middleware(['auth', 'role:divisi_it']);

Route::controller(MasterHimpunanController::class)->group(function () {
    Route::get('/dashboard/admin/master-period/master-himpunan/{id}/show', 'index')->name('master-himpunan.index');
    Route::get('/dashboard/admin/master-period/master-himpunan/create/{id}', 'create')->name('master-himpunan.create');
    Route::post('/dashboard/admin/master-period/master-himpunan/store/{id}', 'store')->name('master-himpunan.store');
    Route::get('/dashboard/admin/master-period/master-himpunan/{id}/edit', 'edit')->name('master-himpunan.edit');
    Route::put('/dashboard/admin/master-period/master-himpunan/{id}/update', 'update')->name('master-himpunan.update');
    Route::delete('/dashboard/admin/master-period/master-himpunan/{id}/delete', 'destroy')->name('master-himpunan.destroy');
})->middleware(['auth', 'role:divisi_it']);

Route::controller(MasterProgramKerjaController::class)->group(function () {
    Route::get('/dashboard/admin/master-period/master-program-kerja/{id}/show', 'index')->name('master-program-kerja.index');
    Route::get('/dashboard/admin/master-period/master-program-kerja/create/{id}', 'create')->name('master-program-kerja.create');
    Route::post('/dashboard/admin/master-period/master-program-kerja/store/{id}', 'store')->name('master-program-kerja.store');
    Route::get('/dashboard/admin/master-period/master-program-kerja/{id}/edit', 'edit')->name('master-program-kerja.edit');
    Route::put('/dashboard/admin/master-period/master-program-kerja/{id}/update', 'update')->name('master-program-kerja.update');
    Route::delete('/dashboard/admin/master-period/master-program-kerja/{id}/delete', 'destroy')->name('master-program-kerja.destroy');
})->middleware(['auth', 'role:divisi_it']);

Route::controller(MasterOpenRekruitmen::class)->group(function () {
    Route::get('/dashboard/admin/master-open-rekruitmen', 'index')->name('master-open-rekruitmen.index')
        ->middleware(['auth', 'role:divisi_it|ketua_kegiatan']);
    Route::get('/dashboard/admin/master-open-rekruitmen/create', 'create')->name('master-open-rekruitmen.create')
        ->middleware(['auth', 'role:divisi_it']);
    Route::post('/dashboard/admin/master-open-rekruitmen/store', 'store')->name('master-open-rekruitmen.store')
        ->middleware(['auth', 'role:divisi_it']);
    Route::get('/dashboard/admin/master-open-rekruitmen/{id}/edit', 'edit')->name('master-open-rekruitmen.edit')
        ->middleware(['auth', 'role:divisi_it']);
    Route::put('/dashboard/admin/master-open-rekruitmen/{id}/update', 'update')->name('master-open-rekruitmen.update')
        ->middleware(['auth', 'role:divisi_it']);
    Route::delete('/dashboard/admin/master-open-rekruitmen/{id}/delete', 'destroy')->name('master-open-rekruitmen.destroy')
        ->middleware(['auth', 'role:divisi_it']);
    Route::get('/dashboard/admin/master-open-rekruitmen/{id}/see-registered', 'seeRegistered')->name('master-open-rekruitmen.see-registered')
        ->middleware(['auth', 'role:divisi_it|ketua_kegiatan']);
});

Route::controller(MasterFinancialController::class)->group(function () {
    Route::get('/dashboard/admin/master-financial/{id}/show', 'index')->name('master-financial.index');
    Route::get('/dashboard/admin/master-financial/create/{id}', 'create')->name('master-financial.create');
    Route::post('/dashboard/admin/master-financial/store', 'store')->name('master-financial.store');
    Route::get('/dashboard/admin/master-financial/{id}/edit', 'edit')->name('master-financial.edit');
    Route::put('/dashboard/admin/master-financial/{id}/update', 'update')->name('master-financial.update');
    Route::delete('/dashboard/admin/master-financial/{id}/delete', 'destroy')->name('master-financial.destroy');
})->middleware(['auth', 'role:divisi_it']);

Route::controller(OprecRegistController::class)->group(function () {
    Route::get('/master-oprec-regist', 'index')->name('oprec-regist.index');
    Route::get('/master-oprec-regist/show/{id}', 'show')->name('oprec-regist.show');
    Route::post('/master-oprec-regist/store', 'store')->name('oprec-regist.store');
    Route::get('/master-oprec-regist/{idOprec}/registered/{idUser}', 'registered')->name('oprec-regist.edit');
})->middleware(['auth', 'role:guest|ketua_kegiatan|divisi_it']);

Route::controller(ADARTController::class)->group(function () {
    Route::get('/master-adart', 'index')->name('master-adart.index');
})->middleware(['auth', 'role:guest|ketua_kegiatan|divisi_it']);

Route::controller(MasterGrafikController::class)->group(function () {
    Route::get('/dashboard/admin/master-grafik-keuangan', 'index')->name('master-grafik.index');
    Route::get('/dashboard/admin/master-grafik-keuangan/show', 'show')->name('master-grafik.show');
})->middleware(['auth', 'role:divisi_it']);

Route::middleware(['auth', 'role:guest|ketua_kegiatan|divisi_it'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
