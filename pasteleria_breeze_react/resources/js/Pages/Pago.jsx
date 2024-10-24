import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../Context/CartContext';

export default function Pago() {
    const { cart, clearCart } = useCart();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        specialInstructions: '',
        deliveryOption: 'asap',
        paymentMethod: 'credit'
    });

    // Calcular el subtotal del carrito
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = 2.50;
    const total = subtotal + deliveryFee;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes enviar tanto la información del formulario como el carrito
        const orderData = {
            items: cart,
            subtotal,
            deliveryFee,
            total,
            customerInfo: formData
        };

        console.log('Order submitted:', orderData);
        // Aquí iría tu lógica de procesamiento del pedido

        // Limpiar el carrito después de procesar el pedido
        clearCart();
        // Redireccionar a una página de confirmación o similar
    };

    // Si el carrito está vacío, redirigir al menú
    if (cart.length === 0) {
        return (
            <div className="bg-white min-h-screen p-6 flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold mb-4">Tu carrito está vacío</h2>
                <a href="/menu" className="text-pink-500 hover:text-pink-600 flex items-center">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Volver al menú
                </a>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center mb-6">
                    <a href="/menu" className="flex items-center text-gray-600 hover:text-gray-800">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        <span>Volver al menú</span>
                    </a>
                </div>

                <h1 className="text-2xl font-semibold mb-8">Finalizar Pedido</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Formulario Principal */}
                    <div className="lg:col-span-2 space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Información Personal */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-lg font-medium mb-4">Información Personal</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Apellido
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Información de Contacto */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-lg font-medium mb-4">Información de Contacto</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Teléfono
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Dirección de Entrega */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-lg font-medium mb-4">Dirección de Entrega</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Dirección
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Ciudad
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Instrucciones Especiales */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-lg font-medium mb-4">Instrucciones Especiales</h3>
                                <div>
                                    <textarea
                                        name="specialInstructions"
                                        value={formData.specialInstructions}
                                        onChange={handleInputChange}
                                        rows="3"
                                        placeholder="Instrucciones adicionales para la entrega..."
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Opciones de Entrega y Pago */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-lg font-medium mb-4">Opciones de Entrega y Pago</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Opción de Entrega
                                        </label>
                                        <select
                                            name="deliveryOption"
                                            value={formData.deliveryOption}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        >
                                            <option value="asap">Lo antes posible</option>
                                            <option value="scheduled">Programar entrega</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Método de Pago
                                        </label>
                                        <select
                                            name="paymentMethod"
                                            value={formData.paymentMethod}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        >
                                            <option value="credit">Tarjeta de Crédito</option>
                                            <option value="debit">Tarjeta de Débito</option>
                                            <option value="cash">Efectivo</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600 transition-colors"
                            >
                                Realizar Pedido
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 p-6 rounded-lg sticky top-6">
                            <h2 className="text-lg font-medium mb-4">Resumen del Pedido</h2>

                            {/* Items del carrito */}
                            <div className="space-y-4 mb-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex justify-between">
                                        <span className="text-gray-600">
                                            {item.name} x {item.quantity}
                                        </span>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Costo de envío</span>
                                    <span>${deliveryFee.toFixed(2)}</span>
                                </div>
                                <div className="pt-4 border-t">
                                    <div className="flex justify-between font-medium">
                                        <span>Total a pagar:</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
