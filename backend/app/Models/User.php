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


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasProfilePhoto;
    use TwoFactorAuthenticatable;
    

    // protected $table = 'users';

    protected $fillable = [
        'username',
        'password',
        // 'role',
    ];

    public function username(){
        return 'username';
    }

    
    // public function __construct(User $user){ 
    //     $this->user = $user; 
    // }
}
