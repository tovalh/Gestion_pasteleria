import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Alert } from '@/Components/ui/alert';

export default function Create({ productos, clientes }) {
    const { data, setData, post, processing, errors } = useForm({
        productos: [],
        metodoDePagoVenta: '',
        Clientes_idCliente: ''
    });

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/ventas', {
            onSuccess: () => {
                setAlertMessage('Venta realizada con éxito');
                setShowAlert(true);
            },
            onError: () => {
                setAlertMessage('Error al procesar la venta');
                setShowAlert(true);
            }
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Nueva Venta</h1>

            {showAlert && (
                <Alert className="mb-4">
                    {alertMessage}
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Cliente</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={data.Clientes_idCliente}
                        onChange={e => setData('Clientes_idCliente', e.target.value)}
                    >
                        <option value="">Seleccione un cliente</option>
                        {clientes.map(cliente => (
                            <option key={cliente.idCliente} value={cliente.idCliente}>
                                {cliente.NombreCliente}
                            </option>
                        ))}
                    </select>
                    {errors.Clientes_idCliente && (
                        <div className="text-red-500">{errors.Clientes_idCliente}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Productos</label>
                    <select
                        multiple
                        className="w-full p-2 border rounded"
                        value={data.productos}
                        onChange={e => {
                            const values = Array.from(
                                e.target.selectedOptions,
                                option => option.value
                            );
                            setData('productos', values);
                        }}
                    >
                        {productos.map(producto => (
                            <option key={producto.idProducto} value={producto.idProducto}>
                                {producto.NombreProducto} - ${producto.PrecioProducto}
                            </option>
                        ))}
                    </select>
                    {errors.productos && (
                        <div className="text-red-500">{errors.productos}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Método de Pago</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={data.metodoDePagoVenta}
                        onChange={e => setData('metodoDePagoVenta', e.target.value)}
                    >
                        <option value="">Seleccione método de pago</option>
                        <option value="efectivo">Efectivo</option>
                        <option value="tarjeta">Tarjeta</option>
                        <option value="transferencia">Transferencia</option>
                    </select>
                    {errors.metodoDePagoVenta && (
                        <div className="text-red-500">{errors.metodoDePagoVenta}</div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {processing ? 'Procesando...' : 'Realizar Venta'}
                </button>
            </form>
        </div>
    );
}
