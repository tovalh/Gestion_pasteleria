import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import StockAlert from '../Components/StockAlert.jsx';
import axios from 'axios';
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";

const Dashboard = ({ auth, productos, ingredientes, secciones, ventas: initialVentas, message }) => {
    const [activeTab, setActiveTab] = useState('productos');
    const [ventas, setVentas] = useState(initialVentas);

    const handleDeleteProducto = (id) => {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            router.delete(`/productos/${id}`);
        }
    };

    const handleDeleteIngrediente = (id) => {
        if (confirm('¿Estás seguro de eliminar este ingrediente?')) {
            router.delete(`/ingredientes/${id}`);
        }
    };

    const handleDeleteSeccion = (id) => {
        if (confirm('¿Estás seguro de eliminar esta sección?')) {
            router.delete(`/secciones/${id}`);
        }
    };
    const handleUpdateEstadoPedido = async (idVenta, nuevoEstado) => {
        try {
            await axios.put(`/ventas/${idVenta}`, { estadoPedido: nuevoEstado });
            // Actualizar el estado local inmediatamente
            setVentas(prevVentas =>
                prevVentas.map(venta =>
                    venta.idVenta === idVenta
                        ? { ...venta, estadoPedido: nuevoEstado }
                        : venta
                )
            );
        } catch (error) {
            console.error('Error al actualizar el estado del pedido:', error);
            // Opcional: Mostrar un mensaje de error al usuario
        }
    };
    const handleVerDetalles = (idVenta) => {
        router.visit(`/ventas/${idVenta}`, {
            preserveState: true,
            preserveScroll: true,
            onError: (errors) => {
                setError('No se encontró el pedido. Por favor verifique el número.');
                setLoading(false);
            },
            onSuccess: () => {
                setLoading(false);
            },
            onFinish: () => {
                setLoading(false);
            }
        });
    };
    const renderProductos = () => (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">Productos</h2>
                <Link
                    href="/productos/create"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Nuevo Producto
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left">Nombre</th>
                        <th className="px-6 py-3 text-left">Descripción</th>
                        <th className="px-6 py-3 text-left">Precio</th>
                        <th className="px-6 py-3 text-left">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {productos.map((producto) => (
                        <tr key={producto.idProducto}>
                            <td className="px-6 py-4">{producto.NombreProducto}</td>
                            <td className="px-6 py-4">{producto.DescripcionProducto}</td>
                            <td className="px-6 py-4">${producto.PrecioProducto}</td>
                            <td className="px-6 py-4 space-x-2">
                                <Link
                                    href={`/productos/${producto.idProducto}/edit`}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDeleteProducto(producto.idProducto)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderIngredientes = () => (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">Ingredientes</h2>
                <Link
                    href="/ingredientes/create"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Nuevo Ingrediente
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left">Nombre</th>
                        <th className="px-6 py-3 text-left">Stock</th>
                        <th className="px-6 py-3 text-left">Stock Mínimo</th>
                        <th className="px-6 py-3 text-left">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {ingredientes.map((ingrediente) => (
                        <tr
                            key={ingrediente.idIngrediente}
                            className={
                                ingrediente.StockIngrediente <= ingrediente.StockMinimoIngrediente
                                    ? 'bg-red-200'
                                    : ''
                            }
                        >
                            <td className="px-6 py-4">{ingrediente.NombreIngrediente}</td>
                            <td className="px-6 py-4">
                                {ingrediente.StockIngrediente} {ingrediente.UnidadDeMedidaIngrediente}
                            </td>
                            <td className="px-6 py-4">
                                {ingrediente.StockMinimoIngrediente} {ingrediente.UnidadDeMedidaIngrediente}
                            </td>
                            <td className="px-6 py-4 space-x-2">
                                <Link
                                    href={`/ingredientes/${ingrediente.idIngrediente}/edit`}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDeleteIngrediente(ingrediente.idIngrediente)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderVentas = () => {
        return (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Ventas</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left">ID Venta</th>
                            <th className="px-6 py-3 text-left">Comentario</th>
                            <th className="px-6 py-3 text-left">Total</th>
                            <th className="px-6 py-3 text-left">Estado</th>
                            <th className="px-6 py-3 text-left">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {ventas.map((venta) => (
                            <tr key={venta.idVenta}>
                                <td className="px-6 py-4">{venta.idVenta}</td>
                                <td className="px-6 py-4">{venta.Comentario}</td>
                                <td className="px-6 py-4">${venta.totalVenta}</td>
                                <td className="px-6 py-4">
                                    <select
                                        value={venta.estadoPedido}
                                        onChange={(e) => handleUpdateEstadoPedido(venta.idVenta, e.target.value)}
                                        className="px-8 py-1 rounded bg-gray-200"
                                    >
                                        <option value={venta.ESTADO_EN_PROCESO}>En Proceso</option>
                                        <option value={venta.ESTADO_DISPONIBLE}>Disponible</option>
                                        <option value={venta.ESTADO_ENTREGADO}>Entregado</option>
                                        <option value={venta.ESTADO_CANCELADO}>Cancelado</option>
                                    </select>
                                </td>
                                <td className="px-10 py-4 space-x-2">
                                    <button
                                        onClick={() => handleVerDetalles(venta.idVenta)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Ver Detalles
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderSecciones = () => (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">Secciones</h2>
                <Link
                    href="/secciones/create"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Nueva Sección
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left">Nombre</th>
                        <th className="px-6 py-3 text-left">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {secciones.map((seccion) => (
                        <tr key={seccion.idSeccion}>
                            <td className="px-6 py-4">{seccion.NombreSeccion}</td>
                            <td className="px-6 py-4 space-x-2">
                                <Link
                                    href={`/secciones/${seccion.idSeccion}/edit`}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDeleteSeccion(seccion.idSeccion)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            {/* Stock Alert */}
            <StockAlert ingredientes={ingredientes} />

            {message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {message}
                </div>
            )}

            {/* Navigation Bar */}
            <div className="flex space-x-1 mb-6 bg-white shadow-md rounded-lg p-1">
                <button
                    onClick={() => setActiveTab('productos')}
                    className={`flex-1 px-4 py-2 rounded-md transition-colors duration-200 ${
                        activeTab === 'productos'
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-gray-100'
                    }`}
                >
                    Productos
                </button>
                <button
                    onClick={() => setActiveTab('ingredientes')}
                    className={`flex-1 px-4 py-2 rounded-md transition-colors duration-200 ${
                        activeTab === 'ingredientes'
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-gray-100'
                    }`}
                >
                    Ingredientes
                    {ingredientes.filter(ing => ing.StockIngrediente <= ing.StockMinimoIngrediente).length > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            !
                        </span>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('ventas')}
                    className={`flex-1 px-4 py-2 rounded-md transition-colors duration-200 ${
                        activeTab === 'ventas'
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-gray-100'
                    }`}
                >
                    Ventas
                </button>
                <button
                    onClick={() => setActiveTab('secciones')}
                    className={`flex-1 px-4 py-2 rounded-md transition-colors duration-200 ${
                        activeTab === 'secciones'
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-gray-100'
                    }`}
                >
                    Secciones
                </button>
            </div>

            {/* Content Area */}
            <div>
                {activeTab === 'productos' && renderProductos()}
                {activeTab === 'ingredientes' && renderIngredientes()}
                {activeTab === 'ventas' && renderVentas()}
                {activeTab === 'secciones' && renderSecciones()}
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto p-4">
                {/* Todo tu contenido actual del Dashboard */}
                <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
                <StockAlert ingredientes={ingredientes} />
                {/* etc... */}
            </div>
        </AuthenticatedLayout>
    );
};



export default Dashboard;
