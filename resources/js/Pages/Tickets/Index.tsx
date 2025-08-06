import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Index() {
    const { tickets } = usePage().props as any;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Mis Tickets</h1>
            <Link
                href={route('tickets.create')}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Nuevo Ticket
            </Link>

            <table className="mt-6 w-full border">
                <thead>
                    <tr>
                        <th className="border px-2 py-1">ID</th>
                        <th className="border px-2 py-1">Importancia</th>
                        <th className="border px-2 py-1">Descripción</th>
                        <th className="border px-2 py-1">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket: any) => (
                        <tr key={ticket.id}>
                            <td className="border px-2 py-1">{ticket.id}</td>
                            <td className="border px-2 py-1">{ticket.nivel_importancia}</td>
                            <td className="border px-2 py-1">{ticket.descripcion}</td>
                            <td className="border px-2 py-1">{ticket.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}