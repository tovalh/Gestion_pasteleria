import React from 'react';
import axios from 'axios';

const WebPayButton = ({ total, className }) => {
    const handlePayment = async () => {
        try {
            // Iniciamos la transacción con Webpay
            const response = await axios.post('/webpay/create', {
                amount: total
            });

            // Redirigimos al usuario a la página de pago de Webpay
            if (response.data.url && response.data.token) {
                // Creamos un formulario oculto para enviar el token a Webpay
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = response.data.url;

                const tokenInput = document.createElement('input');
                tokenInput.type = 'hidden';
                tokenInput.name = 'token_ws';
                tokenInput.value = response.data.token;

                form.appendChild(tokenInput);
                document.body.appendChild(form);
                form.submit();
            }
        } catch (error) {
            console.error('Error al iniciar el pago:', error);
            alert('Hubo un error al procesar el pago. Por favor, intenta nuevamente.');
        }
    };

    return (
        <button
            onClick={handlePayment}
            className={className}
            type="button"
        >
            Pagar con Webpay
        </button>
    );
};

export default WebPayButton;
