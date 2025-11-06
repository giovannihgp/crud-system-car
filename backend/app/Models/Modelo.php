<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modelo extends Model
{
    use HasFactory;

    protected $table = 'modelos';

    protected $fillable = [
        'nome', 
        'numero_portas', 
        'air_bag', 
        'abs', 
        'marca_id', 
        'imagem'
    ];

    public function rules() {
        return [

            'nome' => 'required|string|min:3|max:50',
            'numero_portas' => 'required|integer|min:1|max:6',
            'air_bag' => 'required|boolean',
            'abs' => 'required|boolean',
            'marca_id' => 'required|exists:'.(new Marca)->getTable().',id',
            'imagem' => 'nullable|string',
        ];
    }

    public function marca() {

        return $this->belongsTo(Marca::class);
    }

    public function descricao() {
        return $this->hasOne(Descricao::class);
    }
}
