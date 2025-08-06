<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\TicketFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->hasRole('soporte')) {
            // Filtrar por process_id del usuario soporte
            $tickets = Ticket::where('process_id', $user->process_id)
                ->latest()
                ->get();


             // ===== Cálculo del semáforo =====
            foreach ($tickets as $ticket) {
                // Ejemplo de lógica básica — adáptala a tu caso real
                if ($ticket->estado === 'cerrado' && !empty($ticket->respuesta_en_tiempo) && $ticket->respuesta_en_tiempo) {
                    $ticket->color = 'verde'; // Se respondió en tiempo
                } 
                elseif ($ticket->estado === 'cerrado') {
                    $ticket->color = 'rojo'; // Se respondió fuera de tiempo
                } 
                elseif (!empty($ticket->sin_respuesta_fuera_tiempo) && $ticket->sin_respuesta_fuera_tiempo) {
                    $ticket->color = 'naranja'; // Sin respuesta fuera de tiempo
                } 
                else {
                    $ticket->color = 'amarillo'; // Sin respuesta y en tiempo
                }
            }

        }
        elseif ($user->hasRole('director') || $user->hasRole('admin')) {
            // Director y admin ven todos los tickets
            $tickets = Ticket::latest()->get();
        }
        else {
            // Usuario común → solo los suyos
            $tickets = Ticket::where('user_id', $user->id)
                ->latest()
                ->get();
        }


       



        // Retornar la vista con tu layout personalizado
        return inertia('Tickets/MyTickets', [
            'tickets' => $tickets,
            'userRole' => $user->role // ← para que la vista sepa el rol
        ]);
    }

    public function create()
    {
        $procesos = \DB::table('processes')->get();
        return Inertia::render('Tickets/CreateTicket', [
            'procesos' => $procesos
        ]);
    }

   public function store(Request $request)
    {
        $request->validate([
            'area' => 'required|string',
            'process_id' => 'required|exists:processes,id',
            'nivel_importancia' => 'required|in:Baja,Media,Alta,Urgente',
            'descripcion' => 'required|string',
            'files' => 'nullable|array|max:6',
            'files.*' => 'nullable|file|mimes:pdf,xls,xlsx,docx,png,jpg,jpeg|max:1024',
        ]);

        $ticket = Ticket::create([
            'user_id' => Auth::id(),
            'area' => $request->area, 
            'process_id' => $request->process_id,
            'nivel_importancia' => $request->nivel_importancia,
            'descripcion' => $request->descripcion,
            'estado' => 'abierto',
        ]);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('tickets');
                TicketFile::create([
                    'ticket_id' => $ticket->id,
                    'path' => $path,
                    'nombre_original' => $file->getClientOriginalName(),
                    'mime' => $file->getMimeType(),
                    'size' => $file->getSize(),
                ]);
            }
        }

        return redirect()
        ->route('tickets.index')
        ->with('ticket_created', true);
    }

    public function show(Ticket $ticket)
    {
        // Validar que el ticket pertenece al usuario logueado
        if ($ticket->user_id !== auth()->id()) {
            abort(403, 'No tienes permiso para ver este ticket.');
        }

        $ticket->load([
            'archivos',
            'respuestas' => function ($query) {
                $query->latest();
            }
        ]);

        return Inertia::render('Tickets/TicketDetail', [
            'ticket' => $ticket
        ]);
    }

}