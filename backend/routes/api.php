<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarroController;
use App\Http\Controllers\MarcaController;
use App\Http\Controllers\ModeloController;
use App\Http\Controllers\DescricaoController;
use App\Http\Controllers\DescricaoMarcaController;

// use App\Models\Marca;
// use App\Models\Modelo;

// Route::post('/seed', function (Request $request) {
//     Marca::truncate();
//     Modelo::truncate();

//     Marca::insert($request->marcas);
//     Modelo::insert($request->modelos);

//     return response()->json(['message' => 'Seed concluído com sucesso!']);
// });

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('carros')->group(function() {
    Route::get('/', [CarroController::class, 'index']);
    Route::post('/', [CarroController::class, 'store']);
    Route::get('{id}', [CarroController::class, 'show']);
    Route::put('{id}', [CarroController::class, 'update']);
    Route::delete('{id}', [CarroController::class, 'destroy']);
});

// Route::apiResource('marca', MarcaController::class);
// Route::apiResource('modelos', ModeloController::class);
// Route::apiResource('descricoes', DescricaoController::class);
// Route::apiResource('descricaoMarca', DescricaoMarcaController::class);

Route::prefix('marca')->group(function () {
    Route::get('/', [MarcaController::class, 'index_marca']);
    Route::post('/', [MarcaController::class, 'store_marca']);
    Route::get('{id}', [MarcaController::class, 'show_marca']);
    Route::put('{id}', [MarcaController::class, 'update_marca']);
    Route::delete('{id}', [MarcaController::class, 'destroy_marca']);
});

Route::prefix('modelos')->group(function () {
    Route::get('/', [ModeloController::class, 'index_modelo']);
    Route::post('/', [ModeloController::class, 'store_modelo']);
    Route::get('{id}', [ModeloController::class, 'show_modelo']);
    Route::put('{id}', [ModeloController::class, 'update_modelo']);
    Route::delete('{id}', [ModeloController::class, 'destroy_modelo']);
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