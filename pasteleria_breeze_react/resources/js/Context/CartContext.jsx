import React, { createContext, useContext, useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'dolciMimiCart';

export function CartProvider({ children }) {
    // Inicializamos el estado del carrito con los datos guardados o un array vacío
    const [cart, setCart] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    // Guardar el carrito en localStorage y sincronizar entre pestañas
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        }
    }, [cart]);

    // Escuchar cambios en localStorage de otras pestañas
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === CART_STORAGE_KEY) {
                const newCart = e.newValue ? JSON.parse(e.newValue) : [];
                setCart(newCart);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const addToCart = (item) => {
        setCart((currentCart) => {
            const existingItem = currentCart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return currentCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...currentCart, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId) => {
        setCart((currentCart) => currentCart.filter((item) => item.id !== itemId));
    };

    const updateQuantity = (itemId, newQuantity) => {
        setCart((currentCart) => {
            if (newQuantity <= 0) {
                return currentCart.filter((item) => item.id !== itemId);
            }
            return currentCart.map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            );
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem(CART_STORAGE_KEY);
    };

    const proceedToCheckout = () => {
        // Usa Inertia para navegar al checkout con los datos del carrito
        router.post('/checkout', {
            items: cart,
            total: cartTotal,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Función para restaurar el carrito desde el servidor si es necesario
    const syncWithServer = async () => {
        try {
            const response = await fetch('/api/cart/sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
                },
                body: JSON.stringify({ cart }),
            });
            const data = await response.json();
            if (data.cart) {
                setCart(data.cart);
            }
        } catch (error) {
            console.error('Error syncing cart with server:', error);
        }
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            cartItemsCount,
            cartTotal,
            updateQuantity,
            proceedToCheckout,
            syncWithServer
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
