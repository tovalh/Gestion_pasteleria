import React, { useState } from 'react';
import axios from 'axios';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function TestVenta() {
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    const handleTest = async () => {
        try {
            // Datos de prueba
            const testData = {
                Clientes_idCliente: 1,
                productos: [1, 2] // IDs de productos para probar
            };

            const response = await axios.post('/ventas/test', testData);
            setStatus('Prueba exitosa: ' + response.data.message);
            setError('');
        } catch (err) {
            setError('Error: ' + (err.response?.data?.error || err.message));
            setStatus('');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Prueba de Actualización de Stock</h1>

            <button
                onClick={handleTest}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Ejecutar Prueba
            </button>

            {status && (
                <Alert className="mt-4 bg-green-100">
                    <AlertDescription>{status}</AlertDescription>
                </Alert>
            )}

            {error && (
                <Alert className="mt-4 bg-red-100">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
        </div>
    );
}
