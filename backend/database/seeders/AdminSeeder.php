<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('users')->truncate();
        DB::table('roles')->truncate();
        DB::table('model_has_roles')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $adminRole = Role::firstOrCreate([
            'name' => 'admin',
            'guard_name' => 'web'
        ]);

        $userRole = Role::firstOrCreate([
            'name' => 'user',
            'guard_name' => 'web'
        ]);

        $admin = User::create([
            'username' => 'admin',
            'password' => Hash::make('123'),
            'is_admin' => true,
        ]);
        
        $user = User::create([
            'username' => 'user',
            'password' => Hash::make('123'),
        ]);

        $admin->assignRole($adminRole);
        $user->assignRole($userRole);

        echo "✔ User e Admin criado com sucesso.\n";
    }
}
