<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [RegisteredUserController::class, 'create'])
	->name('register');

Route::post('/login', [AuthenticatedSessionController::class, 'login'])
	->name('login');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
	->name('password.email');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
	->name('password.store');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
	->middleware('auth:sanctum')
	->name('logout');
