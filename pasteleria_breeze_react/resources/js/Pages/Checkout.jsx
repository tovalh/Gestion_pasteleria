// resources/js/Pages/Checkout.jsx
import React, { useState } from 'react';
import {Head, router, usePage} from '@inertiajs/react';

export default function Checkout() {
    const [amount, setAmount] = useState(1000);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [debugInfo, setDebugInfo] = useState(null);
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const handlePayment = async () => {
        setLoading(true);
        setError(null);
        setDebugInfo(null);

        try {
            const response = await fetch('/webpay/init', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({ amount: amount })
            });

            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            setDebugInfo(data);

            if (data.url && data.token) {
                // Redirigir al usuario a la URL de Webpay
                window.location.href = `${data.url}?token_ws=${data.token}`;
            } else {
                setError('La respuesta del servidor no contiene la información necesaria para iniciar el pago.');
            }
        } catch (error) {
            console.error('Error completo:', error);
            setError(`Error al iniciar el pago: ${error.message || 'Error desconocido'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head title="Checkout" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h1 className="text-2xl font-bold mb-4">Página de Pago</h1>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Monto a pagar (CLP)
                                </label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    min="1000"
                                />
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={loading}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                            >
                                {loading ? 'Procesando...' : 'Pagar con Webpay'}
                            </button>

                            {error && (
                                <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                                    <p className="font-bold">Error:</p>
                                    <p>{error}</p>
                                </div>
                            )}

                            {debugInfo && (
                                <div className="mt-4 p-4 bg-gray-100 rounded">
                                    <p className="font-bold">Información de depuración:</p>
                                    <pre className="mt-2 text-sm">
                                        {JSON.stringify(debugInfo, null, 2)}
                                    </pre>
                                </div>
                            )}

                            <div className="mt-4 p-4 bg-gray-100 rounded">
                                <h2 className="font-bold mb-2">Tarjetas de prueba:</h2>
                                <ul className="list-disc list-inside">
                                    <li>VISA: 4051 8856 0044 6623</li>
                                    <li>CVV: 123</li>
                                    <li>RUT: 11.111.111-1</li>
                                    <li>Clave: 123</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
