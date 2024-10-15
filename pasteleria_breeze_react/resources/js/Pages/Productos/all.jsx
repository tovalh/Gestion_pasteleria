import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { Card, CardHeader, CardContent, CardFooter } from '../../Components/Card';

export default function All({ productos }) {
    return (
        <AppLayout>
            <Head title="Todos los Productos" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold mb-6">Todos los Productos</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {productos.map((producto) => (
                            <Card key={producto.id}>
                                <CardHeader>{producto.NombreProducto}</CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 mb-2">{producto.DescripcionProducto}</p>
                                    <div className="flex justify-between items-center">
                                    <p className="font-bold">${producto.PrecioProducto}</p>
                                    <button
                                        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded">
                                        Add to Cart
                                    </button>
                                    </div>
                                </CardContent>
                                {producto.seccion && (
                                    <CardFooter>Sección: {producto.seccion.nombre}</CardFooter>
                                )}
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
