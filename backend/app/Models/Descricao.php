<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Descricao extends Model
{
    use HasFactory;

    protected $table = 'descricoes';

    protected $fillable = ['modelo_id', 'preco', 'ano', 'zero_km', 'km_rodados'];

    public function rules() {
        return [
            'modelo_id' => 'required|exists:'.(new Modelo)->getTable().',id',
            'preco' => 'required|integer',
            'ano' => 'required|digits:4|integer',
            'zero_km' => 'required|boolean',
            'km_rodados' => 'required|integer'
        ];
    }

    public function modelo() {
        return $this->belongsTo(Modelo::class);
    }

}