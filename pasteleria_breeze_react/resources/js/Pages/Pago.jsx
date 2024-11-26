import React, { useState, useEffect } from 'react';
import { ArrowLeft, Menu as MenuIcon, X, AlertCircle } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import { usePage } from '@inertiajs/react';
import WebPayButton from '../Components/WebPayButton.jsx';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Pago() {
    const { cart, clearCart } = useCart();
    const { auth } = usePage().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        rut: '',
        deliveryDate: '',
        specialInstructions: '',
        deliveryOption: 'asap',
        paymentMethod: 'credit'
    });

    // Calculamos la fecha mínima (mañana)
    const tomorrow = new Date();
    tomorrow.setHours(0, 0, 0, 0); // Resetea la hora a 00:00:00
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    useEffect(() => {
        if (auth.user) {
            const nameParts = auth.user.name.split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';

            setFormData(prevData => ({
                ...prevData,
                firstName,
                lastName,
                email: auth.user.email || ''
            }));
        }
    }, [auth.user]);

    const formatPrice = (price) => {
        return (parseFloat(price)).toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP'
        });
    };

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = 2500;
    const total = subtotal + deliveryFee;

    const validateField = (name, value) => {
        switch (name) {
            case 'firstName':
            case 'lastName':
                return value.length >= 2 ? '' : 'Este campo debe tener al menos 2 caracteres';
            case 'phone':
                return value.length >= 8 ? '' : 'El teléfono debe tener al menos 8 dígitos';
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Ingrese un email válido';
            case 'rut':
                const rutLimpio = value.replace(/\./g, '').replace(/-/g, '');
                return rutLimpio.length >= 8 && rutLimpio.length <= 10 ? '' : 'El RUT debe tener entre 8 y 10 caracteres';
            case 'address':
                return value.length >= 5 ? '' : 'La dirección debe tener al menos 5 caracteres';
            case 'city':
                return value.length >= 3 ? '' : 'La ciudad debe tener al menos 3 caracteres';
            case 'deliveryDate':
                return value ? '' : 'Seleccione una fecha de entrega';
            case 'deliveryOption':
                return value ? '' : 'Seleccione una opción de entrega';
            case 'paymentMethod':
                return value ? '' : 'Seleccione un método de pago';
            default:
                return '';
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validar el campo cuando cambia
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            if (key !== 'specialInstructions') { // Las instrucciones especiales son opcionales
                const error = validateField(key, formData[key]);
                if (error) newErrors[key] = error;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const orderData = {
                items: cart,
                subtotal,
                deliveryFee,
                total,
                customerInfo: formData
            };
            console.log('Order submitted:', orderData);
            clearCart();
        }
    };

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

    const renderInput = (name, label, type = "text", required = true) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                required={required}
                readOnly={auth.user && name === 'email'}
                min={type === 'date' ? minDate : undefined}
                className={`w-full p-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded
                    focus:outline-none focus:ring-2 focus:ring-pink-500
                    ${auth.user && name === 'email' ? 'bg-gray-100' : ''}`}
            />
            {errors[name] && (
                <div className="flex items-center space-x-1 text-red-500 text-sm mt-1">
                    <AlertCircle size={16} />
                    <span>{errors[name]}</span>
                </div>
            )}
        </div>
    );

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Navbar/>

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="flex items-center mb-6">
                    <a href="/menu" className="flex items-center text-gray-600 hover:text-gray-800">
                        <ArrowLeft className="w-5 h-5 mr-2"/>
                        <span>Volver al menú</span>
                    </a>
                </div>

                <h1 className="text-2xl font-semibold mb-8">Finalizar Pedido</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Información Personal */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-lg font-medium mb-4">Información Personal</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {renderInput("firstName", "Nombre")}
                                    {renderInput("lastName", "Apellido")}
                                    {renderInput("rut", "RUT")}
                                </div>
                            </div>

                            {/* Información de Contacto */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-lg font-medium mb-4">Información de Contacto</h3>
                                <div className="space-y-4">
                                    {renderInput("email", "Email", "email")}
                                    {renderInput("phone", "Teléfono", "tel")}
                                </div>
                            </div>

                            {/* Dirección de Entrega */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="text-lg font-medium mb-4">Dirección de Entrega</h3>
                                <div className="space-y-4">
                                    {renderInput("address", "Dirección")}
                                    {renderInput("city", "Ciudad")}
                                    {renderInput("deliveryDate", "Fecha de Entrega", "date")}
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
                                            Opción de Entrega <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="deliveryOption"
                                            value={formData.deliveryOption}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        >
                                            <option value="asap">Lo antes posible</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Método de Pago <span className="text-red-500">*</span>
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

                            <WebPayButton
                                total={total}
                                className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                formData={formData}
                                disabled={Object.keys(errors).length > 0}
                            />
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 p-6 rounded-lg sticky top-6">
                            <h2 className="text-lg font-medium mb-4">Resumen del Pedido</h2>

                            <div className="space-y-4 mb-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex justify-between">
                                       <span className="text-gray-600">
                                           {item.name} x {item.quantity}
                                       </span>
                                        <span>{formatPrice(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Costo de envío</span>
                                    <span>{formatPrice(deliveryFee)}</span>
                                </div>
                                <div className="pt-4 border-t">
                                    <div className="flex justify-between font-medium">
                                        <span>Total a pagar:</span>
                                        <span>{formatPrice(total)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
