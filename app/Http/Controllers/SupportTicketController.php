<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\TicketResponse;
use App\Models\TicketFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\TicketResponded;


class SupportTicketController extends Controller
{
    public function respond(Request $request, Ticket $ticket)
    {
        // Solo soporte puede responder
        if (Auth::user()->role !== 'soporte') {
            abort(403, 'No autorizado');
        }

        // Validar ticket abierto
        if ($ticket->estado !== 'abierto') {
            return back()->with('error', 'Solo puedes responder tickets abiertos');
        }

        // Validar datos
        $request->validate([
            'mensaje' => 'required|string',
            'files' => 'required|array|min:1|max:6',
            'files.*' => 'file|mimes:pdf,xls,xlsx,docx,png,jpg,jpeg|max:1024'
        ]);

        // Crear respuesta
        TicketResponse::create([
            'ticket_id' => $ticket->id,
            'user_id' => Auth::id(),
            'mensaje' => $request->mensaje,
            'tipo' => 'respuesta_soporte'
        ]);

        // Guardar archivos (misma función que en usuario)
        $this->guardarArchivos($request, $ticket);

        // Actualizar estado (aquí puedes usar 'cerrado' o 'reabierto' según tu lógica)
        $ticket->update(['estado' => 'cerrado']);

        Mail::to($ticket->usuario->email)->send(new TicketResponded($ticket));

        return redirect()->route('tickets.index')->with('success', 'Respuesta registrada');
    }

    /**
     * Guarda archivos asociados al ticket
     */
    private function guardarArchivos(Request $request, Ticket $ticket)
    {
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('tickets_respuestas', 'public');

                TicketFile::create([
                    'ticket_id' => $ticket->id,
                    'path' => $path,
                    'nombre_original' => $file->getClientOriginalName(),
                    'mime' => $file->getMimeType(),
                    'size' => $file->getSize()
                ]);
            }
        }
    }



}
