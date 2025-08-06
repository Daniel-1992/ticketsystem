<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Maneja la petición entrante.
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        // Si el usuario no está autenticado
        if (!auth()->check()) {
            abort(403, 'Acceso denegado.');
        }

        // Si el rol del usuario no coincide
        if (auth()->user()->role !== $role) {
            abort(403, 'No tienes permiso para acceder a esta sección.');
        }

        return $next($request);
    }
}