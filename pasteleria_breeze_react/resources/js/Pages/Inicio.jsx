import { useState } from 'react'
import { ShoppingCart, Menu as MenuIcon, X } from 'lucide-react'
import { useCart } from '../Context/CartContext'
import CartComponent from '../Components/CartComponent'
import {Head} from "@inertiajs/react";

export default function Inicio({ productos }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const { cartItemsCount, addToCart } = useCart()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const featuredProducts = productos ? productos.slice(0, 3) : []

    const handleAddToCart = (product) => {
        const cartItem = {
            id: product.idProducto,
            name: product.NombreProducto,
            price: parseFloat(product.PrecioProducto),
            description: product.DescripcionProducto,
            image: product.RutaImagen
        }
        addToCart(cartItem)
    }

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    return (
        <>
            <Head>
                <title>Dolci Mimi</title>
                <meta name="description" content="Bienvenidos a Dolci Mimi, tu pastelería artesanal" />
            </Head>
            <div className="bg-[#F7F0E9] min-h-screen">
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

                <main>
                    <section className="relative h-96">
                        <div
                            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: "url('/images/portada_cake.jpg')",
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                backgroundBlendMode: 'overlay'
                            }}
                        />
                        <div className="relative h-full flex items-center justify-center">
                            <a href="\menu" className="hover:text-pink-200">
                                <button
                                    className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition duration-300">
                                    Explora nuestros productos
                                </button>
                            </a>
                        </div>
                    </section>

                    <section className="py-16">
                        <div className="container mx-auto">
                            <h2 className="text-3xl font-bold text-pink-800 mb-8 text-center">
                                Nuestros deliciosos productos
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
                                {featuredProducts.map(product => (
                                    <div key={product.idProducto} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <div>
                                            <a href={`/producto/${product.idProducto}`}>
                                                <img
                                                    src={product.RutaImagen}
                                                    alt={product.NombreProducto}
                                                    className="w-full h-48 object-cover hover:opacity-80 transition-opacity duration-300"
                                                />
                                            </a>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-xl font-semibold text-pink-800 mb-2">
                                                {product.NombreProducto}
                                            </h3>
                                            <p className="text-pink-600 mb-4">{product.DescripcionProducto}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-bold text-pink-700">
                                                    ${parseFloat(product.PrecioProducto).toFixed(2)}
                                                </span>
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-8">
                                <a href="/menu"
                                   className="inline-block bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition duration-300">
                                    Ver todos los productos
                                </a>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="bg-pink-500 text-pink-50 py-8">
                    <div className="container mx-auto text-center">
                        <p>&copy; 2023 Sweet Delights Bakery. All rights reserved.</p>
                        <div className="mt-4">
                            <a href="#" className="text-pink-200 hover:text-white mx-2">Privacy Policy</a>
                            <a href="#" className="text-pink-200 hover:text-white mx-2">Terms of Service</a>
                        </div>
                    </div>
                </footer>

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
