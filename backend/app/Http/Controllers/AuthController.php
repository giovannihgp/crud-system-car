<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    public function login(Request $request) {

        $data = $request->validate([
            'username' => ['required'],
            'password' => ['required'],
        ]);

        if(!Auth::attempt($data)) {
            return response()->json([
                'message' => 'Credenciais inválidas.'
            ], 401);
        }

        $user = Auth::user();

        return response()->json([
            'token' => $user->createToken('api-token')->plainTextToken,
            'user' => $user,
            'roles' => $user->getRoleNames(),
        ]);
    }

    public function logout(Request $request) { 

        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout realizado!']);
    }
}
