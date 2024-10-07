<?php

namespace App\Service;

use App\Models\Producto;
use Exception;

class StockService
{
    public function actualizarStockPorVenta(Producto $producto){
        $ingredientes = $producto->ingredientes();

        foreach ($ingredientes as $ingrediente){
            $cantidadNecesaria = $ingrediente->pivot->cantidad;
            $stockActual = $ingrediente->stockActual();

            if ($stockActual < $cantidadNecesaria) {
                throw new Exception("Stock insuficiente de {$ingrediente->NombreIngrediente} para {$producto->NombreProducto}");
            }

            $ingrediente->StockIngrediente -= $cantidadNecesaria;
            $ingrediente->save();

            if ($ingrediente->StockIngrediente <= $ingrediente->StockMinimoIngrediente) {
                // Aquí podrías implementar un sistema de notificaciones
                $this->notificarStockBajo($ingrediente);
            }
        }
    }

    private function notificarStockBajo($ingrediente)
    {
    }

}
