import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function PaymentSuccess({ response }) {
    return (
        <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-center">
            <div className="bg-green-100 p-6 rounded-lg text-center max-w-md w-full">
                <h1 className="text-2xl font-semibold text-green-700 mb-4">¡Pago Exitoso!</h1>
                <p className="text-green-600 mb-4">
                    Tu pago ha sido procesado correctamente.
                </p>
                <div className="bg-white p-4 rounded-lg mb-6">
                    <p className="text-gray-600">Orden: {response.buyOrder}</p>
                    <p className="text-gray-600">Monto: ${response.amount}</p>
                    <p className="text-gray-600">Autorización: {response.authorizationCode}</p>
                </div>
                <a
                    href="/menu"
                    className="inline-flex items-center text-green-600 hover:text-green-700"
                >
                    <ArrowLeft className="w-5 h-5 mr-2"/>
                    Volver al menú
                </a>
            </div>
        </div>
    );
}
