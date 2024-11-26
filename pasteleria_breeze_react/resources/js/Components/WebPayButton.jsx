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

        if (!formData.deliveryDate) {
            alert('La fecha de entrega es obligatoria');
            return;
        }

        setLoading(true);
        try {
            const payloadData = {
                productos: cart.map(item => ({
                    id: item.id,
                    cantidad: item.quantity
                })),
                comentario: formData.specialInstructions || 'Sin instrucciones especiales',
                total: total,
                metodoPago: getMetodoPago(formData.paymentMethod),
                fechaEntrega: formData.deliveryDate,
                datosCliente: {
                    NombreCliente: `${formData.firstName} ${formData.lastName}`.trim(),
                    CorreoCliente: formData.email,
                    RutCliente: formData.rut,
                    NumeroCliente: formData.phone,
                    DireccionCliente: `${formData.address}, ${formData.city}`.trim(),
                    opcionEntrega: formData.deliveryOption
                }
            };

            console.log('Enviando datos:', payloadData);

            const response = await axios.post('/venta/preparar-checkout', payloadData);

            // Si es pago en efectivo
            if (payloadData.metodoPago === 'Efectivo') {
                if (response.data.success && response.data.redirect) {
                    window.location.href = response.data.redirect;
                    return;
                }
            }
            // Si es WebPay
            else if (response.data.checkoutUrl) {
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

    // Validar si todos los campos requeridos están llenos
    const isFormValid = () => {
        return formData.firstName &&
            formData.lastName &&
            formData.email &&
            formData.phone &&
            formData.rut &&
            formData.address &&
            formData.city &&
            formData.deliveryDate && // Incluir validación de fecha
            cart &&
            cart.length > 0;
    };

    return (
        <button
            onClick={handlePayment}
            className={className}
            type="button"
            disabled={loading || !isFormValid()}
        >
            {loading ? 'Procesando...' : formData.paymentMethod === 'cash' ? 'Confirmar Pedido' : 'Pagar con Webpay'}
        </button>
    );
};

export default WebPayButton;
