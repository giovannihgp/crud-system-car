<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marca extends Model
{
    use HasFactory;

    protected $table = 'marcas';

    protected $fillable = ['nome'];

    public function rules() {
        return [
            'nome' => 'required|string|min:3|max:150|unique:marcas,nome',
        ];
    }

    public function modelos() {

        return $this->hasMany(Modelo::class);
    }

    public function descricao_marca() {
        return $this->hasOne(DescricaoMarca::class);
    }

    public function descricoes() {
        return $this->hasOne(DescricaoMarca::class);
    }
}
