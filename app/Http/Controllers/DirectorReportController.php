<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Ticket;
use Carbon\Carbon;
use PDF;

class DirectorReportController extends Controller
{
    //Consulta común para la vista y el PDF
    private function getReporteData($fechaInicio, $fechaFin)
    {
        return Ticket::selectRaw("
                tickets.area as area,
                COUNT(tickets.id) as total_tickets,
                SUM(CASE WHEN tickets.estado = 'abierto' 
                    AND EXTRACT(EPOCH FROM (NOW() - tickets.created_at))/3600 <= 72 
                    THEN 1 ELSE 0 END) as sin_respuesta_en_tiempo,
                SUM(CASE WHEN tickets.estado = 'cerrado' 
                    AND EXTRACT(EPOCH FROM (tickets.updated_at - tickets.created_at))/3600 <= 72 
                    THEN 1 ELSE 0 END) as respondido_en_tiempo,
                SUM(CASE WHEN tickets.estado = 'abierto' 
                    AND EXTRACT(EPOCH FROM (NOW() - tickets.created_at))/3600 > 72 
                    THEN 1 ELSE 0 END) as sin_respuesta_fuera_tiempo,
                SUM(CASE WHEN tickets.estado = 'cerrado' 
                    AND EXTRACT(EPOCH FROM (tickets.updated_at - tickets.created_at))/3600 > 72 
                    THEN 1 ELSE 0 END) as respondido_fuera_tiempo
            ")
            ->whereBetween('tickets.created_at', [$fechaInicio, $fechaFin])
            ->groupBy('tickets.area')
            ->orderBy('tickets.area')
            ->get();
    }

    //Vista en el navegador
    public function index(Request $request)
    {
        $fechaInicio = $request->input('fecha_inicio', Carbon::now()->subWeek()->startOfDay());
        $fechaFin = $request->input('fecha_fin', Carbon::now()->endOfDay());

        $tickets = $this->getReporteData($fechaInicio, $fechaFin);

        return Inertia::render('Director/ReporteTickets', [
            'tickets' => $tickets,
            'fechaInicio' => $fechaInicio->format('Y-m-d'),
            'fechaFin' => $fechaFin->format('Y-m-d')
        ]);
    }

    //Exportar PDF con los mismos datos que la vista

   public function exportPdf(Request $request)
    {
        // ✅ Usar las fechas recibidas del request, no valores por defecto
        $fechaInicio = Carbon::parse($request->input('fecha_inicio'))->startOfDay();
        $fechaFin = Carbon::parse($request->input('fecha_fin'))->endOfDay();

        $tickets = $this->getReporteData($fechaInicio, $fechaFin);

        $pdf = PDF::loadView('pdf.reporte_tickets', [
            'tickets' => $tickets,
            'fechaInicio' => $fechaInicio,
            'fechaFin' => $fechaFin
        ])->setPaper('A4', 'landscape');

        return $pdf->download('Reporte_Tickets_Semana_' . now()->format('Ymd') . '.pdf');
    }
}
