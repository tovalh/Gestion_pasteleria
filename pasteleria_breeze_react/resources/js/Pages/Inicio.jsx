import { useState } from 'react'
import { ShoppingCart, Menu, X } from 'lucide-react'

export default function Component() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

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
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                    <ShoppingCart className="hidden md:block" />
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

            <main>
                <section className="bg-pink-200 py-20">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold text-pink-800 mb-4">Welcome to Sweet Delights</h2>
                        <p className="text-xl text-pink-700 mb-8">Indulge in our freshly baked goods made with love</p>
                        <button className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition duration-300">
                            Order Now
                        </button>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-pink-800 mb-8 text-center">Featured Products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {['Strawberry Cupcake', 'Rose Macarons', 'Cherry Blossom Cake'].map((product) => (
                                <div key={product} className="bg-white p-6 rounded-lg shadow-md">
                                    <img
                                        src={`/placeholder.svg?height=200&width=300`}
                                        alt={product}
                                        className="w-full h-48 object-cover mb-4 rounded"
                                    />
                                    <h3 className="text-xl font-semibold text-pink-800 mb-2">{product}</h3>
                                    <p className="text-pink-600 mb-4">Delicious {product.toLowerCase()} made fresh daily</p>
                                    <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-300">
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

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
