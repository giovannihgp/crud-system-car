<?php

use Illuminate\Support\Facades\Route;

// Route::middleware('auth:sanctum')->get('/api/user', function (Request $request) {
//     return $request->user();
// });

// Route::middleware(['role:admin'])->get('/admin-test', function () {
//     return 'ACESSO LIBERADO PARA ADMIN';
// });

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
});
