import React from 'react';
import { Link } from '@inertiajs/react';
import { ShoppingCart, Menu as MenuIcon, X } from 'lucide-react';

export default function OrderHistory({ pedidos }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-[#F7F0E9] min-h-screen">
            <header className="bg-pink-500 text-pink-50 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <a href="/inicio" className="text-2xl font-bold">Dolci Mimi</a>
                    <nav className="hidden md:flex space-x-6">
                        <Link href="/inicio" className="hover:text-pink-200">Inicio</Link>
                        <Link href="/menu" className="hover:text-pink-200">Productos</Link>
                        <Link href="/seguimiento" className="hover:text-pink-200">Seguimiento</Link>
                        <Link href="/aboutUs" className="hover:text-pink-200">Nosotros</Link>
                        <Link href="/mis-pedidos" className="hover:text-pink-200">Mis Pedidos</Link>
                    </nav>

                    <button className="md:hidden" onClick={toggleMenu}>
                        {isMenuOpen ? <X /> : <MenuIcon />}
                    </button>
                </div>
            </header>

            {isMenuOpen && (
                <div className="md:hidden bg-pink-600 text-pink-50 p-4">
                    <nav className="flex flex-col space-y-2">
                        <Link href="/inicio" className="hover:text-pink-200">Inicio</Link>
                        <Link href="/menu" className="hover:text-pink-200">Productos</Link>
                        <Link href="/seguimiento" className="hover:text-pink-200">Seguimiento</Link>
                        <Link href="/aboutUs" className="hover:text-pink-200">Nosotros</Link>
                        <Link href="/mis-pedidos" className="hover:text-pink-200">Mis Pedidos</Link>
                    </nav>
                </div>
            )}

            <main className="container mx-auto p-6">
                <h1 className="text-2xl font-bold text-pink-800 mb-6">Mi Historial de Pedidos</h1>

                {pedidos.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600">No tienes pedidos anteriores.</p>
                        <Link
                            href="/menu"
                            className="mt-4 inline-block bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition duration-300"
                        >
                            Ir a comprar
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {pedidos.map((pedido) => (
                            <div key={pedido.id} className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold text-pink-800">
                                        Pedido #{pedido.numeroTransaccion}
                                    </h2>
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        pedido.estado === 'Entregado' ? 'bg-green-100 text-green-800' :
                                            pedido.estado === 'En Preparacion' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-blue-100 text-blue-800'
                                    }`}>
                                        {pedido.estado}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-gray-600">Fecha: {pedido.fecha}</p>
                                    <p className="text-gray-600">Método de pago: {pedido.metodoPago}</p>

                                    <div className="mt-4">
                                        <h3 className="font-semibold mb-2">Productos:</h3>
                                        <ul className="space-y-2">
                                            {pedido.productos.map((producto, index) => (
                                                <li key={index} className="flex justify-between">
                                                    <span>{producto.nombre}</span>
                                                    <span className="font-medium">${producto.precio}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-4 pt-4 border-t">
                                        <p className="text-xl font-bold text-pink-800">
                                            Total: ${pedido.total}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <footer className="bg-pink-500 text-pink-50 py-8 mt-12">
                <div className="container mx-auto text-center">
                    <p>&copy; {new Date().getFullYear()} Dolci Mimi. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
