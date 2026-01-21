<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Modelo;
use App\Models\Descricao;
use App\Policies\ModeloPolicy;

class ModeloController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Marca::class, 'modelo');
    }
    
    public function index_modelo()
    {   
        $this->authorize('viewAny', Modelo::class);

        return Modelo::with(['marca', 'descricao'])->get();
    }

    public function store_modelo(Request $request)
    {
        $this->authorize('create', Modelo::class);

        $data = $request->validate((new Modelo)->rules());

        $modelo = auth()->user()->modelos()->create($data);

        return response()->json($modelo, 201);
    }

    public function show_modelo(Modelo $modelo)
    {
        $this->authorize('view', $modelo);

        return response()->json($modelo->load(['marca', 'descricao']));
    }
   
    public function update_modelo(Request $request, Modelo $modelo)
    {
        $this->authorize('update', $modelo);

        $data = $request->validate($modelo->rules());
        
        $modelo->update($data);

        return response()->json($modelo);
    }

    public function destroy_modelo(Modelo $modelo)
    {
        $this->authorize('delete', $modelo);
        
        $modelo->delete();
       
        return response()->json(['message' => 'Modelo removido com sucesso']);
    }
}
