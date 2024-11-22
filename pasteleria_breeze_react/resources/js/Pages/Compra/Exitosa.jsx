import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import {useCart} from "@/Context/CartContext.jsx";


export default function Exitosa({ mensaje, detalles, codigoSeguimiento }) {
    const { clearCart } = useCart();

    // Limpiar el carrito cuando el componente se monte
    useEffect(() => {
        clearCart();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    ¡Compra Exitosa!
                </h1>
                <p className="text-gray-600 mb-4">{mensaje}</p>

                <div className="bg-gray-50 p-4 rounded-md mb-6">
                    <p className="text-sm text-gray-500 mb-1">Código de Seguimiento:</p>
                    <p className="text-lg font-bold text-gray-800">{codigoSeguimiento}</p>
                </div>

                {detalles && (
                    <div className="space-y-2 mb-6 text-left">
                        <div className="grid grid-cols-2 gap-2">
                            <p className="text-sm text-gray-500">Monto:</p>
                            <p className="text-sm font-medium text-gray-800">${detalles.monto}</p>

                            <p className="text-sm text-gray-500">Estado:</p>
                            <p className="text-sm font-medium text-gray-800">{detalles.estado}</p>

                            <p className="text-sm text-gray-500">Orden de Compra:</p>
                            <p className="text-sm font-medium text-gray-800">{detalles.ordenCompra}</p>

                            <p className="text-sm text-gray-500">Autorización:</p>
                            <p className="text-sm font-medium text-gray-800">{detalles.codigoAutorizacion}</p>
                        </div>
                    </div>
                )}

                <a
                    href="/menu"
                    className="inline-block bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors"
                >
                    Volver al Menú
                </a>
            </div>
        </div>
    );
}
