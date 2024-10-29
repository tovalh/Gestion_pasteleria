import React, { useState } from 'react'
import {ShoppingCart, Menu, X, Menu as MenuIcon} from 'lucide-react'

export default function AboutUs() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div className="bg-[#F7F0E9] min-h-screen">
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
                    </nav>
                </div>
            </header>

            {isMenuOpen && (
                <div className="md:hidden bg-pink-600 text-pink-50 p-4">
                    <nav className="flex flex-col space-y-2">
                        <a href="\inicio" className="hover:text-pink-200">Inicio</a>
                        <a href="\menu" className="hover:text-pink-200">Productos</a>
                        <a href="\AboutUs" className="hover:text-pink-200">Nosotros</a>

                    </nav>
                </div>
            )}

            <main className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
                    <div>
                        <img
                            src="/placeholder.svg?height=400&width=600"
                            alt="Nuestra Pasteleria"
                            className="rounded-lg shadow-md w-full h-auto"
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-pink-700 mb-4">Nuestra Historia</h2>
                        <p className="text-gray-700 mb-4">
                            Dolce Mimi surgio por el amor que le tenemos a la pasteleria, queremos llegar a los estomagos de toda nuestra comunidad
                        </p>
                        <p className="text-gray-700 mb-4">
                            Nuestra mision es simple, Buenos precios, productos de calidad y que el cliente quede feliz.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8 mb-12">
                    <h2 className="text-2xl font-semibold text-pink-700 mb-4 text-center">Nuestros Valores</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-pink-600 mb-2">Calidad</h3>
                            <p className="text-gray-700">Ocupamos los mejores productos de la zona para preparar cada una de nuestras preparaciones</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-pink-600 mb-2">Creatividad</h3>
                            <p className="text-gray-700">Nos encanta traer a la comunidad productos nuevos y tendencias internacionales en el mundo de la pasteleria.</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-pink-600 mb-2">Comunidad</h3>
                            <p className="text-gray-700">Estamos orgullosos de pertenecer a nuestra comunidad y a entregarle la mejor calidad de productos a nuestros vecinos.</p>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-pink-700 mb-4 text-center">Conoce a nuestro equipo</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {['Grupo IT', 'Julieta Negrete', 'Ninoska Negrete'].map((name, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={`/placeholder.svg?height=300&width=300`}
                                    alt={name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-pink-700 mb-2">{name}</h3>
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

            <footer className="bg-pink-500 text-pink-50 py-8">
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
