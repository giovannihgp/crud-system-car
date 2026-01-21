<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Marca;
use App\Models\DescricaoMarca;
use App\Policies\MarcaPolicy;

class MarcaController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Marca::class, 'marca');
    }

    public function index_marca()
    {
        $this->authorize('viewAny', Marca::class);

        return Marca::with('modelos', 'descricao_marca')->get();
    }

    public function store_marca(Request $request)
    {
        $this->authorize('create', Marca::class);

        $data = $request->validate((new Marca)->rules());
        // $data ['user_id'] = Auth::id();
        // $marca = Marca::create($data);
        $marca = auth()->user()->marcas()->create($data);

        return response()->json($marca, 201);
    }
    
    public function show_marca(Marca $marca)
    {
        $this->authorize('view', $marca);

        return response()->json($marca);
    }

    public function update_marca(Request $request, Marca $marca)
    {
        $this->authorize('update', $marca);

        $data = $request->validate($marca->rules());

        $marca->update($data);

        return response()->json($marca);
    }

    public function destroy_marca(Marca $marca)
    {    
        $this->authorize('delete', $marca);

        $marca->delete();

        return response()->json(['message' => 'Marca removida com sucesso']);
    }
}
