<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        DB::table('users')->truncate();

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $usuarios = [
            [
                'id' => 1,
                'username' => 'admin',
                'password' => Hash::make('123'),
                // 'role' => 1
            ],
        ];
        
        DB::table('users')->insert($usuarios);

    }
}
