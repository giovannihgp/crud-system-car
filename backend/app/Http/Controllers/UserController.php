<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
// use App\Http\Requests\User\StoreUser;

class UserController extends Controller
{
    public function index_user()
    {
        return User::all();
    }

    public function store_user(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6',
        ]);

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        return response()->json($user, 201);
    }


    public function show_user(User $user)
    {
        $this->authorize('view', $user);

        return $user;
    }

    public function update_user(Request $request, User $user)
    {
        $this->authorize('update', $user);

        $data = $request->validate([
            'username' => ['sometimes', 'unique:users,username,' . $user->id],
        ]);

        $user->update($data);

        return $user;
    }

    public function update_password(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'current_password' => ['required'],
            'password' => ['required', 'min:6', 'confirmed'],
        ]);

        if(!Hash::check($data['current_password'], $user->password)) {
            return response()->json([
                'message' => 'Senha atual incorreta'
            ], 422);
        }

        $user->update([
            'password' => Hash::make($data['password']),
        ]);

        return response()->json([
            'message' => 'Senha atualizada'
        ]);
    }
}
