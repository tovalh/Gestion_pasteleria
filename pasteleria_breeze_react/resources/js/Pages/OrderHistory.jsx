import React from 'react';
import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function OrderHistory({ pedidos }) {
    // Format price in Chilean pesos
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="bg-[#F7F0E9] min-h-screen flex flex-col">
            <Navbar/>

            <main className="container mx-auto p-6 flex-grow">
                <h1 className="text-2xl font-bold text-pink-800 mb-6">Mi Historial de Pedidos</h1>

                {pedidos.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600">No tienes pedidos anteriores.</p>
                        <Link
                            href="/menu"
                            className="mt-4 inline-block bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition duration-300"
                        >
                            Ir a comprar
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {pedidos.map((pedido) => (
                            <div key={pedido.id} className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold text-pink-800">
                                        Pedido #{pedido.numeroTransaccion}
                                    </h2>
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        pedido.estado === 'Entregado' ? 'bg-green-100 text-green-800' :
                                            pedido.estado === 'En Preparacion' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-blue-100 text-blue-800'
                                    }`}>
                                        {pedido.estado}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-gray-600">Fecha: {pedido.fecha}</p>
                                    <p className="text-gray-600">Método de pago: {pedido.metodoPago}</p>

                                    <div className="mt-4">
                                        <h3 className="font-semibold mb-2">Productos:</h3>
                                        <ul className="space-y-2">
                                            {pedido.productos.map((producto, index) => (
                                                <li key={index} className="flex justify-between">
                                                    <span>{producto.nombre}</span>
                                                    <span className="font-medium">{formatPrice(producto.precio)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-4 pt-4 border-t">
                                        <p className="text-xl font-bold text-pink-800">
                                            Total: {formatPrice(pedido.total)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer/>
        </div>
    );
}
