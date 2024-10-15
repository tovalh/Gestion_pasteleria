import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '../Components/Modal2';

const Ingredients = ({ ingredients }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/ingredientes', {
            preserveState: true,
            onSuccess: () => {
                closeModal();
            },
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-pink-800">Ingredientes</h2>
                <button
                    onClick={openModal}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
                >
                    Agregar Ingrediente
                </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {ingredients.map((ingredient) => (
                    <tr key={ingredient.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{ingredient.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{ingredient.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Agregar Ingrediente">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                            Nombre del Ingrediente
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

export default Ingredients;
