<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DescricaoMarca;

class DescricaoMarcaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index_descricao_marca()
    {
        return DescricaoMarca::with('marca')->get();
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store_descricao_marca(Request $request)
    {
        $descricaoMarca = new DescricaoMarca();
        $request->validate($descricaoMarca->rules());
        $novaDescricaoMarca = DescricaoMarca::create($request->all());

        return response()->json($novaDescricaoMarca, 201);
    }
    /**
     * Display the specified resource.
     */
    public function show_descricao_marca($id)
    {
        $descricaoMarca = DescricaoMarca::with('marca')->findOrFail($id);

        return response()->json($descricaoMarca, 200);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update_descricao_marca(Request $request, $id)
    {
        $descricaoMarca = DescricaoMarca::findOrFail($id);
        $request->validate($descricaoMarca->rules());
        $descricaoMarca->update($request->all());

        return response()->json($descricaoMarca, 200);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy_descricao_marca($id)
    {
        $descricaoMarca = DescricaoMarca::findOrFail($id);
        $descricaoMarca->delete();

        return response()->json(null, 204);
    }
}