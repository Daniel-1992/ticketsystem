import { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function ReporteTickets() {
    const { tickets, fechaInicio, fechaFin } = usePage().props as any;

    const [startDate, setStartDate] = useState(fechaInicio);
    const [endDate, setEndDate] = useState(fechaFin);

    const handleFilter = () => {
        router.get('/director/reporte-tickets', {
            fecha_inicio: startDate,
            fecha_fin: endDate
        });
    };

    const handleExport = () => {
        window.location.href = `/director/reporte-tickets/export?fecha_inicio=${startDate}&fecha_fin=${endDate}`;
    };

    const getColor = (key: string) => {
        switch (key) {
            case 'respondido_en_tiempo':
                return 'text-green-600 font-bold';
            case 'sin_respuesta_en_tiempo':
                return 'text-yellow-600 font-bold';
            case 'sin_respuesta_fuera_tiempo':
            case 'respondido_fuera_tiempo':
                return 'text-red-600 font-bold';
            default:
                return '';
        }
    };

    return (
        <DashboardLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Reporte Semanal de Tickets</h1>

                <div className="flex items-center gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium">Fecha Inicio</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border rounded p-1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Fecha Fin</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border rounded p-1"
                        />
                    </div>
                    <button
                        onClick={handleFilter}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Filtrar
                    </button>
                    <button
                        onClick={handleExport}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Exportar PDF
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2">Área</th>
                                <th className="border p-2">Total Tickets</th>
                                <th className="border p-2">Sin respuesta (en tiempo)</th>
                                <th className="border p-2">Respondido en tiempo</th>
                                <th className="border p-2">Sin respuesta (fuera de tiempo)</th>
                                <th className="border p-2">Respondido fuera de tiempo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.length > 0 ? (
                                tickets.map((row: any, i: number) => (
                                    <tr key={i}>
                                        <td className="border p-2">{row.area}</td>
                                        <td className="border p-2">{row.total_tickets}</td>
                                        <td className={`border p-2 ${getColor('sin_respuesta_en_tiempo')}`}>
                                            {row.sin_respuesta_en_tiempo}
                                        </td>
                                        <td className={`border p-2 ${getColor('respondido_en_tiempo')}`}>
                                            {row.respondido_en_tiempo}
                                        </td>
                                        <td className={`border p-2 ${getColor('sin_respuesta_fuera_tiempo')}`}>
                                            {row.sin_respuesta_fuera_tiempo}
                                        </td>
                                        <td className={`border p-2 ${getColor('respondido_fuera_tiempo')}`}>
                                            {row.respondido_fuera_tiempo}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center p-4">
                                        No hay datos para este rango de fechas
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
