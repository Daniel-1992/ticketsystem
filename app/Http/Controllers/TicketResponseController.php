<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\TicketResponse;
use App\Models\TicketFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TicketResponseController extends Controller
{
    public function store(Request $request, Ticket $ticket)
    {
        // Validar que el ticket sea del usuario
        if ($ticket->user_id !== Auth::id()) {
            abort(403, 'No tienes permiso para responder este ticket');
        }

        // Validar datos
        $request->validate([
            'mensaje' => 'nullable|string',
            'files' => 'nullable|array|max:6',
            'files.*' => 'nullable|file|mimes:pdf,xls,xlsx,docx,png,jpg,jpeg|max:1024',
            'resuelto' => 'required|boolean'
        ]);

        // Crear respuesta
        TicketResponse::create([
            'ticket_id' => $ticket->id,
            'user_id' => Auth::id(),
            'mensaje' => $request->mensaje ?? '',
            'tipo' => 'respuesta_usuario'
        ]);

        // Guardar archivos (unificado con soporte)
        $this->guardarArchivos($request, $ticket);

        // Actualizar estado
        $ticket->update([
            'estado' => $request->resuelto ? 'cerrado' : 'reabierto'
        ]);

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
