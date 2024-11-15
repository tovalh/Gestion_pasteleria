import { useState } from 'react'
import { ShoppingCart, Menu as MenuIcon, X, User } from 'lucide-react'
import { useCart } from '../Context/CartContext'
import CartComponent from './CartComponent'

export default function Navbar({ user }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const { cartItemsCount } = useCart()

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen)
    }

    return (
        <>
            <header className="bg-pink-500 text-pink-50 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <a href="\inicio" className="text-2xl font-bold">Dolci Mimi</a>
                    <nav className="hidden md:flex space-x-6 items-center">
                        <a href="\inicio" className="hover:text-pink-200">Inicio</a>
                        <a href="\menu" className="hover:text-pink-200">Productos</a>
                        <a href="\seguimiento" className="hover:text-pink-200">Seguimiento</a>
                        <a href="\aboutUs" className="hover:text-pink-200">Nosotros</a>
                        <button className="md:hidden" onClick={toggleMenu}>
                            {isMenuOpen ? <X/> : <MenuIcon/>}
                        </button>
                        <button onClick={toggleCart} className="relative">
                            <ShoppingCart className="text-pink-50"/>
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-white text-pink-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                    {cartItemsCount}
                                </span>
                            )}
                        </button>
                        <div className="relative">
                            <button onClick={toggleUserMenu} className="text-pink-50 hover:text-pink-200">
                                <User size={20}/>
                            </button>
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                    {user ? (
                                        <>
                                            <a href="/profile" className="block px-4 py-2 text-pink-800 hover:bg-pink-100">
                                                Mi Perfil
                                            </a>
                                            <a href="/mis_pedidos" className="block px-4 py-2 text-pink-800 hover:bg-pink-100">
                                                Mis Pedidos
                                            </a>
                                            <a href="/logout" className="block px-4 py-2 text-pink-800 hover:bg-pink-100">
                                                Cerrar Sesión
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <a href="/login" className="block px-4 py-2 text-pink-800 hover:bg-pink-100">
                                                Iniciar Sesión
                                            </a>
                                            <a href="/register" className="block px-4 py-2 text-pink-800 hover:bg-pink-100">
                                                Registrarse
                                            </a>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Versión móvil del carrito */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="mr-4">
                            {isMenuOpen ? <X/> : <MenuIcon/>}
                        </button>
                        <button onClick={toggleCart} className="relative">
                            <ShoppingCart className="text-pink-50"/>
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-white text-pink-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                    {cartItemsCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {isMenuOpen && (
                <div className="md:hidden bg-pink-600 text-pink-50 p-4">
                    <nav className="flex flex-col space-y-2">
                        <a href="\inicio" className="hover:text-pink-200">Inicio</a>
                        <a href="\menu" className="hover:text-pink-200">Menu</a>
                        <a href="\seguimiento" className="hover:text-pink-200">Seguimiento</a>
                        <a href="\aboutUs" className="hover:text-pink-200">About</a>
                    </nav>
                </div>
            )}

            {isCartOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
                    <div className="bg-white w-full max-w-md h-full overflow-y-auto">
                        <div className="p-4">
                            <button onClick={toggleCart} className="mb-4">
                                <X/>
                            </button>
                            <CartComponent/>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
