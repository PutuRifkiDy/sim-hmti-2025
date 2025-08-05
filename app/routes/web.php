<?php

use App\Http\Controllers\MasterFinancialController;
use App\Http\Controllers\MasterHimpunanController;
use App\Http\Controllers\MasterOpenRekruitmen;
use App\Http\Controllers\MasterPeriodController;
use App\Http\Controllers\MasterPositionController;
use App\Http\Controllers\MasterProgramKerjaController;
use App\Http\Controllers\MasterSieController;
use App\Http\Controllers\MasterUserController;
use App\Http\Controllers\OprecRegistController;
use App\Http\Controllers\ProfileController;
use App\Models\MasterFinancial;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::controller(MasterUserController::class)->group(function () {
    Route::get('/master-user', 'index')->name('master-user.index');
    Route::get('/master-user/create', 'create')->name('master-user.create');
    Route::post('/master-user/store', 'store')->name('master-user.store');
    Route::get('/master-user/{id}/edit', 'edit')->name('master-user.edit');
    Route::put('/master-user/{id}/update', 'update')->name('master-user.update');
    Route::delete('/master-user/{id}/delete', 'destroy')->name('master-user.destroy');
})->middleware('auth');

Route::controller(MasterSieController::class)->group(function () {
    Route::get('/master-sie', 'index')->name('master-sie.index');
    Route::get('/master-sie/create', 'create')->name('master-sie.create');
    Route::post('/master-sie/store', 'store')->name('master-sie.store');
    Route::get('/master-sie/{id}/edit', 'edit')->name('master-sie.edit');
    Route::put('/master-sie/{id}/update', 'update')->name('master-sie.update');
    Route::delete('/master-sie/{id}/delete', 'destroy')->name('master-sie.destroy');
})->middleware('auth');

Route::controller(MasterPeriodController::class)->group(function () {
    Route::get('/master-period', 'index')->name('master-period.index');
    Route::get('/master-period/create', 'create')->name('master-period.create');
    Route::post('/master-period/store', 'store')->name('master-period.store');
    Route::get('/master-period/{id}/edit', 'edit')->name('master-period.edit');
    Route::put('/master-period/{id}/update', 'update')->name('master-period.update');
    Route::delete('/master-period/{id}/delete', 'destroy')->name('master-period.destroy');
})->middleware('auth');

Route::controller(MasterPositionController::class)->group(function () {
    Route::get('/master-position', 'index')->name('master-position.index');
    Route::get('/master-position/create', 'create')->name('master-position.create');
    Route::post('/master-position/store', 'store')->name('master-position.store');
    Route::get('/master-position/{id}/edit', 'edit')->name('master-position.edit');
    Route::put('/master-position/{id}/update', 'update')->name('master-position.update');
    Route::delete('/master-position/{id}/delete', 'destroy')->name('master-position.destroy');
})->middleware('auth');

Route::controller(MasterHimpunanController::class)->group(function () {
    Route::get('/master-period/master-himpunan/{id}/show', 'index')->name('master-himpunan.index');
    Route::get('/master-period/master-himpunan/create/{id}', 'create')->name('master-himpunan.create');
    Route::post('/master-period/master-himpunan/store/{id}', 'store')->name('master-himpunan.store');
    Route::get('/master-period/master-himpunan/{id}/edit', 'edit')->name('master-himpunan.edit');
    Route::put('/master-period/master-himpunan/{id}/update', 'update')->name('master-himpunan.update');
    Route::delete('/master-period/master-himpunan/{id}/delete', 'destroy')->name('master-himpunan.destroy');
})->middleware('auth');

Route::controller(MasterProgramKerjaController::class)->group(function () {
    Route::get('/master-period/master-program-kerja/{id}/show', 'index')->name('master-program-kerja.index');
    Route::get('/master-period/master-program-kerja/create/{id}', 'create')->name('master-program-kerja.create');
    Route::post('/master-period/master-program-kerja/store/{id}', 'store')->name('master-program-kerja.store');
    Route::get('/master-period/master-program-kerja/{id}/edit', 'edit')->name('master-program-kerja.edit');
    Route::put('/master-period/master-program-kerja/{id}/update', 'update')->name('master-program-kerja.update');
    Route::delete('/master-period/master-program-kerja/{id}/delete', 'destroy')->name('master-program-kerja.destroy');
})->middleware('auth');

Route::controller(MasterOpenRekruitmen::class)->group(function () {
    Route::get('/master-open-rekruitmen', 'index')->name('master-open-rekruitmen.index');
    Route::get('/master-open-rekruitmen/create', 'create')->name('master-open-rekruitmen.create');
    Route::post('/master-open-rekruitmen/store', 'store')->name('master-open-rekruitmen.store');
    Route::get('/master-open-rekruitmen/{id}/edit', 'edit')->name('master-open-rekruitmen.edit');
    Route::put('/master-open-rekruitmen/{id}/update', 'update')->name('master-open-rekruitmen.update');
    Route::delete('/master-open-rekruitmen/{id}/delete', 'destroy')->name('master-open-rekruitmen.destroy');
    Route::get('master-open-rekruitmen/{id}/see-registered', 'seeRegistered')->name('master-open-rekruitmen.see-registered');
})->middleware('auth');

Route::controller(OprecRegistController::class)->group(function () {
    Route::get('/master-open-rekruitmen/master-oprec-regist', 'index')->name('oprec-regist.index');
    Route::get('/master-open-rekruitmen/master-oprec-regist/show/{id}', 'show')->name('oprec-regist.show');
    Route::post('/master-open-rekruitmen/master-oprec-regist/store', 'store')->name('oprec-regist.store');
    Route::get('/master-open-rekruitmen/master-oprec-regist/{idOprec}/registered/{idUser}', 'registered')->name('oprec-regist.edit');
})->middleware('auth');

Route::controller(MasterFinancialController::class)->group(function () {
    Route::get('/master-financial/{id}/show', 'index')->name('master-financial.index');
    Route::get('/master-financial/create/{id}', 'create')->name('master-financial.create');
    Route::post('/master-financial/store', 'store')->name('master-financial.store');
    Route::get('/master-financial/{id}/edit', 'edit')->name('master-financial.edit');
    Route::put('/master-financial/{id}/update', 'update')->name('master-financial.update');
    Route::delete('/master-financial/{id}/delete', 'destroy')->name('master-financial.destroy');
})->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
