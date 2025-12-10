<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Modelo;
use App\Models\Descricao;

class ModeloController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index_modelo()
    {
        $modelos = Modelo::with(['marca', 'descricao'])->get();
        return response()->json($modelos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store_modelo(Request $request)
    {
        $modelo = new Modelo();
        $request->validate((new Modelo)->rules());
        $novoModelo = Modelo::create($request->all());

        return response()->json($novoModelo, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show_modelo($id)
    {
        try {
            $modelo = Modelo::with('marca')->findOrFail($id);
            return response()->json($modelo, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'mensagem' => 'Modelo não encontrado(ou não existe)'
            ], 404);
        }
    }
    //     public function marca($id) { $modelo = Modelo::with('marca')->findOrFail($id); return response()->json($modelo, 200); }
    /**
     * Update the specified resource in storage.
     */
    public function update_modelo(Request $request, $id)
    {
        $modelo = Modelo::findOrFail($id);
        $request->validate($modelo->rules());
        $modelo->update($request->all());

        return response()->json($modelo, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy_modelo($id)
    {
        $modelo = Modelo::findOrFail($id);
        $modelo->delete();

        // return response()->json(null, 204);
        return response()->json(['message' => 'Modelo removido com sucesso'], 200);
    }
}
