import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../Context/CartContext';

const WebPayButton = ({ total, className, formData }) => {
    const { cart } = useCart();
    const [loading, setLoading] = useState(false);

    const getMetodoPago = (paymentMethod) => {
        switch(paymentMethod) {
            case 'credit':
                return 'Tarjeta de Credito';
            case 'debit':
                return 'Tarjeta de Debito';
            case 'cash':
                return 'Efectivo';
            default:
                return 'Tarjeta de Credito';
        }
    };

    const handlePayment = async () => {
        if (!cart || cart.length === 0) {
            alert('El carrito está vacío');
            return;
        }

        if (!formData.rut) {
            alert('El RUT es obligatorio');
            return;
        }

        setLoading(true);
        try {
            const productIds = cart.map(item => item.id);

            const payloadData = {
                productos: productIds,
                comentario: formData.specialInstructions || 'Sin instrucciones especiales',
                total: total,
                metodoPago: getMetodoPago(formData.paymentMethod),
                datosCliente: {
                    NombreCliente: `${formData.firstName} ${formData.lastName}`.trim(),
                    CorreoCliente: formData.email,
                    RutCliente: formData.rut,
                    NumeroCliente: formData.phone,
                    DireccionCliente: `${formData.address}, ${formData.city}`.trim(),
                    opcionEntrega: formData.deliveryOption
                }
            };

            console.log('Enviando datos:', payloadData); // Para debugging

            const response1 = await axios.post('/venta/preparar-checkout', payloadData);

            if (response1.data.checkoutUrl) {
                const response2 = await axios.post('/webpay/create', {
                    amount: total
                });

                if (response2.data.url && response2.data.token) {
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

            if (error.response?.data?.details) {
                errorMessage += Object.values(error.response.data.details).flat().join('\n');
            } else if (error.response?.data?.message) {
                errorMessage += error.response.data.message;
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
