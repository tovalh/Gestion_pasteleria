import { useState } from 'react'
import { ShoppingCart, Menu as MenuIcon, X } from 'lucide-react'
import { useCart } from '../Context/CartContext'
import CartComponent from '../Components/CartComponent'
import { Head } from "@inertiajs/react"

export default function ProductoDetalle({ producto }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const { addToCart } = useCart()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    const handleAddToCart = () => {
        const cartItem = {
            id: producto.idProducto,
            name: producto.NombreProducto,
            price: parseFloat(producto.PrecioProducto),
            description: producto.DescripcionProducto,
            image: producto.RutaImagen
        }
        addToCart(cartItem)
    }

    return (
        <>
            <Head>
                <title>{`${producto.NombreProducto} - Dolci Mimi`}</title>
                <meta name="description" content={producto.DescripcionProducto} />
            </Head>
            <div className="flex flex-col min-h-screen">
                {/* Header */}
                <header className="bg-pink-500 text-pink-50 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <a href="\inicio" className="text-2xl font-bold">Dolci Mimi</a>
                        <nav className="hidden md:flex space-x-6">
                            <a href="\inicio" className="hover:text-pink-200">Inicio</a>
                            <a href="\menu" className="hover:text-pink-200">Productos</a>
                            <a href="\aboutUs" className="hover:text-pink-200">Nosotros</a>
                            <button className="md:hidden" onClick={toggleMenu}>
                                {isMenuOpen ? <X/> : <MenuIcon/>}
                            </button>
                            <ShoppingCart className="hidden md:block cursor-pointer" onClick={toggleCart}/>
                        </nav>
                    </div>
                </header>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-pink-600 text-pink-50 p-4">
                        <nav className="flex flex-col space-y-2">
                            <a href="\inicio" className="hover:text-pink-200">Home</a>
                            <a href="\menu" className="hover:text-pink-200">Menu</a>
                            <a href="\aboutUs" className="hover:text-pink-200">About</a>
                        </nav>
                    </div>
                )}

                {/* Main Content - Product Detail */}
                <main className="flex-grow bg-[#F7F0E9] flex items-center justify-center">
                    <div className="container mx-auto px-4 py-8">
                        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="md:flex">
                                <div className="md:w-1/2">
                                    <div className="h-full">
                                        <img
                                            src={producto.RutaImagen}
                                            alt={producto.NombreProducto}
                                            className="w-full h-full object-cover"
                                            style={{ minHeight: '400px' }}
                                        />
                                    </div>
                                </div>

                                <div className="md:w-1/2 p-8">
                                    <h1 className="text-3xl font-bold text-pink-800 mb-4">
                                        {producto.NombreProducto}
                                    </h1>

                                    <p className="text-gray-600 text-lg mb-6">
                                        {producto.DescripcionProducto}
                                    </p>

                                    <div className="flex items-center justify-between mb-8">
                                        <span className="text-2xl font-bold text-pink-700">
                                            ${parseFloat(producto.PrecioProducto).toFixed(2)}
                                        </span>
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
                                    >
                                        <ShoppingCart className="mr-2" />
                                        Agregar al carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-pink-500 text-pink-50 py-8 mt-auto">
                    <div className="container mx-auto text-center">
                        <p>&copy; 2023 Sweet Delights Bakery. All rights reserved.</p>
                        <div className="mt-4">
                            <a href="#" className="text-pink-200 hover:text-white mx-2">Privacy Policy</a>
                            <a href="#" className="text-pink-200 hover:text-white mx-2">Terms of Service</a>
                        </div>
                    </div>
                </footer>

                {/* Cart Sidebar */}
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
            </div>
        </>
    )
}
