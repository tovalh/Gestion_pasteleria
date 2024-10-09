import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/AdminLayout';
import Dashboard from '../Components/Dashboard';
import Sections from '../Components/Sections';
import Ingredients from '../Components/Ingredients';
import Products from '../Components/Products';

const Administracion = ({ sections, ingredients, products }) => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard />;
            case 'sections':
                return <Sections sections={sections} />;
            case 'ingredients':
                return <Ingredients ingredients={ingredients} />;
            case 'products':
                return <Products products={products} sections={sections} ingredients={ingredients} />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <Layout>
            <Head title="Administración" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-pink-800 mb-6">Panel de Administración</h1>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="mb-4">
                                <nav className="flex space-x-4">
                                    <button
                                        onClick={() => setActiveTab('dashboard')}
                                        className={`px-3 py-2 rounded-md ${
                                            activeTab === 'dashboard'
                                                ? 'bg-pink-500 text-white'
                                                : 'text-pink-700 hover:bg-pink-100'
                                        }`}
                                    >
                                        Dashboard
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('sections')}
                                        className={`px-3 py-2 rounded-md ${
                                            activeTab === 'sections'
                                                ? 'bg-pink-500 text-white'
                                                : 'text-pink-700 hover:bg-pink-100'
                                        }`}
                                    >
                                        Secciones
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('ingredients')}
                                        className={`px-3 py-2 rounded-md ${
                                            activeTab === 'ingredients'
                                                ? 'bg-pink-500 text-white'
                                                : 'text-pink-700 hover:bg-pink-100'
                                        }`}
                                    >
                                        Ingredientes
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('products')}
                                        className={`px-3 py-2 rounded-md ${
                                            activeTab === 'products'
                                                ? 'bg-pink-500 text-white'
                                                : 'text-pink-700 hover:bg-pink-100'
                                        }`}
                                    >
                                        Productos
                                    </button>
                                </nav>
                            </div>
                            {renderActiveTab()}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Administracion;
