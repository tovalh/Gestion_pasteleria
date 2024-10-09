import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '../Components/Modal2';

const Products = ({ products, sections, ingredients }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        section_id: '',
        ingredients: [],
    });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/products', {
            preserveState: true,
            onSuccess: () => {
                closeModal();
            },
        });
    };

    const addIngredient = () => {
        setData('ingredients', [...data.ingredients, { ingredient_id: '', quantity: '' }]);
    };

    const updateIngredient = (index, field, value) => {
        const updatedIngredients = [...data.ingredients];
        updatedIngredients[index][field] = value;
        setData('ingredients', updatedIngredients);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-pink-800">Productos</h2>
                <button
                    onClick={openModal}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
                >
                    Agregar Producto
                </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sección</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingredientes</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                    <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{product.section.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {product.ingredients.map((ing, index) => (
                                <span key={index} className="inline-block  bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {ing.ingredient.name}: {ing.quantity}
                  </span>
                            ))}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Agregar Producto">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                            Nombre del Producto
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.name && <div className="text-red-500 text-xs italic">{errors.name}</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="section" className="block text-gray-700 text-sm font-bold mb-2">
                            Sección
                        </label>
                        <select
                            id="section"
                            value={data.section_id}
                            onChange={(e) => setData('section_id', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Selecciona una sección</option>
                            {sections.map((section) => (
                                <option key={section.id} value={section.id}>
                                    {section.name}
                                </option>
                            ))}
                        </select>
                        {errors.section_id && <div className="text-red-500 text-xs italic">{errors.section_id}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Ingredientes</label>
                        {data.ingredients.map((ing, index) => (
                            <div key={index} className="flex mb-2">
                                <select
                                    value={ing.ingredient_id}
                                    onChange={(e) => updateIngredient(index, 'ingredient_id', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                                >
                                    <option value="">Selecciona un ingrediente</option>
                                    {ingredients.map((ingredient) => (
                                        <option key={ingredient.id} value={ingredient.id}>
                                            {ingredient.name}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    value={ing.quantity}
                                    onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                                    placeholder="Cantidad"
                                    className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addIngredient}
                            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Agregar Ingrediente
                        </button>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Products;
