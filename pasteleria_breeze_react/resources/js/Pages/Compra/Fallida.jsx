import React from 'react';
import { XCircle } from 'lucide-react';

export default function Fallida({ error }) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Error en la Compra
                </h1>
                <p className="text-gray-600 mb-6">{error}</p>
                <div className="space-y-4">
                    <a
                        href="/menu"
                        className="inline-block bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
                    >
                        Volver al Menú
                    </a>
                    <a
                        href="/carrito"
                        className="block text-pink-500 hover:text-pink-600 transition-colors"
                    >
                        Revisar Carrito
                    </a>
                </div>
            </div>
        </div>
    );
}
