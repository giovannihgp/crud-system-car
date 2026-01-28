<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarroController;
use App\Http\Controllers\MarcaController;
use App\Http\Controllers\ModeloController;
use App\Http\Controllers\DescricaoController;
use App\Http\Controllers\DescricaoMarcaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\IsAdmin;
use App\Models\User;
use App\Models\Marca;

// use App\Models\Modelo;

Route::post("/login", [AuthController::class, "login"]);
Route::post('/users', [UserController::class, 'store_user']);

Route::middleware("auth:sanctum")->group(function() {
    Route::post("/logout", [AuthController::class, "logout"]);
    Route::get('/me', fn (Request $r) => $r->user());
    Route::get('/users', [UserController::class, 'index_user']);    
    Route::get('/users/{user}', [UserController::class, 'show_user']);
    Route::put('/users/{user}', [UserController::class, 'update_user']);

});

Route::middleware("auth:sanctum")->put("/novaSenha", [UserController::class, "update_password"]);

Route::get('/marca', [MarcaController::class, 'index_marca']);
Route::get('/marca', [MarcaController::class, 'index_marca']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/marca', [MarcaController::class, 'store_marca']);
    Route::get('/marca/{marca}', [MarcaController::class, 'show_marca']);
    Route::put('/marca/{marca}', [MarcaController::class, 'update_marca']);
    Route::delete('/marca/{marca}', [MarcaController::class, 'destroy_marca']);

    Route::get('/marca', [MarcaController::class, 'index_marca']);
    Route::get('/modelo', [ModeloController::class, 'index_modelo']);
    Route::post('/modelo', [ModeloController::class, 'store_modelo']);
    Route::get('/modelo/{modelo}', [ModeloController::class, 'show_modelo']);
    Route::put('/modelo/{modelo}', [ModeloController::class, 'update_modelo']);
    Route::delete('/modelo/{modelo}', [ModeloController::class, 'destroy_modelo']);
});

Route::prefix('carros')->group(function() {
    Route::get('/', [CarroController::class, 'index']);
    Route::post('/', [CarroController::class, 'store']);
    Route::get('{id}', [CarroController::class, 'show']);
    Route::put('{id}', [CarroController::class, 'update']);
    Route::delete('{id}', [CarroController::class, 'destroy']);
});

Route::prefix('descricoes')->group(function () {
    Route::get('/', [DescricaoController::class, 'index_descricao']);
    Route::post('/', [DescricaoController::class, 'store_descricao']);
    Route::get('{id}', [DescricaoController::class, 'show_descricao']);
    Route::put('{id}', [DescricaoController::class, 'update_descricao']);
    Route::delete('{id}', [DescricaoController::class, 'destroy_descricao']);
});

Route::prefix('descricao_marca')->group(function () {
    Route::get('/', [DescricaoMarcaController::class, 'index_descricao_marca']);
    Route::post('/', [DescricaoMarcaController::class, 'store_descricao_marca']);
    Route::get('{id}', [DescricaoMarcaController::class, 'show_descricao_marca']);
    Route::put('{id}', [DescricaoMarcaController::class, 'update_descricao_marca']);
    Route::delete('{id}', [DescricaoMarcaController::class, 'destroy_descricao_marca']);
});

// Route::middleware('auth:sanctum')->group(function () {
    // Route::get('/modelos', [ModeloController::class, 'index_modelo']);
    // Route::post('/modelos', [ModeloController::class, 'store_modelo']);
    // Route::get('/modelos/{id}', [ModeloController::class, 'show_modelo']);
    // Route::get('/marca', [MarcaController::class, 'index_marca']);
    // Route::post('/marca', [MarcaController::class, 'store_marca']);
    // Route::get('/marca/{id}', [MarcaController::class, 'show_marca']);
// });

