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

        setLoading(true);
        try {
            // Extraer solo los IDs de los productos
            const productIds = cart.map(item => item.id);

            const payloadData = {
                productos: productIds,
                Clientes_idCliente: 1, // TODO: Obtener el ID real del cliente
                comentario: formData.specialInstructions || 'Sin instrucciones especiales',
                total: total,
                metodoPago: getMetodoPago(formData.paymentMethod),
                datosCliente: {
                    nombre: formData.firstName,
                    apellido: formData.lastName,
                    email: formData.email,
                    telefono: formData.phone,
                    direccion: formData.address,
                    ciudad: formData.city,
                    opcionEntrega: formData.deliveryOption
                }
            };

            const response1 = await axios.post(
                '/venta/preparar-checkout',
                payloadData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
                    }
                }
            );

            console.log('Respuesta del servidor:', response1.data);

            if (response1.data.checkoutUrl) {
                const response2 = await axios.post(response1.data.checkoutUrl, {
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

            if (error.response?.data?.errors) {
                const errors = Object.values(error.response.data.errors).flat();
                errorMessage += errors.join('\n');
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
