import React from 'react';
import { useCart } from '../Context/CartContext.jsx';
import { router } from '@inertiajs/react';
import { X } from 'lucide-react';

export default function CartComponent() {
    const { cart, removeFromCart, clearCart } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-pink-800 mb-4">Tu carrito</h2>
            {cart.length === 0 ? (
                <p className="text-pink-600">Tu carrito esta vacio</p>
            ) : (
                <>
                {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center mb-2">
                        <div>
                            <h3 className="text-lg font-semibold text-pink-800">{item.name}</h3>
                            <p className="text-pink-600">${item.price.toFixed(2)} x {item.quantity}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)}
                                className="text-pink-500 hover:text-pink-700">
                            <X size={20}/>
                        </button>
                    </div>
                ))}
                <div className="mt-4 pt-4 border-t border-pink-200">
                    <p className="text-xl font-bold text-pink-800">Total: ${total.toFixed(2)}</p>
                </div>
                <div className="container mx-auto flex justify-between items-center">
                    <button onClick={() => router.visit('/checkout')}
                            className="mt-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-300">
                        Pagar
                    </button>
                    <button onClick={clearCart}
                            className="mt-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-300">
                        Limpiar carrito
                    </button>
                </div>
                </>
                )}
                </div>
            );
            }
