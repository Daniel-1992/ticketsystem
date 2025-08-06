<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TicketResponseController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\SupportTicketController;
use App\Http\Controllers\DirectorReportController;

// =====================
// Página de bienvenida
// =====================
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// =====================
// Dashboard general con redirección por rol
// =====================
Route::get('/dashboard', function () {
    $role = Auth::user()->role;

    if ($role === 'soporte') {
        return redirect('/tickets');
    }
    if ($role === 'usuario') {
        return redirect('/tickets');
    }
    if ($role === 'director') {
        return redirect('/director/reporte-tickets');
    }

    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// =====================
// Módulo de tickets (unificada para todos los roles autenticados)
// =====================
Route::middleware(['auth'])->group(function () {
    // Listar tickets (filtro por rol dentro del controlador)
    Route::get('/tickets', [TicketController::class, 'index'])->name('tickets.index');

    // Crear ticket
    Route::get('/tickets/crear', [TicketController::class, 'create'])->name('tickets.create');
    Route::post('/tickets', [TicketController::class, 'store'])->name('tickets.store');

    // Ver detalle del ticket
    Route::get('/tickets/{ticket}', [TicketController::class, 'show'])->name('tickets.show');

    // Responder ticket cerrado
    Route::get('/tickets/{ticket}/responder', function (\App\Models\Ticket $ticket) {
        return Inertia::render('Tickets/RespondTicket', [
            'ticket' => $ticket->load('archivos', 'respuestas'),
        ]);
    })->name('tickets.responder');

    Route::post('/tickets/{ticket}/responder', [TicketResponseController::class, 'store'])->name('tickets.respond');
});

// =====================
// Funciones exclusivas de soporte
// =====================


Route::middleware(['auth', 'role:soporte'])->group(function () {
    Route::get('/soporte/tickets/{ticket}/responder', function (\App\Models\Ticket $ticket) {
        return inertia('Tickets/RespondSupport', [
            'ticket' => $ticket
        ]);
    })->name('support.tickets.form');

    Route::post('/soporte/tickets/{ticket}/responder', [\App\Http\Controllers\SupportTicketController::class, 'respond'])
        ->name('support.tickets.respond');
});


// =====================
// Dashboard de director
// =====================
Route::middleware(['auth', 'role:director'])->group(function () {
    Route::get('/director/reporte-tickets', [DirectorReportController::class, 'index'])->name('director.reporte');
    Route::get('/director/reporte-tickets/export', [DirectorReportController::class, 'exportPdf'])->name('director.reporte.export');
    Route::get('/admin', fn() => Inertia::render('Dashboards/DirectorDashboard'));
    Route::get('/reportes', fn() => Inertia::render('Reportes'));
    Route::get('/usuarios', fn() => Inertia::render('Usuarios'));
});

// =====================
// API para obtener procesos por área
// =====================
Route::get('/api/processes/{areaId}', function ($areaId) {
    return Process::where('area_id', $areaId)->get();
});

require __DIR__.'/auth.php';
