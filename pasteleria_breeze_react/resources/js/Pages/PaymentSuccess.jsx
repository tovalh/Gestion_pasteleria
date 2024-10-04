import React from 'react';
import { Head } from '@inertiajs/react';

export default function PaymentSuccess({ response }) {
    return (
        <>
            <Head title="Pago Exitoso" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
                                <p className="font-bold">¡Pago realizado con éxito!</p>
                            </div>

                            <div className="mt-4">
                                <h2 className="text-lg font-bold mb-2">Detalles de la transacción:</h2>
                                <ul className="list-disc list-inside">
                                    <li>Orden: {response.buy_order}</li>
                                    <li>Monto: ${response.amount}</li>
                                    <li>Últimos dígitos tarjeta: {response.card_detail?.card_number}</li>
                                    <li>Tipo de pago: {response.payment_type_code}</li>
                                    <li>Código de autorización: {response.authorization_code}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
