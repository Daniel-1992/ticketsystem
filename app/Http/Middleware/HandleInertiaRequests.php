<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        
        $pendingTicketsCount = 0;

        if ($request->user() && $request->user()->role === 'soporte') {
            $pendingTicketsCount = \App\Models\Ticket::where('process_id', $request->user()->proceso)
                ->where('estado', 'abierto')
                ->count();
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user()
                    ? [
                        'id' => $request->user()->id,
                        'name' => $request->user()->name,
                        'role' => $request->user()->role,
                        'email' => $request->user()->email,
                        'proceso' => $request->user()->proceso,
                    ]
                    : null,
            ],
            'pendingTicketsCount' => $pendingTicketsCount
        ]);
    }
}
