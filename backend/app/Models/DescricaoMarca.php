<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DescricaoMarca extends Model
{
    use HasFactory;

    protected $table = 'descricao_marca';

    protected $fillable = ['nacionalidade', 'marca_id'];

    public function rules() {
        return [
            'nacionalidade' => 'required|string',
            'marca_id' => 'required|exists:'.(new Marca)->getTable().',id'
        ];
    }

    public function marca() {
        return $this->belongsTo(Marca::class);
    }
}
