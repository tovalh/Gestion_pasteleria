import React from 'react';
import { AlertTriangle } from 'lucide-react';

const StockAlert = ({ ingredientes }) => {
    const ingredientesBajoStock = ingredientes.filter(
        ing => ing.StockIngrediente <= ing.StockMinimoIngrediente
    );

    if (ingredientesBajoStock.length === 0) return null;

    return (
        <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
            <div className="flex">
                <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                        Alerta de Stock Bajo
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                        <ul className="list-disc space-y-1 pl-5">
                            {ingredientesBajoStock.map((ingrediente) => (
                                <li key={ingrediente.idIngrediente}>
                                    <span className="font-medium">{ingrediente.NombreIngrediente}</span>:
                                    {' '}{ingrediente.StockIngrediente} {ingrediente.UnidadDeMedidaIngrediente}
                                    {' '}(Mínimo: {ingrediente.StockMinimoIngrediente} {ingrediente.UnidadDeMedidaIngrediente})
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockAlert;
