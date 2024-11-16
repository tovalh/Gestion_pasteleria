<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->check() || !auth()->user()->isAdmin()) {
            if ($request->wantsJson()) {
                return response()->json(['error' => 'No autorizado'], 403);
            }

            // Redirección directa al inicio
            return redirect()->route('inicio');
        }

        return $next($request);
    }
}
