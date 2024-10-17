import React from 'react';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

const Index = ({ ingredientes, message }) => {
    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar este ingrediente?')) {
            router.delete(`/ingredientes/${id}`);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Lista de Ingredientes</h1>
                <Link
                    href="/ingredientes/create"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Nuevo Ingrediente
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
                        <th className="px-6 py-3 text-left">Nombre</th>
                        <th className="px-6 py-3 text-left">Stock</th>
                        <th className="px-6 py-3 text-left">Stock Mínimo</th>
                        <th className="px-6 py-3 text-left">Unidad de Medida</th>
                        <th className="px-6 py-3 text-left">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {ingredientes.map((ingrediente) => (
                        <tr key={ingrediente.idIngrediente}>
                            <td className="px-6 py-4">{ingrediente.NombreIngrediente}</td>
                            <td className="px-6 py-4">
                                {ingrediente.StockIngrediente} {ingrediente.UnidadDeMedidaIngrediente}
                            </td>
                            <td className="px-6 py-4">
                                {ingrediente.StockMinimoIngrediente} {ingrediente.UnidadDeMedidaIngrediente}
                            </td>
                            <td className="px-6 py-4">{ingrediente.UnidadDeMedidaIngrediente}</td>
                            <td className="px-6 py-4 space-x-2">
                                <Link
                                    href={`/ingredientes/${ingrediente.idIngrediente}/edit`}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(ingrediente.idIngrediente)}
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
