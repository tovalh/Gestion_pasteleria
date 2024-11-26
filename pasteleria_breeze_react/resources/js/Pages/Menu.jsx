import React, { useState } from 'react'
import { ShoppingCart, X } from 'lucide-react'
import { useCart } from '../Context/CartContext'
import CartComponent from '../Components/CartComponent'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

export default function ProductsSection({ productos }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [showVegan, setShowVegan] = useState(false)
    const [sortBy, setSortBy] = useState('name')
    const [isCartOpen, setIsCartOpen] = useState(false)
    const { addToCart, cartItemsCount } = useCart()

    const formatPrice = (price) => {
        return (parseFloat(price)).toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP'
        })
    };

    const categories = [
        'All',
        ...new Set(
            productos
                .filter(product => product.seccion)
                .map(product => product.seccion.NombreSeccion)
        )
    ];

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    const handleAddToCart = (e, product) => {
        e.preventDefault()
        const cartItem = {
            id: product.idProducto,
            name: product.NombreProducto,
            price: parseFloat(product.PrecioProducto),
            description: product.DescripcionProducto,
            image: product.imagen || `/placeholder.svg?height=200&width=300`
        }
        addToCart(cartItem)
    }

    const filteredProducts = productos
        .filter(product =>
            product.NombreProducto.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === 'All' ||
                (product.seccion && product.seccion.NombreSeccion === selectedCategory))
        )
        .sort((a, b) => {
            if (sortBy === 'name') return a.NombreProducto.localeCompare(b.NombreProducto)
            if (sortBy === 'price-asc') return a.PrecioProducto - b.PrecioProducto
            if (sortBy === 'price-desc') return b.PrecioProducto - a.PrecioProducto
            return 0
        })

    return (
        <div className="bg-[#F7F0E9] min-h-screen">
            <Navbar />

            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-pink-800 mb-6">Nuestros Productos</h1>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow p-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="p-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="p-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                        <option value="name">Nombre</option>
                        <option value="price-asc">Precio: Menor a Mayor</option>
                        <option value="price-desc">Precio: Mayor a Menor</option>
                    </select>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                        <div key={product.idProducto} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <a href={`/producto/${product.idProducto}`} className="block cursor-pointer">
                                <img
                                    src={product.RutaImagen}
                                    alt={product.NombreProducto}
                                    className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-80"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-pink-800 mb-2 hover:text-pink-600 transition-colors duration-300">
                                        {product.NombreProducto}
                                    </h2>
                                    <p className="text-pink-600 mb-2">{product.DescripcionProducto}</p>
                                    <div className="flex justify-between items-center">
                                       <span className="text-lg font-bold text-pink-700">
                                           {formatPrice(product.PrecioProducto)}
                                       </span>
                                        <button
                                            onClick={(e) => handleAddToCart(e, product)}
                                            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                                        >
                                            Agregar al Carrito
                                        </button>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />

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
    )
}
