<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reporte de Tickets</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        h1 { text-align: center; margin-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { border: 1px solid #ccc; padding: 6px; text-align: center; }
        th { background-color: #f2f2f2; }
        .verde { color: green; font-weight: bold; }
        .amarillo { color: orange; font-weight: bold; }
        .rojo { color: red; font-weight: bold; }
    </style>
</head>
<body>

    <h1>Reporte Semanal de Tickets</h1>
    <p>Fecha de reporte: {{ now()->format('d/m/Y') }}</p>
    <p>Periodo: {{ \Carbon\Carbon::parse($fechaInicio)->format('d/m/Y') }} al {{ \Carbon\Carbon::parse($fechaFin)->format('d/m/Y') }}</p>

    <table>
        <thead>
            <tr>
                <th>Área</th>
                <th>Total Tickets</th>
                <th>Sin respuesta (en tiempo)</th>
                <th>Respondido en tiempo</th>
                <th>Sin respuesta (fuera de tiempo)</th>
                <th>Respondido fuera de tiempo</th>
            </tr>
        </thead>
        <tbody>
            @forelse($tickets as $row)
                <tr>
                    <td>{{ $row->area }}</td>
                    <td>{{ $row->total_tickets }}</td>
                    <td class="amarillo">{{ $row->sin_respuesta_en_tiempo }}</td>
                    <td class="verde">{{ $row->respondido_en_tiempo }}</td>
                    <td class="rojo">{{ $row->sin_respuesta_fuera_tiempo }}</td>
                    <td class="rojo">{{ $row->respondido_fuera_tiempo }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="6">No hay datos para este rango de fechas</td>
                </tr>
            @endforelse
        </tbody>
    </table>

</body>
</html>
