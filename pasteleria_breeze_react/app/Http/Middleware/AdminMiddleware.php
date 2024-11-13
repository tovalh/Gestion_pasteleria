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
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            return Inertia::render('Errors/Unauthorized', [
                'status' => 403,
                'message' => 'No tienes permiso para acceder a esta página'
            ]);
        }

        return $next($request);
    }
}
