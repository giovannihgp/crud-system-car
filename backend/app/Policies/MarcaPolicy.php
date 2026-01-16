<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Marca;
use App\Models\User;

class MarcaPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Marca $marca): bool
    {
        return false;
    }

    public function create(User $user)
    {
        return $user->hasRole('admin');
    }

    public function update(User $user, Marca $marca)
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return $marca->user_id === $user->id;
    }

    public function delete(User $user, Marca $marca)
    {
        if ($user->hasRole('admin')) {
            return true;
        }

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
