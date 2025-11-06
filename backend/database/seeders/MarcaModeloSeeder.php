<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class MarcaModeloSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        DB::table('modelos')->truncate();
        DB::table('marcas')->truncate();

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $marcas = [
            ['id' => 1, 'nome' => 'Volkswagen'],
            ['id' => 2, 'nome' => 'Hyndai'],
            ['id' => 3, 'nome' => 'Ford'],
        ];

        DB::table('marcas')->insert($marcas);

        $modelos = [
            [
                'id' => 1, 
                'nome' => 'Ford Ka 1.0', 
                'numero_portas' => 4, 
                'air_bag' => true, 
                'abs' => true, 
                'marca_id' => 3,
                'imagem' => 'ford_ka_1_0.png',
            ],
            [
                'id' => 2, 
                'nome' => 'Ford Ka Sedan 1.0', 
                'numero_portas' => 4,
                'air_bag' => true, 
                'abs' => true, 
                'marca_id' => 3,
                'imagem' => 'ford_ka_sedan_1_0.png',
            ],
            [
                'id' => 3, 
                'nome' => 'Hb20 1.0', 
                'numero_portas' => 4, 
                'air_bag' => true, 
                'abs' => false, 
                'marca_id' => 2,
                'imagem' => 'hyundai_hb20_1_0.png',
            ],
            [
                'id' => 4, 
                'nome' => 'Hb20s 1.0', 
                'numero_portas' => 4, 
                'air_bag' => true, 
                'abs' => true,
                'marca_id' => 2,
                'imagem' => 'hyundai_hb20s_1_0.png',
            ],
            [
                'id' => 5, 
                'nome' => 'Gol 1.0', 
                'numero_portas' => 2, 
                'air_bag' => false, 
                'abs' => true, 
                'marca_id' => 1,
                'imagem' => 'volkswagen_gol_1_0.png',
            ],
            [
                'id' => 6, 
                'nome' => 'Gol 1.6', 
                'numero_portas' => 3, 
                'air_bag' => true, 
                'abs' => false, 
                'marca_id' => 1,
                'imagem' => 'volkswagen_gol_1_6.png',
            ],
            [
                'id' => 7,
                 'nome' => 'Polo 1.0', 
                 'numero_portas' => 4, 
                 'air_bag' => true, 
                 'abs' => true, 
                 'marca_id' => 1,
                 'imagem' => 'volkswagen_polo_1_0.png'
            ],
        ];

        foreach ($modelos as &$modelo) {
            $path = database_path('seeders/images/' . $modelo['imagem']);

            if (File::exists($path)) {
                $ext = pathinfo($path, PATHINFO_EXTENSION);
                $base64 = base64_encode(File::get($path));
                $modelo['imagem'] = "data:image/{$ext};base64,{$base64}";
            } else {
                $modelo['imagem'] = null;
            }
        }

        DB::table('modelos')->insert($modelos);
    }
}