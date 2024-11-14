import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { ShoppingCart, Menu as MenuIcon, X } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import CartComponent from '../Components/CartComponent';
import { Head } from "@inertiajs/react";

const Seguimiento = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cartItemsCount } = useCart();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if (!orderNumber.trim()) {
            setError('Por favor ingrese un número de pedido');
            return;
        }

        setLoading(true);
        setError('');

        router.visit(`/ventas/${orderNumber}`, {
            preserveState: true,
            preserveScroll: true,
            onError: (errors) => {
                setError('No se encontró el pedido. Por favor verifique el número.');
                setLoading(false);
            },
            onSuccess: () => {
                setLoading(false);
            },
            onFinish: () => {
                setLoading(false);
            }
        });
    };

    return (
        <>
            <Head>
                <title>Seguimiento de Pedido - Dolci Mimi</title>
                <meta name="description" content="Seguimiento de pedidos de Dolci Mimi" />
            </Head>
            <div className="bg-[#F7F0E9] min-h-screen flex flex-col">
                {/* Header */}
                <header className="bg-pink-500 text-pink-50 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <a href="\inicio" className="text-2xl font-bold">Dolci Mimi</a>
                        <nav className="hidden md:flex space-x-6 items-center">
                            <a href="\inicio" className="hover:text-pink-200">Inicio</a>
                            <a href="\menu" className="hover:text-pink-200">Productos</a>
                            <a href="\seguimiento" className="hover:text-pink-200">Seguimiento</a>
                            <a href="\aboutUs" className="hover:text-pink-200">Nosotros</a>
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
                    <div className="md:hidden bg-pink-600 text-pink-50 p-4">
                        <nav className="flex flex-col space-y-2">
                            <a href="\inicio" className="hover:text-pink-200">Inicio</a>
                            <a href="\menu" className="hover:text-pink-200">Menu</a>
                            <a href="\seguimiento" className="hover:text-pink-200">Seguimiento</a>
                            <a href="\aboutUs" className="hover:text-pink-200">About</a>
                        </nav>
                    </div>
                )}

                {/* Main Content - Centered with improved spacing */}
                <main className="flex-grow container mx-auto py-12 px-4 flex items-center justify-center">
                    <div className="w-full max-w-md">
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Seguimiento de Pedido
                                </h2>
                                <p className="mt-4 text-gray-600">
                                    Ingrese su número de pedido para ver los detalles
                                </p>
                            </div>

                            <form onSubmit={handleSearch} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="orderNumber"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Número de Pedido
                                    </label>
                                    <input
                                        id="orderNumber"
                                        type="text"
                                        value={orderNumber}
                                        onChange={(e) => setOrderNumber(e.target.value)}
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                        placeholder="Ej: 1001"
                                    />
                                </div>

                                {error && (
                                    <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-pink-500 text-white py-3 px-4 rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-medium"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                    fill="none"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                />
                                            </svg>
                                            Buscando...
                                        </span>
                                    ) : 'Buscar Pedido'}
                                </button>
                            </form>

                            <div className="mt-8 text-center text-sm text-gray-500">
                                <p>
                                    Si tiene problemas para encontrar su pedido, por favor
                                    contacte a nuestro servicio de atención al cliente
                                </p>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-pink-500 text-pink-50 py-8">
                    <div className="container mx-auto text-center">
                        <p>&copy; 2023 Sweet Delights Bakery. All rights reserved.</p>
                        <div className="mt-4">
                            <a href="#" className="text-pink-200 hover:text-white mx-2">Privacy Policy</a>
                            <a href="#" className="text-pink-200 hover:text-white mx-2">Terms of Service</a>
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

export default Seguimiento;
