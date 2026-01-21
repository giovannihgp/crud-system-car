<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Modelo;
use App\Models\User;

class ModeloPolicy
{
    public function before(User $user, string $ability)
    {
        if ($user->hasRole('admin')) {
            return true;
        }
    }

    public function viewAny(User $user): bool
    {
        return true;
    }
    
    public function view(User $user, Modelo $modelo): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Modelo $modelo): bool
    {
        return $modelo->user_id === $user->id;
    }

    public function delete(User $user, Modelo $modelo): bool
    {
        return $modelo->user_id === $user->id;
    }

    public function restore(User $user, Modelo $modelo): bool
    {
        return false;
    }

    public function forceDelete(User $user, Modelo $modelo): bool
    {
        return false;
    }
}
