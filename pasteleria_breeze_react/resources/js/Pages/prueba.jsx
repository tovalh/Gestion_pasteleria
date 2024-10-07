import React from 'react';
import { Head } from '@inertiajs/react';

export default function Index({ productos }) {
    return (
        <>
            <Head title="Productos" />
            <div>
                <h1>Productos</h1>
                <ul>
                    {productos.map((producto) => (
                        <li key={producto.id}>{producto.NombreProducto}  {producto.DescripcionProducto}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}
