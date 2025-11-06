<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Descricao;
use App\Models\Marca;

class DescricaoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index_descricao()
    {
        return Descricao::with(['modelo.marca'])->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store_descricao(Request $request)
    {
        $descricao = new Descricao();
        $request->validate((new Descricao)->rules());
        $novoDescricao = Descricao::create($request->all());

        return response()->json($novoDescricao, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show_descricao($id)
    {
        try {
            $descricao = Descricao::with(['modelo.marca'])->findOrFail($id);
            return response()->json($descricao, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'mensagem' => 'Descrição não encontrada(ou não existe)'
            ]);
        }
    }
    /**
     * Update the specified resource in storage.
     */
    public function update_descricao(Request $request, $id)
    {
        $descricao = Descricao::findOrFail($id);
        $request->validate($descricao->rules());
        $descricao->update($request->all());

        return response()->json($descricao, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy_descricao($id)
    {
        $descricao = Descricao::findOrFail($id);
        $descricao->delete();

        return response()->json(null, 204);
    }
}
