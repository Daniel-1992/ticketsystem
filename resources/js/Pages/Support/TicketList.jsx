// resources/js/Pages/Support/TicketList.jsx
import React from 'react';
import { Link } from '@inertiajs/react';

export default function TicketList({ tickets }) {
  const getColor = (color) => {
    switch (color) {
      case 'amarillo': return '#FFD700'; // Amarillo
      case 'verde': return '#28a745'; // Verde
      case 'naranja': return '#FF8C00'; // Naranja
      case 'rojo': return '#dc3545'; // Rojo
      default: return '#ccc';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tickets a mi cargo</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">#</th>
            <th className="border p-2">Usuario</th>
            <th className="border p-2">Proceso</th>
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Semáforo</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={ticket.id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{ticket.usuario?.name}</td>
              <td className="border p-2">{ticket.proceso}</td>
              <td className="border p-2">{ticket.created_at}</td>
              <td className="border p-2">{ticket.estado}</td>
              <td className="border p-2 text-center">
                <span
                  style={{
                    display: 'inline-block',
                    width: '15px',
                    height: '15px',
                    backgroundColor: getColor(ticket.color_semaforo),
                    borderRadius: '50%',
                  }}
                />
              </td>
              <td className="border p-2">
                <Link
                  href={route('support.tickets.show', ticket.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Ver
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
