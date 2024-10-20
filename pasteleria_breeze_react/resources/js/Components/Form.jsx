import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

const Form = ({
                  type = 'producto', // 'producto' o 'ingrediente'
                  item = null,
                  isEditing = false,
                  onSuccess = () => {}
              }) => {
    // Definir campos iniciales según el tipo
    const initialData = type === 'producto'
        ? {
            NombreProducto: '',
            DescripcionProducto: '',
            PrecioProducto: '',
            Seccion_idSeccion: ''
        }
        : {
            NombreIngrediente: '',
            StockIngrediente: '',
            StockMinimoIngrediente: '',
            UnidadDeMedidaIngrediente: ''
        };

    const { data, setData, post, put, processing, errors, reset } = useForm(initialData);

    // Establecer los valores iniciales cuando el componente se monta
    useEffect(() => {
        if (isEditing && item) {
            reset(item);
        }
    }, [item]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(`/${type}s/${item.id}`, {
                onSuccess: () => {
                    onSuccess();
                }
            });
        } else {
            post(`/${type}s`, {
                onSuccess: () => {
                    onSuccess();
                }
            });
        }
    };

    // Renderizar campos según el tipo
    const renderFields = () => {
        if (type === 'producto') {
            return (
                <>
                    <div>
                        <label className="block mb-1">Nombre del Producto</label>
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
                </>
            );
        } else {
            return (
                <>
                    <div>
                        <label className="block mb-1">Nombre del Ingrediente</label>
                        <input
                            type="text"
                            value={data.NombreIngrediente}
                            onChange={e => setData('NombreIngrediente', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                        {errors.NombreIngrediente && (
                            <div className="text-red-500 text-sm">{errors.NombreIngrediente}</div>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1">Stock Actual</label>
                        <input
                            type="number"
                            value={data.StockIngrediente}
                            onChange={e => setData('StockIngrediente', e.target.value)}
                            className="w-full border rounded px-3 py-2"
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
                            value={data.StockMinimoIngrediente}
                            onChange={e => setData('StockMinimoIngrediente', e.target.value)}
                            className="w-full border rounded px-3 py-2"
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
                            className="w-full border rounded px-3 py-2"
                            required
                        >
                            <option value="">Seleccione una unidad</option>
                            <option value="kg">Kilogramos</option>
                            <option value="g">Gramos</option>
                            <option value="l">Litros</option>
                            <option value="ml">Mililitros</option>
                            <option value="unidad">Unidades</option>
                        </select>
                        {errors.UnidadDeMedidaIngrediente && (
                            <div className="text-red-500 text-sm">{errors.UnidadDeMedidaIngrediente}</div>
                        )}
                    </div>
                </>
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {renderFields()}

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
    );
};

export default Form;
