import React, { createContext, useContext, useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

const CartContext = createContext();

export function CartProvider({ children, user }) {
    const userId = user?.id;
    // Use a generic key for anonymous users
    const CART_STORAGE_KEY = userId ? `cart_${userId}` : 'cart_anonymous';

    // Initialize cart state with saved data or empty array
    const [cart, setCart] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    // Handle cart data when user authentication status changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (userId) {
                // If user just logged in, try to merge anonymous cart with user cart
                const anonymousCart = localStorage.getItem('cart_anonymous');
                const userCart = localStorage.getItem(`cart_${userId}`);

                if (anonymousCart) {
                    const parsedAnonymousCart = JSON.parse(anonymousCart);
                    const parsedUserCart = userCart ? JSON.parse(userCart) : [];

                    // Merge carts, combining quantities for duplicate items
                    const mergedCart = parsedAnonymousCart.reduce((acc, anonItem) => {
                        const existingItem = acc.find(item => item.id === anonItem.id);
                        if (existingItem) {
                            existingItem.quantity += anonItem.quantity;
                            return acc;
                        }
                        return [...acc, anonItem];
                    }, [...parsedUserCart]);

                    setCart(mergedCart);
                    // Clear anonymous cart after merging
                    localStorage.removeItem('cart_anonymous');
                } else if (userCart) {
                    setCart(JSON.parse(userCart));
                }
            } else {
                // If user logged out, load anonymous cart
                const anonymousCart = localStorage.getItem('cart_anonymous');
                setCart(anonymousCart ? JSON.parse(anonymousCart) : []);
            }
        }
    }, [userId]);

    // Save cart to localStorage and sync between tabs
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        }
    }, [cart, CART_STORAGE_KEY]);

    // Listen for storage changes in other tabs
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
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([]));
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
