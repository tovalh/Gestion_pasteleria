import React from 'react';
import { usePage } from '@inertiajs/react';

const PedidoShow = () => {
    const { venta } = usePage().props;

    const getStatusColor = (status) => {
        const statusColors = {
            'pendiente': 'text-yellow-600 bg-yellow-100',
            'en_proceso': 'text-blue-600 bg-blue-100',
            'completado': 'text-green-600 bg-green-100',
            'cancelado': 'text-red-600 bg-red-100'
        };
        return statusColors[status?.toLowerCase()] || 'text-gray-600 bg-gray-100';
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Detalles del Pedido
                </h2>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Número de Transacción</p>
                            <p className="font-medium">{venta.NumeroTransaccionVenta}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="font-medium">
                                ${venta.totalVenta.toLocaleString()}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Metodo de Pago</p>
                            <p className="font-medium">{venta.metodoDePagoVenta}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">Estado del Pedido</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(venta.estadoPedido)}`}>
                                {venta.estadoPedido}
                            </span>
                        </div>
                    </div>

                    {venta.Comentario && (
                        <div className="space-y-2 border-t pt-4">
                            <p className="text-sm text-gray-500">Comentarios</p>
                            <p className="text-sm text-gray-700">{venta.Comentario}</p>
                        </div>
                    )}

                    {venta.productos && venta.productos.length > 0 && (
                        <div className="space-y-2 border-t pt-4">
                            <p className="text-sm text-gray-500">Productos</p>
                            <div className="space-y-2">
                                {venta.productos.map((producto) => (
                                    <div key={producto.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                        <div>
                                            <span className="font-medium">{producto.NombreProducto}</span>
                                            <span className="text-sm text-gray-500 ml-2">x{producto.cantidad}</span>
                                        </div>
                                        <span className="font-medium">${producto.PrecioProducto.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {venta.cliente && (
                        <div className="space-y-2 border-t pt-4">
                            <p className="text-sm text-gray-500">Información del Cliente</p>
                            <div className="space-y-1">
                                <p className="font-medium">{venta.cliente.nombre}</p>
                                {venta.cliente.email && (
                                    <p className="text-sm text-gray-600">{venta.cliente.email}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PedidoShow;
