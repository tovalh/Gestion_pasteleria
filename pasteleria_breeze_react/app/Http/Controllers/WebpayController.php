<?php

namespace App\Http\Controllers;

use App\Models\Cliente; // Añadir este import
use Illuminate\Http\Request;
use Transbank\Webpay\WebpayPlus;
use Transbank\Webpay\WebpayPlus\Transaction;
use Inertia\Inertia;

class WebpayController extends Controller
{
    public function __construct()
    {
        if (config('app.env') === 'production') {
            WebpayPlus::configureForProduction(
                config('services.webpay.commerce_code'),
                config('services.webpay.api_key')
            );
        } else {
            WebpayPlus::configureForTesting();
        }
    }

    public function initTransaction(Request $request)
    {
        // Validar que exista información de venta pendiente
        $ventaPendiente = session('venta_pendiente');
        if (!$ventaPendiente) {
            return response()->json(['error' => 'No hay una venta pendiente'], 400);
        }

        $transaction = new Transaction;

        try {
            $response = $transaction->create(
                'ORDER-' . rand(1000, 9999),
                session()->getId(),
                $ventaPendiente['total'],
                route('webpay.return')
            );

            session(['webpay_token' => $response->getToken()]);

            return response()->json([
                'url' => $response->getUrl(),
                'token' => $response->getToken()
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function returnUrl(Request $request)
    {
        $token = $request->input('token_ws');

        if (!$token) {
            return Inertia::render('Compra/Fallida', [
                'error' => 'Transacción cancelada por el usuario'
            ]);
        }

        $transaction = new Transaction;

        try {
            $response = $transaction->commit($token);

            \Log::info('Respuesta de WebPay:', [
                'response' => [
                    'amount' => $response->getAmount(),
                    'status' => $response->getStatus(),
                    'buyOrder' => $response->getBuyOrder(),
                    'responseCode' => $response->getResponseCode(),
                    'authorizationCode' => $response->getAuthorizationCode()
                ]
            ]);

            if ($response->isApproved()) {
                // Crear la venta y obtener el código de seguimiento
                $resultadoVenta = app(VentaController::class)->confirmarVenta($request);

                return Inertia::render('Compra/Exitosa', [
                    'mensaje' => 'Pago realizado con éxito',
                    'codigoSeguimiento' => $resultadoVenta['codigoSeguimiento'],
                    'detalles' => [
                        'monto' => $response->getAmount(),
                        'estado' => $response->getStatus(),
                        'ordenCompra' => $response->getBuyOrder(),
                        'codigoAutorizacion' => $response->getAuthorizationCode()
                    ]
                ]);
            } else {
                return Inertia::render('Compra/Fallida', [
                    'error' => 'Transacción rechazada',
                    'detalles' => [
                        'estado' => $response->getStatus(),
                        'ordenCompra' => $response->getBuyOrder(),
                        'codigoRespuesta' => $response->getResponseCode()
                    ]
                ]);
            }
        } catch (\Exception $e) {
            \Log::error('Error en returnUrl de WebPay:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return Inertia::render('Compra/Fallida', [
                'error' => 'Error al procesar el pago: ' . $e->getMessage()
            ]);
        }
    }
}
