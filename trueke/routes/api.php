<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\PieceController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TruekeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

require __DIR__ . '/auth.php';

Route::controller(RegisteredUserController::class)->prefix('users')->name('users.')->group(function () {
	Route::get('/{id}', 'show')->name('show')->middleware('auth:sanctum');
	Route::patch('/{id}', 'update')->name('update')->middleware('auth:sanctum');
});

Route::controller(PostController::class)->prefix('posts')->name('posts.')->group(function () {
	Route::get('/', 'index')->name('index');
	Route::get('/{id}', 'show')->name('show');
	Route::post('/create', 'create')->name('create')->middleware('auth:sanctum');
	Route::patch('/edit/{id}', 'edit')->name('edit')->middleware('auth:sanctum');
	Route::delete('/{id}', 'destroy')->name('destroy')->middleware('auth:sanctum');
});

Route::controller(PieceController::class)->prefix('pieces')->name('pieces.')->group(function () {
	Route::get('/', 'index')->name('index');
	Route::get('/{id}', 'show')->name('show');
	Route::post('/', 'create')->name('create')->middleware('auth:sanctum');
	Route::patch('/{id}', 'edit')->name('edit')->middleware('auth:sanctum');
	Route::delete('/{id}', 'destroy')->name('destroy')->middleware('auth:sanctum');
});

Route::controller(OfferController::class)->prefix('offers')->name('offers.')->group(function () {
	Route::get('/', 'index')->name('index')->middleware('auth:sanctum');
	Route::get('/{id}', 'show')->name('show')->middleware('auth:sanctum');
	Route::post('/', 'create')->name('create')->middleware('auth:sanctum');
	Route::patch('/edit/{id}', 'edit')->name('edit')->middleware('auth:sanctum');
	Route::delete('/{id}', 'destroy')->name('destroy')->middleware('auth:sanctum');
});

Route::controller(TruekeController::class)->prefix('truekes')->name('truekes.')->group(function () {
	Route::get('/', 'index')->name('index')->middleware('auth:sanctum');
	Route::get('/{id}', 'show')->name('show')->middleware('auth:sanctum');
	Route::post('/create', 'create')->name('create')->middleware('auth:sanctum');
	Route::patch('/edit/{id}', 'edit')->name('edit')->middleware('auth:sanctum');
	Route::delete('/{id}', 'destroy')->name('destroy')->middleware('auth:sanctum');
});
