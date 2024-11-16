import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import CartComponent from '../Components/CartComponent';
import { Head } from "@inertiajs/react";
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Seguimiento = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

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
                <Navbar />

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

                <Footer />

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
