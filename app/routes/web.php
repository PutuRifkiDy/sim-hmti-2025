<?php

use App\Http\Controllers\MasterSieController;
use App\Http\Controllers\MasterUserController;
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
});

Route::controller(MasterSieController::class)->group(function () {
    Route::get('/master-sie', 'index')->name('master-sie.index');
    Route::get('/master-sie/create', 'create')->name('master-sie.create');
    Route::post('/master-sie/store', 'store')->name('master-sie.store');
    Route::get('/master-sie/{id}/edit', 'edit')->name('master-sie.edit');
    Route::put('/master-sie/{id}/update', 'update')->name('master-sie.update');
    Route::delete('/master-sie/{id}/delete', 'destroy')->name('master-sie.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
