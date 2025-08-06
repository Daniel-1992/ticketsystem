import { Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function TicketDetail({ ticket }: { ticket: any }) {
    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Ticket #{ticket.id}</h1>

                <div className="space-y-2">
                    <p><strong>Área:</strong> {ticket.area}</p>
                    <p><strong>Proceso:</strong> {ticket.process_id}</p>
                    <p><strong>Nivel:</strong> {ticket.nivel_importancia}</p>
                    <p><strong>Estado:</strong> {ticket.estado}</p>
                    <p><strong>Descripción:</strong> {ticket.descripcion}</p>
                </div>

                <h2 className="text-xl font-semibold mt-4 mb-2">Archivos adjuntos</h2>
                {ticket.archivos?.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {ticket.archivos.map((file: any) => (
                            <li key={file.id}>
                                <a
                                    href={`/storage/${file.path}`}
                                    target="_blank"
                                    className="text-blue-500 underline"
                                >
                                    {file.nombre_original}
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay archivos adjuntos.</p>
                )}

                <h2 className="text-xl font-semibold mt-4 mb-2">Historial de respuestas</h2>
                {ticket.respuestas?.length > 0 ? (
                    <ul className="space-y-3">
                        {ticket.respuestas.map((resp: any) => (
                            <li key={resp.id} className="border p-3 rounded">
                                <strong>
                                    {resp.tipo === 'respuesta_sistemas'
                                        ? '📌 Sistemas:'
                                        : '🙋‍♂️ Tú:'}
                                </strong>
                                <p>{resp.mensaje}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay respuestas todavía.</p>
                )}

                {ticket.estado === 'cerrado' && (
                    <Link
                        href={`/tickets/${ticket.id}/responder`}
                        className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Responder Ticket
                    </Link>
                )}
            </div>
        </DashboardLayout>
    );
}
