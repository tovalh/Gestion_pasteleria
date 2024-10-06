import React, { useState } from 'react'
import { ShoppingCart, Menu, X } from 'lucide-react'

export default function AboutUs() {
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
                        <a href="\productos" className="hover:text-pink-200">Menu</a>
                        <a href="\AboutUs" className="hover:text-pink-200">About</a>

                    </nav>
                    <button className="md:hidden" onClick={toggleMenu}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <ShoppingCart className="hidden md:block" size={24} />
                </div>
            </header>

            {isMenuOpen && (
                <div className="md:hidden bg-pink-600 text-pink-50 p-4">
                    <nav className="flex flex-col space-y-2">
                        <a href="\inicio" className="hover:text-pink-200">Home</a>
                        <a href="\productos" className="hover:text-pink-200">Menu</a>
                        <a href="\AboutUs" className="hover:text-pink-200">About</a>

                    </nav>
                </div>
            )}

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-pink-800 mb-6 text-center">About Sweet Delights Bakery</h1>

                <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
                    <div>
                        <img
                            src="/placeholder.svg?height=400&width=600"
                            alt="Our Bakery"
                            className="rounded-lg shadow-md w-full h-auto"
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-pink-700 mb-4">Our Story</h2>
                        <p className="text-gray-700 mb-4">
                            Sweet Delights Bakery was founded in 2010 by passionate bakers, Maria and John Smith. What started as a small family-run shop has grown into a beloved local institution, known for our commitment to quality ingredients and mouthwatering creations.
                        </p>
                        <p className="text-gray-700 mb-4">
                            Our mission is simple: to bring joy to our community through the art of baking. Every day, we strive to create delicious treats that not only satisfy your sweet tooth but also bring a smile to your face.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8 mb-12">
                    <h2 className="text-2xl font-semibold text-pink-700 mb-4 text-center">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-pink-600 mb-2">Quality</h3>
                            <p className="text-gray-700">We use only the finest, locally-sourced ingredients in all our baked goods.</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-pink-600 mb-2">Creativity</h3>
                            <p className="text-gray-700">We love experimenting with new flavors and designs to keep our offerings fresh and exciting.</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-pink-600 mb-2">Community</h3>
                            <p className="text-gray-700">We're proud to be a part of this community and strive to give back whenever we can.</p>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-pink-700 mb-4 text-center">Meet Our Team</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {['Maria Smith', 'John Smith', 'Emily Johnson'].map((name, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={`/placeholder.svg?height=300&width=300`}
                                    alt={name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-pink-700 mb-2">{name}</h3>
                                    <p className="text-gray-700">Master Baker</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-pink-100 rounded-lg p-8 text-center">
                    <h2 className="text-2xl font-semibold text-pink-700 mb-4">Visit Us Today!</h2>
                    <p className="text-gray-700 mb-4">
                        Come experience the sweet delights for yourself. We're open Monday through Saturday, 7am to 7pm.
                    </p>
                    <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded">
                        Contact Us
                    </button>
                </div>
            </main>

            <footer className="bg-pink-700 text-pink-50 py-8 mt-12">
                <div className="container mx-auto px-4 text-center">
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
