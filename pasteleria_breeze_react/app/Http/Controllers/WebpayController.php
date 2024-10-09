<?php

namespace App\Http\Controllers;

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
        $transaction = new Transaction;

        try {
            $response = $transaction->create(
                'ORDER-' . rand(1000, 9999), // Orden de compra
                session()->getId(), // Sesión ID
                $request->amount, // Monto
                route('webpay.return') // URL de retorno
            );

            // Guardamos el token en la sesión
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

        $transaction = new Transaction;

        try {
            $response = $transaction->commit($token);

            if ($response->isApproved()) {
                // Transacción exitosa
                return app(VentaController::class)->confirmarVenta($request);
            }
            else {
                // Transacción rechazada
                return Inertia::render('PaymentRejected', [
                    'response' => $response
                ]);
            }
        } catch (\Exception $e) {
            return Inertia::render('PaymentError', [
                'error' => $e->getMessage()
            ]);
        }
    }
}
