import React from 'react';
import Form from './Form';
import { Head } from '@inertiajs/react';

const Create = () => {
    return (
        <>
            <Head title="Crear Producto" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4">Crear Nuevo Producto</h2>
                            <Form />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Create;
