import React from 'react';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

const Index = ({ secciones, message }) => {
    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar este seccion?')) {
            router.delete(`/secciones/${id}`);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Lista de secciones</h1>
                <Link
                    href="/secciones/create"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Nueva Seccion
                </Link>
            </div>

            {message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {message}
                </div>
            )}

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left">Sección</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {secciones.map((seccion) => (
                        <tr key={seccion.idSeccion}>
                            <td className="px-6 py-4">{seccion.NombreSeccion}</td>
                            <td className="px-6 py-4 space-x-2">
                                <Link
                                    href={`/secciones/${seccion.idSeccion}/edit`}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(seccion.idSeccion)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Index;
