<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use App\Models\Marca;
use App\Models\Modelo;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasProfilePhoto;
    use TwoFactorAuthenticatable;
    
    protected $fillable = [
        'username',
        'password',
    ];

    public function marcas()
    {
        return $this->hasMany(Marca::class);
    }

    public function modelos(){
        return $this->hasMany(Modelo::class);
    }
    
}
