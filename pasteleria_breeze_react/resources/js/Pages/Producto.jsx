import React from 'react';

export default function Producto({ producto }) {
    return (
        <div className="bg-[#F7F0E9] min-h-screen flex flex-col items-center justify-center">
            <header className="bg-pink-500 text-pink-50 p-4 w-full text-center">
                <h1 className="text-3xl font-bold">Detalles del Producto</h1>
            </header>

            <main className="flex flex-col items-center mt-8">
                {/* Mostrar producto */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold">{producto.NombreProducto}</h3>
                    <p className="text-gray-600 mt-2">{producto.DescripcionProducto}</p>
                    <p className="text-xl font-bold mt-4">${producto.PrecioProducto}</p>
                </div>
            </main>

            <footer className="bg-pink-500 text-pink-50 py-4 w-full text-center mt-auto">
                <p>&copy; 2023 Dolci Mimi. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
