import React from 'react'
import { Head } from "@inertiajs/react"
import Header from '../Components/Navbar.jsx'  // Import your header component
import Footer from '../Components/Footer'  // Import your footer component

export default function AboutUs() {
    return (
        <>
            <Head>
                <title>About us</title>
                <meta name="description" content="Bienvenidos a Dolci Mimi, tu pastelería artesanal" />
            </Head>
            <div className="bg-[#F7F0E9] min-h-screen">
                {/* Replace header with your component */}
                <Header />

                <main className="container mx-auto px-4 py-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
                        <div>
                            <img
                                src="/images/local.jpg"
                                alt="Nuestra Pasteleria"
                                className="rounded-lg shadow-md w-full h-auto"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-pink-700 mb-4">Nuestra Historia</h2>
                            <p className="text-gray-700 mb-4">
                                Dolce Mimi surgio por el amor que le tenemos a la pasteleria, queremos llegar a los
                                estomagos de toda nuestra comunidad
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
                                <p className="text-gray-700">Ocupamos los mejores productos de la zona para preparar cada
                                    una de nuestras preparaciones</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-pink-600 mb-2">Creatividad</h3>
                                <p className="text-gray-700">Nos encanta traer a la comunidad productos nuevos y tendencias
                                    internacionales en el mundo de la pasteleria.</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-pink-600 mb-2">Comunidad</h3>
                                <p className="text-gray-700">Estamos orgullosos de pertenecer a nuestra comunidad y a
                                    entregarle la mejor calidad de productos a nuestros vecinos.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-pink-700 mb-4 text-center">Conoce a nuestro equipo</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {name: 'Grupo IT', imageUrl: '/images/it.jpg'},
                                {name: 'Julieta Negrete', imageUrl: '/images/pastelera.jpg'},
                                {name: 'Ninoska Negrete', imageUrl: '/images/pastelera2.jpg'}
                            ].map((member, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img
                                        src={member.imageUrl}
                                        alt={member.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold text-pink-700 mb-2">{member.name}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-pink-100 rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-semibold text-pink-700 mb-4">Visitanos!</h2>
                        <p className="text-gray-700 mb-4">
                            Ven a experimentar las dulces delicias por ti mismo. Estamos abiertos de lunes a sábado, de 7 a. m. a 7 p. m.
                        </p>
                        <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded">
                            Contactanos
                        </button>
                    </div>
                </main>

                {/* Replace footer with your component */}
                <Footer />
            </div>
        </>
    )
}
