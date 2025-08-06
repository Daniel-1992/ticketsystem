import { Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function MyTickets({ tickets, userRole }) {
    const getColorClass = (color) => {
        switch (color) {
            case 'verde': return 'bg-green-500';
            case 'rojo': return 'bg-red-500';
            case 'naranja': return 'bg-orange-500';
            case 'amarillo': return 'bg-yellow-400';
            default: return 'bg-gray-300';
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Mis Tickets</h1>
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Área</th>
                            <th className="p-2 border">Proceso</th>
                            <th className="p-2 border">Nivel</th>
                            <th className="p-2 border">Estado</th>
                            {userRole === 'soporte' && (
                                <th className="p-2 border">Semáforo</th>
                            )}
                            <th className="p-2 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td className="p-2 border">{ticket.id}</td>
                                <td className="p-2 border">{ticket.area}</td>
                                <td className="p-2 border">{ticket.process_id}</td>
                                <td className="p-2 border">{ticket.nivel_importancia}</td>
                                <td className="p-2 border">{ticket.estado}</td>
                                {userRole === 'soporte' && (
                                    <td className="p-2 border text-center">
                                        <span
                                            className={`inline-block w-4 h-4 rounded-full ${getColorClass(ticket.color)}`}
                                        ></span>
                                    </td>
                                )}
                                <td className="p-2 border">
                                    <Link
                                        href={`/tickets/${ticket.id}`}
                                        className="text-blue-500 hover:underline mr-2"
                                    >
                                        Ver detalle
                                    </Link>

                                    {userRole === 'soporte' && ticket.estado === 'abierto' && (
                                        <Link
                                            href={route('support.tickets.form', ticket.id)}
                                            className="text-green-500 hover:underline"
                                        >
                                            Responder
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}
