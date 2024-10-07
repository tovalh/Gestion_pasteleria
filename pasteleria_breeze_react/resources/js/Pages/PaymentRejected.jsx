import React from 'react';
import { Head } from '@inertiajs/react';

export default function PaymentRejected({ response }) {
    return (
        <>
            <Head title="Pago Rechazado" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                                <p className="font-bold">El pago ha sido rechazado</p>
                            </div>

                            <div className="mt-4">
                                <p>Por favor, intente nuevamente o contacte a su banco.</p>

                                <a
                                    href="/checkout"
                                    className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Volver a intentar
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}