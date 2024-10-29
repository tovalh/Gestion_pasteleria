import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

const Form = ({ producto = null, isEditing = false }) => {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        NombreProducto: '',
        DescripcionProducto: '',
        PrecioProducto: '',
        Seccion_idSeccion: '',
        RutaImagen: ''
    });

    useEffect(() => {
        if (isEditing && producto) {
            reset({
                NombreProducto: producto.NombreProducto,
                DescripcionProducto: producto.DescripcionProducto,
                PrecioProducto: producto.PrecioProducto,
                Seccion_idSeccion: producto.Seccion_idSeccion,
                RutaImagen: producto.RutaImagen || ''
            });
        }
    }, [producto]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(`/productos/${producto.idProducto}`);
        } else {
            post('/productos');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">
                {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Nombre</label>
                    <input
                        type="text"
                        value={data.NombreProducto}
                        onChange={e => setData('NombreProducto', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    {errors.NombreProducto && (
                        <div className="text-red-500 text-sm">{errors.NombreProducto}</div>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Descripción</label>
                    <textarea
                        value={data.DescripcionProducto}
                        onChange={e => setData('DescripcionProducto', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    {errors.DescripcionProducto && (
                        <div className="text-red-500 text-sm">{errors.DescripcionProducto}</div>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Precio</label>
                    <input
                        type="number"
                        step="0.01"
                        value={data.PrecioProducto}
                        onChange={e => setData('PrecioProducto', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    {errors.PrecioProducto && (
                        <div className="text-red-500 text-sm">{errors.PrecioProducto}</div>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Sección</label>
                    <input
                        type="number"
                        value={data.Seccion_idSeccion}
                        onChange={e => setData('Seccion_idSeccion', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    {errors.Seccion_idSeccion && (
                        <div className="text-red-500 text-sm">{errors.Seccion_idSeccion}</div>
                    )}
                </div>

                {/* Campo para la ruta de la imagen */}
                <div>
                    <label className="block mb-1">Ruta de la Imagen</label>
                    <input
                        type="text"
                        value={data.RutaImagen}
                        onChange={e => setData('RutaImagen', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Ingrese la ruta de la imagen"
                    />
                    {errors.RutaImagen && (
                        <div className="text-red-500 text-sm">{errors.RutaImagen}</div>
                    )}
                </div>

                {isEditing && data.RutaImagen && (
                    <div className="mt-2">
                        <p className="text-sm text-gray-600">Vista previa de la imagen:</p>
                        <img
                            src={data.RutaImagen}
                            alt="Vista previa del producto"
                            className="mt-1 max-w-xs rounded"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'ruta-a-imagen-por-defecto';
                            }}
                        />
                    </div>
                )}

                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {processing ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
