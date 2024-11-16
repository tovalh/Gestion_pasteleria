import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';

const Receta = ({ producto, ingredientesDisponibles, recetaActual }) => {
    const [receta, setReceta] = useState(recetaActual || []);
    const [loading, setLoading] = useState(false);

    const agregarIngrediente = () => {
        setReceta([...receta, {
            ingrediente_id: '',
            cantidad: 0,
            nombre: '',
            unidad_medida: ''
        }]);
    };

    const eliminarIngrediente = (index) => {
        setReceta(receta.filter((_, i) => i !== index));
    };

    const actualizarIngrediente = (index, campo, valor) => {
        const nuevaReceta = [...receta];
        nuevaReceta[index][campo] = valor;

        if (campo === 'ingrediente_id') {
            const ingredienteSeleccionado = ingredientesDisponibles.find(
                ing => ing.idIngrediente === parseInt(valor)
            );
            if (ingredienteSeleccionado) {
                nuevaReceta[index].nombre = ingredienteSeleccionado.NombreIngrediente;
                nuevaReceta[index].unidad_medida = ingredienteSeleccionado.UnidadDeMedidaIngrediente;
            }
        }

        setReceta(nuevaReceta);
    };

    const guardarReceta = () => {
        setLoading(true);

        router.post(route('api.recetas.actualizar', producto.idProducto), {
            ingredientes: receta.map(item => ({
                ingrediente_id: parseInt(item.ingrediente_id),
                cantidad: parseInt(item.cantidad)
            }))
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <Head title={`Receta - ${producto.NombreProducto}`} />

            <div className="mb-6">
                <Link
                    href={route('dashboard')}
                    className="text-blue-600 hover:text-blue-800"
                >
                    ← Volver al Dashboard
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">
                    Receta para: {producto.NombreProducto}
                </h2>

                <div className="space-y-4 mb-6">
                    {receta.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 bg-gray-50 p-3 rounded">
                            <select
                                value={item.ingrediente_id}
                                onChange={(e) => actualizarIngrediente(index, 'ingrediente_id', e.target.value)}
                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                            >
                                <option value="">Seleccionar ingrediente</option>
                                {ingredientesDisponibles.map(ing => (
                                    <option key={ing.idIngrediente} value={ing.idIngrediente}>
                                        {ing.NombreIngrediente}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="number"
                                value={item.cantidad}
                                onChange={(e) => actualizarIngrediente(index, 'cantidad', e.target.value)}
                                className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                                placeholder="Cantidad"
                                min="0"
                            />

                            <span className="w-20 text-sm text-gray-600">
                                {item.unidad_medida}
                            </span>

                            <button
                                type="button"
                                onClick={() => eliminarIngrediente(index)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex space-x-4">
                    <button
                        type="button"
                        onClick={agregarIngrediente}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                    >
                        Agregar Ingrediente
                    </button>

                    <button
                        type="button"
                        onClick={guardarReceta}
                        disabled={loading}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 disabled:opacity-50"
                    >
                        {loading ? 'Guardando...' : 'Guardar Receta'}
                    </button>

                    <Link
                        href={route('dashboard')}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
                    >
                        Cancelar
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Receta;
