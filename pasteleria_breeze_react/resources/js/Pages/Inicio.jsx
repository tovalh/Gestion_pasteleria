import { useState } from 'react'
import { Head } from "@inertiajs/react"
import { useCart } from '../Context/CartContext'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

export default function Inicio({ productos, user }) {
    const { addToCart } = useCart()

    const formatPrice = (price) => {
        return (parseFloat(price)).toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP'
        })
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

    return (
        <>
            <Head>
                <title>Dolci Mimi</title>
                <meta name="description" content="Bienvenidos a Dolci Mimi, tu pastelería artesanal" />
            </Head>
            <div className="bg-[#F7F0E9] min-h-screen">
                <Navbar user={user} />

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
                                               {formatPrice(product.PrecioProducto)}
                                           </span>
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                                                    Agregar al Carrito
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

                <Footer />
            </div>
        </>
    )
}
