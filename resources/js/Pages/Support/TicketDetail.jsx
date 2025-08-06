// resources/js/Pages/Support/TicketDetail.jsx
import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function TicketDetail({ ticket }) {
  const [files, setFiles] = useState([]);
  const { data, setData, post, processing, errors } = useForm({
    descripcion_solucion: '',
    archivos: []
  });

  const handleFileChange = (e) => {
    setFiles(e.target.files);
    setData('archivos', e.target.files);
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('support.tickets.respond', ticket.id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detalle del Ticket</h1>

      <div className="mb-4">
        <p><strong>Usuario:</strong> {ticket.usuario?.name}</p>
        <p><strong>Proceso:</strong> {ticket.proceso}</p>
        <p><strong>Fecha apertura:</strong> {ticket.created_at}</p>
        <p><strong>Descripción:</strong> {ticket.descripcion}</p>
        <p><strong>Archivos del usuario:</strong></p>
        <ul>
          {ticket.archivos?.map((archivo, i) => (
            <li key={i}>
              <a
                href={`/storage/${archivo.ruta}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Ver archivo {i + 1}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={submit} className="bg-gray-50 p-4 rounded border">
        <div className="mb-4">
          <label className="block font-medium">Descripción de la solución</label>
          <textarea
            value={data.descripcion_solucion}
            onChange={(e) => setData('descripcion_solucion', e.target.value)}
            className="w-full border rounded p-2"
            rows="4"
          />
          {errors.descripcion_solucion && (
            <div className="text-red-500 text-sm">{errors.descripcion_solucion}</div>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium">Archivos de solución (mínimo 1, máximo 6)</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full border rounded p-2"
            accept=".pdf,.xls,.xlsx,.docx,.png,.jpg,.jpeg"
          />
          {errors.archivos && (
            <div className="text-red-500 text-sm">{errors.archivos}</div>
          )}
          {files.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {files.length} archivo(s) seleccionado(s)
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {processing ? 'Enviando...' : 'Responder y cerrar ticket'}
        </button>
      </form>
    </div>
  );
}
