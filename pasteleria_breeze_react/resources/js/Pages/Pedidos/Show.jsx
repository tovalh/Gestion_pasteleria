import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { ShoppingCart, Menu as MenuIcon, X } from 'lucide-react';
import { useCart } from '@/Context/CartContext';
import CartComponent from '@/Components/CartComponent';
import { Head } from "@inertiajs/react";

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
        <>
            <Head>
                <title>Detalles del Pedido - Dolci Mimi</title>
                <meta name="description" content="Detalles de tu pedido en Dolci Mimi" />
            </Head>
            <div className="bg-gradient-to-b from-pink-50 to-[#F7F0E9] min-h-screen flex flex-col">
                {/* Header */}
                <header className="bg-pink-500 text-pink-50 p-4 shadow-md">
                    <div className="container mx-auto flex justify-between items-center">
                        <a href="/inicio" className="text-2xl font-bold">Dolci Mimi</a>
                        <nav className="hidden md:flex space-x-6 items-center">
                            {navLinks.map(link => (
                                <a
                                    key={`desktop-${link.key}`}
                                    href={link.href}
                                    className="hover:text-pink-200"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <button onClick={toggleCart} className="relative">
                                <ShoppingCart className="text-pink-50"/>
                                {cartItemsCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-white text-pink-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                        {cartItemsCount}
                                    </span>
                                )}
                            </button>
                        </nav>

                        {/* Mobile menu and cart */}
                        <div className="md:hidden flex items-center">
                            <button onClick={toggleMenu} className="mr-4">
                                {isMenuOpen ? <X/> : <MenuIcon/>}
                            </button>
                            <button onClick={toggleCart} className="relative">
                                <ShoppingCart className="text-pink-50"/>
                                {cartItemsCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-white text-pink-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                        {cartItemsCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-pink-600 text-pink-50 p-4 shadow-md">
                        <nav className="flex flex-col space-y-2">
                            {navLinks.map(link => (
                                <a
                                    key={`mobile-${link.key}`}
                                    href={link.href}
                                    className="hover:text-pink-200"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                )}

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
                                        <span className={`inline-block px-2 py-1 rounded-full text-sm ${getStatusColor(venta.estadoPedido)}`}>
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
                <footer className="bg-pink-500 text-pink-50 py-8 mt-auto shadow-inner">
                    <div className="container mx-auto text-center">
                        <p>&copy; 2023 Sweet Delights Bakery. All rights reserved.</p>
                        <div className="mt-4">
                            <a key="privacy" href="#" className="text-pink-200 hover:text-white mx-2">Privacy Policy</a>
                            <a key="terms" href="#" className="text-pink-200 hover:text-white mx-2">Terms of Service</a>
                        </div>
                    </div>
                </footer>

                {/* Cart Sidebar */}
                {isCartOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
                        <div className="bg-white w-full max-w-md h-full overflow-y-auto">
                            <div className="p-4">
                                <button onClick={toggleCart} className="mb-4">
                                    <X/>
                                </button>
                                <CartComponent/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default PedidoShow;
