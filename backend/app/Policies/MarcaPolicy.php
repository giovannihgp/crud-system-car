<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Marca;
use App\Models\User;

class MarcaPolicy
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

    public function view(User $user, Marca $marca): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Marca $marca): bool
    {
        return $marca->user_id === $user->id;
    }

    public function delete(User $user, Marca $marca): bool
    {
        return $marca->user_id === $user->id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Marca $marca): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Marca $marca): bool
    {
        return false;
    }
}
