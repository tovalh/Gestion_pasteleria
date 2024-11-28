import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

const Form = ({ seccion = null, isEditing = false }) => {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        NombreSeccion: seccion?.NombreSeccion || ''
    });

    useEffect(() => {
        if (isEditing && seccion) {
            setData({
                NombreSeccion: seccion.NombreSeccion
            });
        }
    }, [seccion, isEditing]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(`/secciones/${seccion.idSeccion}`);
        } else {
            post('/secciones');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">
                {isEditing ? 'Editar Sección' : 'Nueva Sección'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Nombre</label>
                    <input
                        type="text"
                        value={data.NombreSeccion}
                        onChange={e => setData('NombreSeccion', e.target.value)}
                        className="w-full border rounded px-3 py-2 bg-white text-black"
                        required
                    />
                    {errors.NombreSeccion && (
                        <div className="text-red-500 text-sm">{errors.NombreSeccion}</div>
                    )}
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="px-4 py-2 border rounded text-gray-300 hover:bg-gray-700"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {processing ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
