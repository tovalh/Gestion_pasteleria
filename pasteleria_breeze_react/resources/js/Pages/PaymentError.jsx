import React from 'react';
import { Head } from '@inertiajs/react';

export default function PaymentError({ error }) {
    return (
        <>
            <Head title="Error en el Pago" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
                                <p className="font-bold">Ha ocurrido un error</p>
                                <p>{error}</p>
                            </div>

                            <div className="mt-4">
                                <a
                                    href="/checkout"
                                    className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
