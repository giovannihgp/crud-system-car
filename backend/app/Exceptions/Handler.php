<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Spatie\Permission\Exceptions\UnauthorizedException as SpatieUnauthorized;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function render($request, Throwable $exception)
    {
        // 401 - Não autenticado
        if ($exception instanceof AuthenticationException) {
            return response()->json([
                'message' => 'Você precisa fazer login para acessar este recurso.',
            ], 401);
        }

        // 403 - Sem permissão (spatie/laravel-permission)
        if ($exception instanceof SpatieUnauthorized) {
            return response()->json([
                'message' => 'Você não tem permissão para realizar esta ação.',
            ], 403);
        }

        return parent::render($request, $exception);
    }

    public function register()
    {
        
    }

}
