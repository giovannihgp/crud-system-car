<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Marca;
use App\Models\DescricaoMarca;

class MarcaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index_marca()
    {
        return Marca::with('modelos', 'descricao_marca')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store_marca(Request $request)
{
    try {
        $marca = new Marca();

        $request->validate($marca->rules());

        $novaMarca = Marca::create($request->all());

        return response()->json($novaMarca, 201);

    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'message' => 'Já existe uma marca com esse nome!',
            'errors' => $e->errors()
        ], 422);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Erro ao criar a marca.',
            'error' => $e->getMessage()
        ], 500);
    }
}
    /**
     * Display the specified resource.
     */
    public function show_marca($id)
    {
        try {
            $marca = Marca::with('modelos')->findOrFail($id);
            return response()->json($marca, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Marca não encontrada(ou não existe)',
                'message' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update_marca(Request $request, $id)
    {
        $marca = Marca::findOrFail($id);
        $request->validate($marca->rules());
        $marca->update($request->all());

        return response()->json($marca, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy_marca($id)
    {
        $marca = Marca::findOrFail($id);
        $marca->delete();

        // return response()->json(null, 204);
        return response()->json(['message' => 'Marca removida com sucesso'], 200);
    }
}
