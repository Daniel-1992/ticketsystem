import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function RespondSupport({ ticket }) {
    const { data, setData, post, errors } = useForm({
        mensaje: '',
        files: []
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('support.tickets.respond', ticket.id));
    };

    return (
        <DashboardLayout>
            <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-xl font-bold mb-4">Responder Ticket #{ticket.id}</h1>
                <form onSubmit={submit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Descripción de la solución</label>
                        <textarea
                            name="mensaje" 
                            value={data.mensaje}
                            onChange={(e) => setData('mensaje', e.target.value)}
                            className="w-full border rounded p-2"
                            required
                        />
                        {errors.mensaje && (
                            <div className="text-red-500 text-sm">{errors.mensaje}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">
                            Archivos de apoyo (mínimo 1, máximo 6)
                        </label>
                        <input
                            type="file"
                            multiple
                            accept=".pdf,.xls,.xlsx,.docx,.png,.jpg,.jpeg"
                            onChange={(e) => setData('files', Array.from(e.target.files))}
                            className="w-full"
                            required
                        />
                        {errors.files && (
                            <div className="text-red-500 text-sm">{errors.files}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Enviar respuesta
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
}
