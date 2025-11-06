<?php

namespace App\Http\Controllers;

use App\Models\Carro;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CarroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Carro::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'marca' => 'required',
            'modelo' => 'required',
            'ano' => 'required|integer'
        ]);

        $carro = Carro::create($request->all());
        return response()->json($carro, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Carro::findOrFail($id);
        // return response()->json($carro);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $carro = Carro::findOrFail($id);
        $carro->update($request->all());

        return response()->json($carro, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Carro::destroy($id);
        return response()->json(null, 204);
    }
}
