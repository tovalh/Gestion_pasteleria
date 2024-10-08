import React, { useState } from 'react'
import { Head } from '@inertiajs/react';

// Import icons for the header
import { ShoppingCart, Menu, X } from 'lucide-react'

export default function ProductsSection({productos}) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [showVegan, setShowVegan] = useState(false)
    const [sortBy, setSortBy] = useState('name')
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {


        setIsMenuOpen(!isMenuOpen)
    }

    const filteredProducts = products
        .filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === 'All' || product.category === selectedCategory)
        )
        .sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name)
            if (sortBy === 'price-asc') return a.price - b.price
            if (sortBy === 'price-desc') return b.price - a.price
            return 0
        })

    return (
        <div className="bg-pink-50 min-h-screen">
            <header className="bg-pink-700 text-pink-50 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Sweet Delights Bakery</h1>
                    <nav className="hidden md:flex space-x-4">
                        <a href="\inicio" className="hover:text-pink-200">Home</a>
                        <a href="\menu" className="hover:text-pink-200">Menu</a>
                        <a href="\AboutUs" className="hover:text-pink-200">About</a>

                    </nav>
                    <button className="md:hidden" onClick={toggleMenu}>
                        {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                    </button>
                    <ShoppingCart className="hidden md:block" size={24}/>
                </div>
            </header>

            {isMenuOpen && (
                <div className="md:hidden bg-pink-600 text-pink-50 p-4">
                    <nav className="flex flex-col space-y-2">
                        <a href="\inicio" className="hover:text-pink-200">Home</a>
                        <a href="\menu" className="hover:text-pink-200">Menu</a>
                        <a href="\AboutUs" className="hover:text-pink-200">About</a>

                    </nav>
                </div>
            )}

            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-pink-800 mb-6">Our Products</h1>

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
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={`/placeholder.svg?height=200&width=300`}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-pink-800 mb-2">{product.name}</h2>
                                <p className="text-pink-600 mb-2">{product.category}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-pink-700">${product.price.toFixed(2)}</span>
                                    <button
                                        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <footer className="bg-pink-700 text-pink-50 py-8">
                <div className="container mx-auto text-center">
                    <p>&copy; 2023 Sweet Delights Bakery. All rights reserved.</p>
                    <div className="mt-4">
                        <a href="#" className="text-pink-200 hover:text-white mx-2">Privacy Policy</a>
                        <a href="#" className="text-pink-200 hover:text-white mx-2">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
