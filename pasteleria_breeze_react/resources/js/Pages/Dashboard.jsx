import React from 'react';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

const Dashboard = ({ productos, ingredientes, message }) => {
    const handleDeleteProducto = (id) => {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            router.delete(`/productos/${id}`);
        }
    };

    const handleDeleteIngrediente = (id) => {
        if (confirm('¿Estás seguro de eliminar este ingrediente?')) {
            router.delete(`/ingredientes/${id}`);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            {message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {message}
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                {/* Sección de Productos */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Productos</h2>
                        <Link
                            href="/productos/create"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Nuevo Producto
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left">Nombre</th>
                                <th className="px-6 py-3 text-left">Descripción</th>
                                <th className="px-6 py-3 text-left">Precio</th>
                                <th className="px-6 py-3 text-left">Acciones</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {productos.map((producto) => (
                                <tr key={producto.idProducto}>
                                    <td className="px-6 py-4">{producto.NombreProducto}</td>
                                    <td className="px-6 py-4">{producto.DescripcionProducto}</td>
                                    <td className="px-6 py-4">${producto.PrecioProducto}</td>
                                    <td className="px-6 py-4 space-x-2">
                                        <Link
                                            href={`/productos/${producto.idProducto}/edit`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteProducto(producto.idProducto)}
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

                {/* Sección de Ingredientes */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Ingredientes</h2>
                        <Link
                            href="/ingredientes/create"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Nuevo Ingrediente
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left">Nombre</th>
                                <th className="px-6 py-3 text-left">Stock</th>
                                <th className="px-6 py-3 text-left">Stock Mínimo</th>
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
                                    <td className="px-6 py-4 space-x-2">
                                        <Link
                                            href={`/ingredientes/${ingrediente.idIngrediente}/edit`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteIngrediente(ingrediente.idIngrediente)}
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
            </div>
        </div>
    );
};

export default Dashboard;
