<?php

namespace App\Service;

use App\Models\Producto;
use Exception;
use Illuminate\Support\Facades\Log;

class StockService
{
    public function actualizarStockPorVenta(Producto $producto)
    {
        try {
            // Obtener los ingredientes con get()
            $ingredientes = $producto->ingredientes()->get();

            Log::info('Actualizando stock para producto:', [
                'producto_id' => $producto->idProducto,
                'nombre_producto' => $producto->NombreProducto,
                'cantidad_ingredientes' => $ingredientes->count()
            ]);

            foreach ($ingredientes as $ingrediente) {
                $cantidadNecesaria = $ingrediente->pivot->cantidad;
                $stockActual = $ingrediente->stockActual();

                Log::info('Verificando ingrediente:', [
                    'ingrediente_id' => $ingrediente->idIngrediente,
                    'nombre_ingrediente' => $ingrediente->NombreIngrediente,
                    'stock_actual' => $stockActual,
                    'cantidad_necesaria' => $cantidadNecesaria
                ]);

                if ($stockActual < $cantidadNecesaria) {
                    throw new Exception(
                        "Stock insuficiente de {$ingrediente->NombreIngrediente} para {$producto->NombreProducto}. " .
                        "Stock actual: {$stockActual}, Necesario: {$cantidadNecesaria}"
                    );
                }

                // Actualizar el stock
                $ingrediente->StockIngrediente -= $cantidadNecesaria;
                $ingrediente->save();

                Log::info('Stock actualizado:', [
                    'ingrediente_id' => $ingrediente->idIngrediente,
                    'nuevo_stock' => $ingrediente->StockIngrediente
                ]);

                if ($ingrediente->StockIngrediente <= $ingrediente->StockMinimoIngrediente) {
                    $this->notificarStockBajo($ingrediente);
                }
            }

            return true;

        } catch (\Exception $e) {
            Log::error('Error en actualizarStockPorVenta:', [
                'producto_id' => $producto->idProducto,
                'mensaje' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    private function notificarStockBajo($ingrediente)
    {
        Log::warning('Stock bajo detectado:', [
            'ingrediente_id' => $ingrediente->idIngrediente,
            'nombre_ingrediente' => $ingrediente->NombreIngrediente,
            'stock_actual' => $ingrediente->StockIngrediente,
            'stock_minimo' => $ingrediente->StockMinimoIngrediente
        ]);

        // Aquí puedes implementar el sistema de notificaciones
        // Por ejemplo, enviar un email al administrador
    }
}
