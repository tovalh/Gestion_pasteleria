import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { ShoppingCart, Menu as MenuIcon, X } from 'lucide-react';
import { useCart } from '@/Context/CartContext';
import CartComponent from '@/Components/CartComponent';
import { Head } from "@inertiajs/react";
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const PedidoShow = () => {
    const { venta } = usePage().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cartItemsCount } = useCart();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const getStatusColor = (status) => {
        const statusColors = {
            'pendiente': 'text-yellow-600 bg-yellow-50 border border-yellow-200',
            'en_proceso': 'text-blue-600 bg-blue-50 border border-blue-200',
            'completado': 'text-green-600 bg-green-50 border border-green-200',
            'cancelado': 'text-red-600 bg-red-50 border border-red-200'
        };
        return statusColors[status?.toLowerCase()] || 'text-gray-600 bg-gray-50 border border-gray-200';
    };

    const navLinks = [
        { key: 'inicio', href: '/inicio', label: 'Inicio' },
        { key: 'menu', href: '/menu', label: 'Productos' },
        { key: 'seguimiento', href: '/seguimiento', label: 'Seguimiento' },
        { key: 'about', href: '/aboutUs', label: 'Nosotros' }
    ];

    return (

            <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-50 to-[#F7F0E9]">
                <Navbar toggleCart={toggleCart}/>

                <main className="flex-grow py-4 px-2">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="bg-pink-100 p-3">
                                <h2 className="text-xl font-bold text-pink-800 text-center">
                                    Detalles del Pedido
                                </h2>
                            </div>

                            <div className="p-3 space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-pink-50 p-2 rounded-lg">
                                        <p className="text-sm text-pink-700">Número de Transacción</p>
                                        <p className="font-semibold text-gray-800">{venta.NumeroTransaccionVenta}</p>
                                    </div>
                                    <div className="bg-pink-50 p-2 rounded-lg">
                                        <p className="text-sm text-pink-700">Total</p>
                                        <p className="font-semibold text-gray-800">
                                            ${venta.totalVenta.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="bg-pink-50 p-2 rounded-lg">
                                        <p className="text-sm text-pink-700">Método de Pago</p>
                                        <p className="font-semibold text-gray-800">{venta.metodoDePagoVenta}</p>
                                    </div>
                                    <div className="bg-pink-50 p-2 rounded-lg">
                                        <p className="text-sm text-pink-700">Estado del Pedido</p>
                                        <span
                                            className={`inline-block px-2 py-1 rounded-full text-sm ${getStatusColor(venta.estadoPedido)}`}>
                                            {venta.estadoPedido}
                                        </span>
                                    </div>
                                </div>

                                {venta.Comentario && (
                                    <div className="bg-pink-50 p-2 rounded-lg">
                                        <p className="text-sm text-pink-700">Comentarios</p>
                                        <p className="text-gray-700 text-sm">{venta.Comentario}</p>
                                    </div>
                                )}

                                {venta.productos && venta.productos.length > 0 && (
                                    <div className="space-y-2">
                                        <p className="text-sm text-pink-700">Productos</p>
                                        <div className="space-y-2">
                                            {venta.productos.map((producto) => (
                                                <div
                                                    key={`producto-${producto.id || Math.random()}`}
                                                    className="flex justify-between items-center bg-pink-50 p-2 rounded-lg"
                                                >
                                                    <div>
                                                        <span className="font-medium text-gray-800">
                                                            {producto.NombreProducto}
                                                        </span>
                                                        <span className="text-sm text-pink-600 ml-2">
                                                            x{producto.cantidad}
                                                        </span>
                                                    </div>
                                                    <span className="font-semibold text-gray-800">
                                                        ${producto.PrecioProducto.toLocaleString()}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {venta.cliente && (
                                    <div className="bg-pink-50 p-2 rounded-lg">
                                        <p className="text-sm text-pink-700">Información del Cliente</p>
                                        <div>
                                            <p className="font-semibold text-gray-800">{venta.cliente.nombre}</p>
                                            {venta.cliente.email && (
                                                <p className="text-gray-600 text-sm">{venta.cliente.email}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}

                <Footer />
            </div>
    );
};

            export default PedidoShow;
