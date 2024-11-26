import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';

const VentaAdmin = () => {
    const { venta } = usePage().props;

    const [NumeroTransaccionVenta, setNumeroTransaccionVenta] = useState(venta.NumeroTransaccionVenta);
    const [totalVenta, setTotalVenta] = useState(venta.totalVenta);
    const [metodoDePagoVenta, setMetodoDePagoVenta] = useState(venta.metodoDePagoVenta);
    const [estadoPedido, setEstadoPedido] = useState(venta.estadoPedido);
    const [fechaEntrega, setFechaEntrega] = useState(venta.fechaEntrega);
    const [Comentario, setComentario] = useState(venta.Comentario);
    const [productos, setProductos] = useState(venta.productos || []);
    const [errors, setErrors] = useState({});

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        }).format(price);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            Comentario,
        };

        router.put(`/ventas/${venta.idVenta}`, data, {
            onSuccess: () => {
                router.visit('dashboard');
            },
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    useEffect(() => {
        setNumeroTransaccionVenta(venta.NumeroTransaccionVenta);
        setTotalVenta(venta.totalVenta);
        setMetodoDePagoVenta(venta.metodoDePagoVenta);
        setEstadoPedido(venta.estadoPedido);
        setFechaEntrega(venta.fechaEntrega);
        setComentario(venta.Comentario);
        setProductos(venta.productos || []);
    }, [venta]);

    return (
        <div className="max-w-4xl mx-auto my-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Detalles de Venta</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información del Cliente */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Información del Cliente</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium mb-1">Nombre del Cliente</label>
                            <input
                                readOnly
                                type="text"
                                value={venta.cliente?.nombre || 'No disponible'}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">RUT</label>
                            <input
                                readOnly
                                type="text"
                                value={venta.cliente?.rut || 'No disponible'}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Email</label>
                            <input
                                readOnly
                                type="text"
                                value={venta.cliente?.email || 'No disponible'}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Teléfono</label>
                            <input
                                readOnly
                                type="text"
                                value={venta.cliente?.telefono || 'No disponible'}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block font-medium mb-1">Dirección de Entrega</label>
                            <input
                                readOnly
                                type="text"
                                value={venta.cliente?.direccion || 'No disponible'}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                            />
                        </div>
                    </div>
                </div>

                {/* Detalles de la Venta */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Detalles de la Venta</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium mb-1">Número de Transacción</label>
                            <input
                                readOnly
                                type="text"
                                value={NumeroTransaccionVenta}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Fecha de Entrega</label>
                            <input
                                readOnly
                                type="text"
                                value={new Date(fechaEntrega).toLocaleDateString('es-CL')}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Método de Pago</label>
                            <input
                                readOnly
                                type="text"
                                value={metodoDePagoVenta}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Estado del Pedido</label>
                            <input
                                readOnly
                                type="text"
                                value={estadoPedido}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                            />
                        </div>
                    </div>
                </div>

                {/* Productos */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Productos</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Unitario</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {productos.map((producto) => (
                                <tr key={producto.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{producto.NombreProducto}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{producto.cantidad}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatPrice(producto.PrecioProducto)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatPrice(producto.PrecioProducto * producto.cantidad)}</td>
                                </tr>
                            ))}
                            </tbody>
                            <tfoot className="bg-gray-50">
                            <tr>
                                <td colSpan="3" className="px-6 py-4 text-right font-medium">Total:</td>
                                <td className="px-6 py-4 whitespace-nowrap font-bold">{formatPrice(totalVenta)}</td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Comentarios */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Comentarios</h2>
                    <textarea
                        id="Comentario"
                        value={Comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        rows={4}
                    />
                    {errors.Comentario && (
                        <p className="text-red-500 text-sm mt-1">
                            El campo de comentarios no puede tener más de 500 caracteres.
                        </p>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-2 rounded-md transition duration-300"
                    >
                        Guardar y Volver
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VentaAdmin;
