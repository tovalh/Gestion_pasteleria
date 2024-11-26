import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import StockAlert from '../Components/StockAlert.jsx';
// Componente Navbar para el Dashboard
const DashboardNavbar = () => {
    const handleLogout = () => {
        router.post(route('logout'), null, {
            onSuccess: () => router.visit(route('inicio'))
        });
    };

    return (
        <nav className="bg-pink-600 text-white p-4 shadow-md mb-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link
                        href={route('dashboard')}
                        className="text-xl font-bold hover:text-pink-200"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href={route('inicio')}
                        className="hover:text-pink-200"
                    >
                        Ir al Inicio
                    </Link>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-pink-700 px-4 py-2 rounded hover:bg-pink-800 transition-colors"
                >
                    Cerrar Sesión
                </button>
            </div>
        </nav>
    );
};

const Dashboard = ({ auth, productos, ingredientes, secciones, ventas: initialVentas, message }) => {
    const [activeTab, setActiveTab] = useState('productos');
    const [ventas, setVentas] = useState(initialVentas);

    // Agregar estos nuevos estados
    const [filteredVentas, setFilteredVentas] = useState(initialVentas);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [precioMinimo, setPrecioMinimo] = useState('');
    const [precioMaximo, setPrecioMaximo] = useState('');
    const [estadoFiltro, setEstadoFiltro] = useState('');

    useEffect(() => {
        let resultado = ventas;

        // Filtro por fecha
        if (fechaInicio && fechaFin) {
            resultado = resultado.filter(venta => {
                const fechaVenta = new Date(venta.created_at);
                const inicio = new Date(fechaInicio);
                const fin = new Date(fechaFin);
                fin.setHours(23, 59, 59);
                return fechaVenta >= inicio && fechaVenta <= fin;
            });
        }

        // Filtro por precio
        if (precioMinimo !== '') {
            resultado = resultado.filter(venta =>
                venta.totalVenta >= parseFloat(precioMinimo)
            );
        }
        if (precioMaximo !== '') {
            resultado = resultado.filter(venta =>
                venta.totalVenta <= parseFloat(precioMaximo)
            );
        }

        // Filtro por estado
        if (estadoFiltro) {
            resultado = resultado.filter(venta =>
                venta.estadoPedido === estadoFiltro
            );
        }

        setFilteredVentas(resultado);
    }, [fechaInicio, fechaFin, precioMinimo, precioMaximo, estadoFiltro, ventas]);

    const resetFiltros = () => {
        setFechaInicio('');
        setFechaFin('');
        setPrecioMinimo('');
        setPrecioMaximo('');
        setEstadoFiltro('');
    };

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
            await router.put(`/ventas/${idVenta}`, {
                estadoPedido: nuevoEstado
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    setVentas(prevVentas =>
                        prevVentas.map(venta =>
                            venta.idVenta === idVenta
                                ? { ...venta, estadoPedido: nuevoEstado }
                                : venta
                        )
                    );
                },
                onError: () => {
                    alert('Error al actualizar el estado del pedido');
                }
            });
        } catch (error) {
            console.error('Error al actualizar el estado del pedido:', error);
            alert('Error al actualizar el estado del pedido');
        }
    };

    const handleVerDetalles = (idVenta) => {
        router.visit(route('ventas.showAdmin', idVenta), {
            preserveState: false,
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
                                <Link
                                    href={`/productos/${producto.idProducto}/receta`}
                                    className="text-green-600 hover:text-green-800"
                                >
                                    Agregar Receta
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
                <div className="p-4 bg-gray-50 border-b">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Ventas</h2>
                        <Link
                            href="/ventaAdmin"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Nueva Venta
                        </Link>
                    </div>

                    {/* Filtros */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 bg-white p-4 rounded-lg">
                        <div className="space-y-2">
                            <h3 className="font-medium text-gray-700">Filtrar por Fecha</h3>
                            <div className="flex gap-2">
                                <input
                                    type="date"
                                    value={fechaInicio}
                                    onChange={(e) => setFechaInicio(e.target.value)}
                                    className="w-full rounded border-gray-300"
                                    placeholder="Fecha inicio"
                                />
                                <input
                                    type="date"
                                    value={fechaFin}
                                    onChange={(e) => setFechaFin(e.target.value)}
                                    className="w-full rounded border-gray-300"
                                    placeholder="Fecha fin"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-medium text-gray-700">Filtrar por Precio</h3>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="Mínimo"
                                    value={precioMinimo}
                                    onChange={(e) => setPrecioMinimo(e.target.value)}
                                    className="w-full rounded border-gray-300"
                                />
                                <input
                                    type="number"
                                    placeholder="Máximo"
                                    value={precioMaximo}
                                    onChange={(e) => setPrecioMaximo(e.target.value)}
                                    className="w-full rounded border-gray-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-medium text-gray-700">Filtrar por Estado</h3>
                            <select
                                value={estadoFiltro}
                                onChange={(e) => setEstadoFiltro(e.target.value)}
                                className="w-full rounded border-gray-300"
                            >
                                <option value="">Todos</option>
                                <option value="En Proceso">En Proceso</option>
                                <option value="Disponible">Disponible</option>
                                <option value="Entregado">Entregado</option>
                                <option value="Cancelado">Cancelado</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end mb-4">
                        <button
                            onClick={resetFiltros}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Limpiar Filtros
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left">ID Venta</th>
                            <th className="px-6 py-3 text-left">Fecha</th>
                            <th className="px-6 py-3 text-left">Comentario</th>
                            <th className="px-6 py-3 text-left">Total</th>
                            <th className="px-6 py-3 text-left">Estado</th>
                            <th className="px-6 py-3 text-left">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {filteredVentas.map((venta) => (
                            <tr key={venta.idVenta}>
                                <td className="px-6 py-4">{venta.idVenta}</td>
                                <td className="px-6 py-4">
                                    {new Date(venta.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">{venta.Comentario}</td>
                                <td className="px-6 py-4">${venta.totalVenta.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <select
                                        value={venta.estadoPedido}
                                        onChange={(e) => handleUpdateEstadoPedido(venta.idVenta, e.target.value)}
                                        className="px-8 py-1 rounded bg-gray-200"
                                    >
                                        <option value="En Proceso">En Proceso</option>
                                        <option value="Disponible">Disponible</option>
                                        <option value="Entregado">Entregado</option>
                                        <option value="Cancelado">Cancelado</option>
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
        <div className="min-h-screen bg-gray-100">
            <Head title="Dashboard" />

            {/* Navbar */}
            <DashboardNavbar />

            <div className="max-w-7xl mx-auto p-4">
                <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>

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
        </div>
    );
};

export default Dashboard;
