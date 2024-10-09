import React from 'react';

const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-pink-100 rounded-lg text-center">
                <h2 className="text-xl font-semibold text-pink-800">Gestionar Secciones</h2>
            </div>
            <div className="p-6 bg-pink-100 rounded-lg text-center">
                <h2 className="text-xl font-semibold text-pink-800">Gestionar Ingredientes</h2>
            </div>
            <div className="p-6 bg-pink-100 rounded-lg text-center">
                <h2 className="text-xl font-semibold text-pink-800">Gestionar Productos</h2>
            </div>
        </div>
    );
};

export default Dashboard;
