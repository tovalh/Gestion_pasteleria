import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

const Form = ({ ingrediente = null, isEditing = false }) => {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        NombreIngrediente: ingrediente?.NombreIngrediente || '',
        StockIngrediente: ingrediente?.StockIngrediente?.toString() || '0',
        StockMinimoIngrediente: ingrediente?.StockMinimoIngrediente?.toString() || '0',
        UnidadDeMedidaIngrediente: ingrediente?.UnidadDeMedidaIngrediente || '',
    });

    useEffect(() => {
        if (isEditing && ingrediente) {
            setData({
                NombreIngrediente: ingrediente.NombreIngrediente,
                StockIngrediente: ingrediente.StockIngrediente.toString(),
                StockMinimoIngrediente: ingrediente.StockMinimoIngrediente.toString(),
                UnidadDeMedidaIngrediente: ingrediente.UnidadDeMedidaIngrediente,
            });
        }
    }, [ingrediente, isEditing]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(`/ingredientes/${ingrediente.idIngrediente}`);
        } else {
            post('/ingredientes');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">
                {isEditing ? 'Editar Ingrediente' : 'Nuevo Ingrediente'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Nombre</label>
                    <input
                        type="text"
                        value={data.NombreIngrediente}
                        onChange={e => setData('NombreIngrediente', e.target.value)}
                        className="w-full border rounded px-3 py-2 bg-white/10 text-black"
                        required
                    />
                    {errors.NombreIngrediente && (
                        <div className="text-red-500 text-sm">{errors.NombreIngrediente}</div>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Stock</label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={data.StockIngrediente}
                        onChange={e => setData('StockIngrediente', e.target.value)}
                        className="w-full border rounded px-3 py-2 bg-white/10 text-black"
                        required
                    />
                    {errors.StockIngrediente && (
                        <div className="text-red-500 text-sm">{errors.StockIngrediente}</div>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Stock Mínimo</label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={data.StockMinimoIngrediente}
                        onChange={e => setData('StockMinimoIngrediente', e.target.value)}
                        className="w-full border rounded px-3 py-2 bg-white/10 text-black"
                        required
                    />
                    {errors.StockMinimoIngrediente && (
                        <div className="text-red-500 text-sm">{errors.StockMinimoIngrediente}</div>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Unidad de Medida</label>
                    <select
                        value={data.UnidadDeMedidaIngrediente}
                        onChange={e => setData('UnidadDeMedidaIngrediente', e.target.value)}
                        className="w-full border rounded px-3 py-2 bg-white/10 text-black"
                        required
                    >
                        <option value="" disabled>Seleccione una unidad</option>
                        <option value="und">Unidad (und)</option>
                        <option value="gr">Gramos (gr)</option>
                        <option value="ml">Mililitros (ml)</option>
                    </select>
                    {errors.UnidadDeMedidaIngrediente && (
                        <div className="text-red-500 text-sm">{errors.UnidadDeMedidaIngrediente}</div>
                    )}
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="px-4 py-2 border rounded text-gray-300 hover:bg-gray-700"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-blue-500 text.black rounded hover:bg-blue-600"
                    >
                        {processing ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
