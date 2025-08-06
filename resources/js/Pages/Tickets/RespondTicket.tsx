import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function RespondTicket({ ticket }: { ticket: any }) {
    const { data, setData, post, errors, processing } = useForm({
        mensaje: '',
        resuelto: true,
        files: [] as File[],
    });

    const [previews, setPreviews] = useState<string[]>([]);

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const selectedFiles = Array.from(e.target.files).slice(0, 6);
        setData('files', selectedFiles);
        setPreviews(selectedFiles.map(file => URL.createObjectURL(file)));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/tickets/${ticket.id}/responder`);
    };

    return (
        <DashboardLayout>
            <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Responder Ticket #{ticket.id}</h1>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="resuelto"
                                checked={data.resuelto}
                                onChange={() => setData('resuelto', true)}
                            /> Sí, se resolvió
                        </label>
                        <label className="ml-4">
                            <input
                                type="radio"
                                name="resuelto"
                                checked={!data.resuelto}
                                onChange={() => setData('resuelto', false)}
                            /> No, aún persiste el problema
                        </label>
                    </div>

                    {!data.resuelto && (
                        <>
                            <div>
                                <label>Explica por qué no se resolvió</label>
                                <textarea
                                    value={data.mensaje}
                                    onChange={e => setData('mensaje', e.target.value)}
                                    placeholder={data.resuelto ? 'Describe la solución...' : 'Explica por qué no se resolvió'}
                                    className="border rounded w-full p-2"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label>Archivos (opcional)</label>
                                <input type="file" multiple onChange={handleFiles} accept=".pdf,.xls,.xlsx,.docx,.png,.jpg,.jpeg" />
                                {previews.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                        {previews.map((src, i) => (
                                            <img key={i} src={src} alt="preview" className="w-full h-24 object-cover rounded" />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    <button disabled={processing} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        {processing ? 'Enviando...' : 'Enviar respuesta'}
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
}
