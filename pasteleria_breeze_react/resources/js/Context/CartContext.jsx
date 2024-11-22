import React, { createContext, useContext, useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

const CartContext = createContext();

export function CartProvider({ children, user }) {
    const userId = user?.id;
    const CART_STORAGE_KEY = userId ? `cart_${userId}` : null;

    // Inicializamos el estado del carrito con los datos guardados o un array vacío
    const [cart, setCart] = useState(() => {
        if (typeof window !== 'undefined' && CART_STORAGE_KEY) {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    // Limpiar o cargar el carrito cuando cambia el usuario
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (CART_STORAGE_KEY) {
                const savedCart = localStorage.getItem(CART_STORAGE_KEY);
                setCart(savedCart ? JSON.parse(savedCart) : []);
            } else {
                setCart([]);
            }
        }
    }, [userId]);

    // Guardar el carrito en localStorage y sincronizar entre pestañas
    useEffect(() => {
        if (typeof window !== 'undefined' && CART_STORAGE_KEY) {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        }
    }, [cart, CART_STORAGE_KEY]);

    // Escuchar cambios en localStorage de otras pestañas
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === CART_STORAGE_KEY) {
                const newCart = e.newValue ? JSON.parse(e.newValue) : [];
                setCart(newCart);
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('storage', handleStorageChange);
            return () => window.removeEventListener('storage', handleStorageChange);
        }
    }, [CART_STORAGE_KEY]);

    const addToCart = (item) => {
        if (!user) {
            router.visit('/login');
            return;
        }

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
        if (!user) return;
        setCart((currentCart) => currentCart.filter((item) => item.id !== itemId));
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (!user) return;
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
        if (!user) return;
        setCart([]);
        if (CART_STORAGE_KEY) {
            localStorage.removeItem(CART_STORAGE_KEY);
        }
    };

    const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            cartItemsCount,
            cartTotal,
            updateQuantity,
            isAuthenticated: !!user
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
