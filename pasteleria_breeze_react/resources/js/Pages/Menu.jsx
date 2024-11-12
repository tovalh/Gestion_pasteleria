import React, { useState } from 'react'
import { ShoppingCart, Menu, X, Menu as MenuIcon } from 'lucide-react'
import { useCart } from '../Context/CartContext'
import CartComponent from '../Components/CartComponent'

export default function ProductsSection({ productos }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [showVegan, setShowVegan] = useState(false)
    const [sortBy, setSortBy] = useState('name')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const { addToCart, cartItemsCount } = useCart()

    const categories = ['All', ...new Set(productos.map(product => product.Seccion_idSeccion))]

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    const handleAddToCart = (e, product) => {
        e.preventDefault() // Previene la navegación al detalle cuando se hace clic en "Add to Cart"
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
            (selectedCategory === 'All' || product.Seccion_idSeccion === selectedCategory)
        )
        .sort((a, b) => {
            if (sortBy === 'name') return a.NombreProducto.localeCompare(b.NombreProducto)
            if (sortBy === 'price-asc') return a.PrecioProducto - b.PrecioProducto
            if (sortBy === 'price-desc') return b.PrecioProducto - a.PrecioProducto
            return 0
        })

    return (
        <div className="bg-[#F7F0E9] min-h-screen">
            <header className="bg-pink-500 text-pink-50 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <a href="\inicio" className="text-2xl font-bold">Dolci Mimi</a>
                    <nav className="hidden md:flex space-x-6">
                        <a href="\inicio" className="hover:text-pink-200">Inicio</a>
                        <a href="\menu" className="hover:text-pink-200">Productos</a>
                        <a href="\seguimiento" className="hover:text-pink-200">Seguimiento</a>
                        <a href="\aboutUs" className="hover:text-pink-200">Nosotros</a>
                        <button className="md:hidden" onClick={toggleMenu}>
                            {isMenuOpen ? <X/> : <MenuIcon/>}
                        </button>
                        <button onClick={toggleCart} className="relative">
                            <ShoppingCart className="hidden md:block text-pink-50"/>
                            {cartItemsCount > 0 && (
                                <span
                                    className="absolute -top-2 -right-2 bg-white text-pink-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                        {cartItemsCount}
                                    </span>
                            )}
                        </button>
                    </nav>
                </div>
            </header>

            {isMenuOpen && (
                <div className="md:hidden bg-pink-600 text-pink-50 p-4">
                    <nav className="flex flex-col space-y-2">
                        <a href="\inicio" className="hover:text-pink-200">Inicio</a>
                        <a href="\menu" className="hover:text-pink-200">Productos</a>
                        <a href="\seguimiento" className="hover:text-pink-200">Seguimiento</a>
                        <a href="\aboutUs" className="hover:text-pink-200">Nosotros</a>
                    </nav>
                </div>
            )}

            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-pink-800 mb-6">Nuestros Productos</h1>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search products..."
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
                        <option value="name">Name</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="vegan"
                            checked={showVegan}
                            onChange={(e) => setShowVegan(e.target.checked)}
                            className="mr-2"
                        />
                        <label htmlFor="vegan" className="text-pink-800">Vegan Options</label>
                    </div>
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
                                            ${parseFloat(product.PrecioProducto).toFixed(2)}
                                        </span>
                                        <button
                                            onClick={(e) => handleAddToCart(e, product)}
                                            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

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
    )
}
