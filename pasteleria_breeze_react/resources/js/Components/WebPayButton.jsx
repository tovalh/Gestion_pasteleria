import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../Context/CartContext';

const WebPayButton = ({ total, className }) => {
    const { cart } = useCart();
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        if (!cart || cart.length === 0) {
            alert('El carrito está vacío');
            return;
        }

        setLoading(true);
        try {
            // Extraer solo los IDs de los productos
            const productIds = cart.map(item => item.id);

            // Primer paso: preparar el checkout
            const response1 = await axios.post(
                '/venta/preparar-checkout',
                {
                    productos: productIds,
                    Clientes_idCliente: 1,
                    comentario: 'Venta desde WebPay',
                    total: total
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
                    }
                }
            );

            console.log('Respuesta preparar checkout:', response1.data);

            if (response1.data.checkoutUrl) {
                // Segundo paso: iniciar transacción WebPay
                const response2 = await axios.post(response1.data.checkoutUrl);
                console.log('Respuesta WebPay:', response2.data);

                if (response2.data.url && response2.data.token) {
                    // Tercer paso: redirigir a WebPay
                    const form = document.createElement('form');
                    form.method = 'POST';
                    form.action = response2.data.url;

                    const tokenInput = document.createElement('input');
                    tokenInput.type = 'hidden';
                    tokenInput.name = 'token_ws';
                    tokenInput.value = response2.data.token;

                    form.appendChild(tokenInput);
                    document.body.appendChild(form);
                    form.submit();
                }
            }
        } catch (error) {
            console.error('Error al procesar el pago:', error);
            let errorMessage = 'Error al procesar el pago: ';

            if (error.response?.data?.error) {
                errorMessage += error.response.data.error;
                if (error.response.data.details) {
                    errorMessage += '\n' + Object.values(error.response.data.details).flat().join('\n');
                }
            } else if (error.message) {
                errorMessage += error.message;
            } else {
                errorMessage += 'Error desconocido';
            }

            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handlePayment}
            className={className}
            type="button"
            disabled={loading || !cart || cart.length === 0}
        >
            {loading ? 'Procesando...' : 'Pagar con Webpay'}
        </button>
    );
};

export default WebPayButton;
