import React from 'react';
import { useCart } from '../Context/CartContext.jsx';
import { router, usePage } from '@inertiajs/react';
import { X, Plus, Minus } from 'lucide-react';

export default function CartComponent() {
    const { cart, removeFromCart, clearCart, updateQuantity, cartTotal, isAuthenticated } = useCart();
    const { auth } = usePage().props;

    const formatPrice = (price) => {
        return (parseFloat(price)).toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP'
        });
    };

    const handleQuantityChange = (itemId, currentQuantity, increment) => {
        const newQuantity = currentQuantity + (increment ? 1 : -1);
        updateQuantity(itemId, newQuantity);
    };

    const handleCheckout = () => {
        if (!auth.user) {
            router.visit('/login');
            return;
        }

        if (cart.length > 0) {
            router.visit('/pago');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-pink-800 mb-4">Tu carrito</h2>
                <div className="text-center">
                    <p className="text-pink-600 mb-4">Por favor, inicia sesión para usar el carrito</p>
                    <a
                        href="/login"
                        className="inline-block bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 transition duration-300"
                    >
                        Iniciar Sesión
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-pink-800 mb-4">Tu carrito</h2>
            {cart.length === 0 ? (
                <p className="text-pink-600">Tu carrito está vacío</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center mb-4 border-b border-pink-100 pb-4">
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold text-pink-800">{item.name}</h3>
                                <p className="text-pink-600">{formatPrice(item.price)} c/u</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.quantity, false)}
                                        className="p-1 rounded-full hover:bg-pink-100 text-pink-500"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.quantity, true)}
                                        className="p-1 rounded-full hover:bg-pink-100 text-pink-500"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-pink-500 hover:text-pink-700"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 pt-4 border-t border-pink-200">
                        <p className="text-xl font-bold text-pink-800">Total: {formatPrice(cartTotal)}</p>
                    </div>
                    <div className="container mx-auto flex justify-between items-center mt-4">
                        <button
                            onClick={handleCheckout}
                            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-300"
                        >
                            Pagar
                        </button>
                        <button
                            onClick={clearCart}
                            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-300"
                        >
                            Limpiar carrito
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
