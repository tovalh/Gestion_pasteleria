import React, { useState } from 'react';
import { User } from 'lucide-react';

export default function UserMenu({ user }) {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    return (
        <div className="relative">
            <button onClick={toggleUserMenu} className="text-pink-50 hover:text-pink-200">
                <User size={20} />
            </button>
            {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    {user ? (
                        <>
                            <a href="/profile" className="block px-4 py-2 text-pink-800 hover:bg-pink-100">Mi Perfil</a>
                            <a href="/mis_pedidos" className="block px-4 py-2 text-pink-800 hover:bg-pink-100">Mis Pedidos</a>
                            <a href="/logout" className="block px-4 py-2 text-pink-800 hover:bg-pink-100">Cerrar Sesión</a>
                        </>
                    ) : (
                        <>
                            <a href="/login" className="block px-4 py-2 text-pink-800 hover:bg-pink-100">Iniciar Sesión</a>
                            <a href="/register" className="block px-4 py-2 text-pink-800 hover:bg-pink-100">Registrarse</a>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
