import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function CreateTicket() {
    const { data, setData, post, errors, processing } = useForm({
        area: '',
        process_id: '',
        nivel_importancia: '',
        descripcion: '',
        files: [] as File[],
    });

    const [previews, setPreviews] = useState<string[]>([]);

    // Áreas y procesos
    const areas = [
        { id: 'ventas', nombre: 'Ventas', procesos: [] },
        { id: 'marketing', nombre: 'Marketing', procesos: [] },
        { id: 'finanzas', nombre: 'Finanzas', procesos: [] },
        { id: 'rrhh', nombre: 'RRHH', procesos: [] },
        { id: 'sistemas', nombre: 'Sistemas', procesos: [
            { id: 1, nombre: 'Desarrollo Web' },
            { id: 2, nombre: 'Soporte' },
            { id: 3, nombre: 'Redes' },
        ] },
        { id: 'direccion', nombre: 'Dirección', procesos: [] },
    ];

    const procesosDisponibles = areas.find(a => a.id === data.area)?.procesos || [];

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const selectedFiles = Array.from(e.target.files).slice(0, 6);
        setData('files', selectedFiles);
        setPreviews(selectedFiles.map(file => URL.createObjectURL(file)));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tickets');
    };

    return (
        <DashboardLayout>
            <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Abrir Ticket</h1>
                <form encType="multipart/form-data"  onSubmit={submit} className="space-y-4">
                    
                    {/* Selección de Área */}
                    <div>
                        <label>Área</label>
                        <select
                            value={data.area}
                            onChange={e => {
                                setData('area', e.target.value);
                                setData('process_id', ''); // reset proceso
                            }}
                            className="border rounded w-full p-2"
                        >
                            <option value="">Seleccione un área</option>
                            {areas.map(area => (
                                <option key={area.id} value={area.id}>{area.nombre}</option>
                            ))}
                        </select>
                        {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
                    </div>

                    {/* Selección de Proceso */}
                    {procesosDisponibles.length > 0 && (
                        <div>
                            <label>Proceso</label>
                            <select
                                value={data.process_id}
                                onChange={e => setData('process_id', e.target.value)}
                                className="border rounded w-full p-2"
                            >
                                <option value="">Seleccione un proceso</option>
                                {procesosDisponibles.map(proc => (
                                    <option key={proc.id} value={proc.id}>{proc.nombre}</option>
                                ))}
                            </select>
                            {errors.process_id && <p className="text-red-500 text-sm">{errors.process_id}</p>}
                        </div>
                    )}

                    {/* Nivel de importancia */}
                    <div>
                        <label>Nivel de Importancia</label>
                        <select
                            value={data.nivel_importancia}
                            onChange={e => setData('nivel_importancia', e.target.value)}
                            className="border rounded w-full p-2"
                        >
                            <option value="">Seleccione nivel</option>
                            <option value="Baja">Baja</option>
                            <option value="Media">Media</option>
                            <option value="Alta">Alta</option>
                            <option value="Urgente">Urgente</option>
                        </select>
                        {errors.nivel_importancia && <p className="text-red-500 text-sm">{errors.nivel_importancia}</p>}
                    </div>

                    {/* Descripción */}
                    <div>
                        <label>Descripción</label>
                        <textarea
                            value={data.descripcion}
                            onChange={e => setData('descripcion', e.target.value)}
                            className="border rounded w-full p-2"
                            rows={4}
                        />
                        {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion}</p>}
                    </div>

                    {/* Archivos */}
                    <div>
                        <label>Archivos (opcional, máx 6)</label>
                        <input type="file" multiple onChange={handleFiles} accept=".pdf,.xls,.xlsx,.docx,.png,.jpg,.jpeg" />
                        {previews.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                {previews.map((src, i) => (
                                    <img key={i} src={src} alt="preview" className="w-full h-24 object-cover rounded" />
                                ))}
                            </div>
                        )}
                        {errors.files && <p className="text-red-500 text-sm">{errors.files}</p>}
                    </div>

                    {/* Botón */}
                    <button disabled={processing} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        {processing ? 'Guardando...' : 'Guardar Ticket'}
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
}
