import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';

export default function Create() {
    const { procesos } = usePage().props as any;

    const [values, setValues] = useState({
        process_id: '',
        nivel_importancia: 'Baja',
        descripcion: '',
        archivos: [] as File[]
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setValues({
                ...values,
                archivos: Array.from(e.target.files)
            });
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('process_id', values.process_id);
        formData.append('nivel_importancia', values.nivel_importancia);
        formData.append('descripcion', values.descripcion);

        values.archivos.forEach((file, i) => {
            formData.append(`archivos[${i}]`, file); // 👈 nombre correcto
        });

        router.post(route('tickets.store'), formData);
    }

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Abrir Ticket</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                <div>
                    <label>Proceso</label>
                    <select
                        name="process_id"
                        value={values.process_id}
                        onChange={handleChange}
                        className="border w-full p-2"
                        required
                    >
                        <option value="">Selecciona un proceso</option>
                        {procesos.map((p: any) => (
                            <option key={p.id} value={p.id}>
                                {p.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Nivel de Importancia</label>
                    <select
                        name="nivel_importancia"
                        value={values.nivel_importancia}
                        onChange={handleChange}
                        className="border w-full p-2"
                    >
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                        <option value="Urgente">Urgente</option>
                    </select>
                </div>

                <div>
                    <label>Descripción</label>
                    <textarea
                        name="descripcion"
                        value={values.descripcion}
                        onChange={handleChange}
                        className="border w-full p-2"
                        required
                    />
                </div>

                <div>
                    <label>Archivos (opcional, máx 6, 1MB)</label>
                    <input
                        type="file"
                        name="archivos[]"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Guardar Ticket
                </button>
            </form>
        </div>
    );
}
