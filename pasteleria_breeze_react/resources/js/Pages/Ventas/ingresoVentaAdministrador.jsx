import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const IngresoVentaAdministrador = ({ auth, productos }) => {
    // Hooks de estado y form
    const [error, setError] = useState('');
    const [productosSeleccionados, setProductosSeleccionados] = useState([{
        productoId: '',
        cantidad: 1,
        precioUnitario: 0
    }]);

    const { data, setData, post, processing, errors } = useForm({
        totalVenta: 0,
        metodoDePagoVenta: '',
        estadoPedido: 'En Proceso',
        Comentario: '',
        NombreCliente: '',
        CorreoCliente: '',
        RutCliente: '',
        NumeroCliente: '',
        DireccionCliente: '',
        productos: []
    });

    const metodoPagoOpciones = [
        'Efectivo',
        'Tarjeta de Crédito',
        'Tarjeta de Débito',
        'Transferencia',
    ];

    // Hooks useEffect
    useEffect(() => {
        // Para verificar que la ruta existe
        console.log('Ruta ventas.store existe:', route().has('ventas.store'));
        console.log('URL de la ruta:', route('ventas.store'));
    }, []);

    useEffect(() => {
        // Para calcular el total cuando cambian los productos
        calcularTotal();
    }, [productosSeleccionados]);

    // Funciones de manejo de productos
    const handleProductoChange = (index, productoId) => {
        const productoSeleccionado = productos.find(p => p.idProducto === parseInt(productoId));
        const nuevosProductos = [...productosSeleccionados];
        nuevosProductos[index] = {
            ...nuevosProductos[index],
            productoId: productoId,
            precioUnitario: productoSeleccionado ? productoSeleccionado.PrecioProducto : 0
        };
        setProductosSeleccionados(nuevosProductos);

        // Actualizar inmediatamente los productos en el formulario
        actualizarProductosEnForm(nuevosProductos);

        // Recalcular el total
        const total = nuevosProductos.reduce((sum, item) => {
            return sum + (item.precioUnitario * item.cantidad);
        }, 0);
        setData('totalVenta', total);
    };

    const handleCantidadChange = (index, cantidad) => {
        const nuevosProductos = [...productosSeleccionados];
        nuevosProductos[index] = {
            ...nuevosProductos[index],
            cantidad: parseInt(cantidad) || 1
        };
        setProductosSeleccionados(nuevosProductos);
        actualizarProductosEnForm(nuevosProductos);
    };

    const agregarProducto = () => {
        setProductosSeleccionados([
            ...productosSeleccionados,
            { productoId: '', cantidad: 1, precioUnitario: 0 }
        ]);
    };

    const eliminarProducto = (index) => {
        const nuevosProductos = productosSeleccionados.filter((_, i) => i !== index);
        setProductosSeleccionados(nuevosProductos);
        actualizarProductosEnForm(nuevosProductos);
    };

    const calcularTotal = () => {
        const total = productosSeleccionados.reduce((sum, item) => {
            return sum + (item.precioUnitario * item.cantidad);
        }, 0);
        setData('totalVenta', total);
    };

    const actualizarProductosEnForm = (productos) => {
        const productosValidos = productos
            .filter(p => p.productoId !== '')
            .map(p => ({
                Productos_idProducto: parseInt(p.productoId),
                cantidad: p.cantidad
            }));

        setData('productos', productosValidos);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Depuración de productos seleccionados
        console.log('Productos seleccionados antes de filtrar:', productosSeleccionados);

        // Filtrar productos válidos y formatearlos correctamente
        const productosValidos = productosSeleccionados
            .filter(p => p.productoId !== '')
            .map(p => ({
                Productos_idProducto: parseInt(p.productoId),
                Venta_idVenta: null, // Este valor lo asignará el backend
                cantidad: parseInt(p.cantidad)
            }));

        if (productosValidos.length === 0) {
            setError('Debe seleccionar al menos un producto para la venta');
            return;
        }

        console.log('Productos válidos formateados:', productosValidos);

        const formData = {
            NombreCliente: data.NombreCliente,
            CorreoCliente: data.CorreoCliente,
            RutCliente: data.RutCliente,
            NumeroCliente: data.NumeroCliente,
            DireccionCliente: data.DireccionCliente,
            totalVenta: parseInt(data.totalVenta),
            metodoDePagoVenta: data.metodoDePagoVenta,
            estadoPedido: 'En Proceso',
            Comentario: data.Comentario || 'Sin comentarios',
            productos: productosValidos
        };

        console.log('Datos completos a enviar:', formData);

        post('/ventas', formData, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (response) => {
                console.log('Respuesta exitosa:', response);
                window.location.href = route('dashboard');
            },
            onError: (errors) => {
                console.error('Errores en la respuesta:', errors);
                setError(errors.error || 'Error al procesar la venta');
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Nueva Venta - Dashboard" />

            <div className="max-w-7xl mx-auto p-4">
                <h1 className="text-3xl font-bold mb-8">Nueva Venta</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Sección de Datos del Cliente */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h2 className="text-xl font-semibold mb-4">Datos del Cliente</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Nombre Cliente */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nombre Cliente
                                        </label>
                                        <input
                                            type="text"
                                            value={data.NombreCliente}
                                            onChange={e => setData('NombreCliente', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        {errors.NombreCliente && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.NombreCliente}
                                            </div>
                                        )}
                                    </div>

                                    {/* Correo Cliente */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Correo Electrónico
                                        </label>
                                        <input
                                            type="email"
                                            value={data.CorreoCliente}
                                            onChange={e => setData('CorreoCliente', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        {errors.CorreoCliente && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.CorreoCliente}
                                            </div>
                                        )}
                                    </div>

                                    {/* RUT Cliente */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            RUT
                                        </label>
                                        <input
                                            type="text"
                                            value={data.RutCliente}
                                            onChange={e => setData('RutCliente', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        {errors.RutCliente && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.RutCliente}
                                            </div>
                                        )}
                                    </div>

                                    {/* Número Cliente */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Teléfono
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.NumeroCliente}
                                            onChange={e => setData('NumeroCliente', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        {errors.NumeroCliente && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.NumeroCliente}
                                            </div>
                                        )}
                                    </div>

                                    {/* Dirección Cliente */}
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Dirección
                                        </label>
                                        <input
                                            type="text"
                                            value={data.DireccionCliente}
                                            onChange={e => setData('DireccionCliente', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        {errors.DireccionCliente && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.DireccionCliente}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Sección de Productos */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h2 className="text-xl font-semibold mb-4">Productos</h2>
                                {productosSeleccionados.map((item, index) => (
                                    <div key={index} className="flex gap-4 mb-4">
                                        <div className="flex-1">
                                            <select
                                                value={item.productoId}
                                                onChange={(e) => handleProductoChange(index, e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                required
                                            >
                                                <option value="">Seleccione un producto</option>
                                                {productos.map((producto) => (
                                                    <option key={producto.idProducto} value={producto.idProducto}>
                                                        {producto.NombreProducto} - ${producto.PrecioProducto}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="w-32">
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.cantidad}
                                                onChange={(e) => handleCantidadChange(index, e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                placeholder="Cantidad"
                                                required
                                            />
                                        </div>
                                        <div className="w-24 flex items-center">
                                            ${item.precioUnitario * item.cantidad}
                                        </div>
                                        {productosSeleccionados.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => eliminarProducto(index)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Eliminar
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={agregarProducto}
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Agregar Producto
                                </button>
                            </div>

                            {/* Método de Pago y Comentarios */}
                            <div className="grid grid-cols-2 gap-6">
                                {/* Método de Pago */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Método de Pago
                                    </label>
                                    <select
                                        value={data.metodoDePagoVenta}
                                        onChange={e => setData('metodoDePagoVenta', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Seleccione un método de pago</option>
                                        {metodoPagoOpciones.map((metodo) => (
                                            <option key={metodo} value={metodo}>
                                                {metodo}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Comentario */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Comentario
                                    </label>
                                    <textarea
                                        value={data.Comentario}
                                        onChange={e => setData('Comentario', e.target.value)}
                                        rows="3"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Total */}
                            <div className="border-t pt-4 mt-6">
                                <div className="text-right">
                                    <span className="text-xl font-bold">
                                        Total: ${data.totalVenta}
                                    </span>
                                </div>
                            </div>

                            {/* Botón Submit */}
                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {processing ? 'Guardando...' : 'Guardar Venta'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default IngresoVentaAdministrador;
