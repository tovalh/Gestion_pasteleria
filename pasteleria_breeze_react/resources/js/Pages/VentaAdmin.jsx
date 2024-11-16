import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
const VentaAdmin = () => {
    const { venta } = usePage().props;
    const [NumeroTransaccionVenta, setNumeroTransaccionVenta] = useState(venta.NumeroTransaccionVenta);
    const [totalVenta, setTotalVenta] = useState(venta.totalVenta);
    const [metodoDePagoVenta, setMetodoDePagoVenta] = useState(venta.metodoDePagoVenta);
    const [estadoPedido, setEstadoPedido] = useState(venta.estadoPedido);
    const [Comentario, setComentario] = useState(venta.Comentario);
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            NumeroTransaccionVenta: NumeroTransaccionVenta,
            totalVenta: venta.totalVenta,
            metodoDePagoVenta: venta.metodoDePagoVenta,
            estadoPedido: venta.estadoPedido,
            Comentario: Comentario
        };

        router.put(`/ventas/${venta.idVenta}`, data, {
            onSuccess: () => {
                router.visit('dashboard'); // o simplemente redirigir después de un éxito
            },
            onError: (errors) => {
                setErrors(errors); // manejar errores
            },
        });
    };

    useEffect(() => {
        setNumeroTransaccionVenta(venta.NumeroTransaccionVenta);
        setTotalVenta(venta.totalVenta);
        setMetodoDePagoVenta(venta.metodoDePagoVenta);
        setEstadoPedido(venta.estadoPedido);
        setComentario(venta.Comentario);
    }, [venta]);

    return (
        <div className="max-w-2xl mx-auto my-8">
            <h1 className="text-2xl font-bold mb-4">Detalles de Venta</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Número de Transacción */}
                <div>
                    <label htmlFor="NumeroTransaccionVenta" className="block font-medium mb-1">
                        Número de Transacción
                    </label>
                    <input
                        readOnly={true}
                        type="text"
                        id="NumeroTransaccionVenta"
                        value={NumeroTransaccionVenta}
                        onChange={(e) => setNumeroTransaccionVenta(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    />
                    {errors.NumeroTransaccionVenta && (
                        <p className="text-red-500 text-sm mt-1">Este campo es requerido.</p>
                    )}
                </div>

                {/* Total */}
                <div>
                    <label htmlFor="totalVenta" className="block font-medium mb-1">
                        Total
                    </label>
                    <input
                        readOnly={true}
                        type="number"
                        id="totalVenta"
                        value={totalVenta}
                        onChange={(e) => setTotalVenta(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    />
                    {errors.totalVenta && (
                        <p className="text-red-500 text-sm mt-1">
                            Este campo es requerido y debe ser un número mayor o igual a 0.
                        </p>
                    )}
                </div>

                {/* Método de Pago */}
                <div>
                    <label htmlFor="metodoDePagoVenta" className="block font-medium mb-1">
                        Método de Pago
                    </label>
                    <input
                        readOnly={true}
                        type="text"
                        id="metodoDePagoVenta"
                        value={metodoDePagoVenta}
                        onChange={(e) => setMetodoDePagoVenta(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    />
                    {errors.metodoDePagoVenta && (
                        <p className="text-red-500 text-sm mt-1">
                            Este campo es requerido y no puede tener más de 45 caracteres.
                        </p>
                    )}
                </div>

                {/* Estado del Pedido */}
                <div>
                    <label htmlFor="estadoPedido" className="block font-medium mb-1">
                        Estado del Pedido
                    </label>
                    <select
                        disabled={true}
                        id="estadoPedido"
                        value={estadoPedido}
                        onChange={(e) => setEstadoPedido(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    >
                        <option value="En Proceso">En Proceso</option>
                        <option value="Disponible">Disponible</option>
                        <option value="Entregado">Entregado</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>
                    {errors.estadoPedido && (
                        <p className="text-red-500 text-sm mt-1">Este campo es requerido.</p>
                    )}
                </div>

                {/* Comentarios */}
                <div>
                    <label htmlFor="Comentario" className="block font-medium mb-1">
                        Comentarios
                    </label>
                    <textarea

                        id="Comentario"
                        value={Comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
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
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md"
                    >
                        Guardar y Volver
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VentaAdmin;
