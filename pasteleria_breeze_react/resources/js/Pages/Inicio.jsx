import { useState } from 'react';
import { ShoppingCart, Menu as MenuIcon, X } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import CartComponent from '../Components/CartComponent';

export default function Inicio() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cartItemsCount } = useCart();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <div className="bg-[#F7F0E9] min-h-screen">
            <header className="bg-pink-500 text-pink-50 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <a href="/inicio" className="text-2xl font-bold">Dolci Mimi</a>
                    <nav className="hidden md:flex space-x-6">
                        <a href="/inicio" className="hover:text-pink-200">Inicio</a>
                        <a href="/menu" className="hover:text-pink-200">Productos</a>
                        <a href="/aboutUs" className="hover:text-pink-200">Nosotros</a>
                        <button className="md:hidden" onClick={toggleMenu}>
                            {isMenuOpen ? <X /> : <MenuIcon />}
                        </button>
                        <ShoppingCart className="hidden md:block" onClick={toggleCart} />
                    </nav>
                </div>
            </header>

            {isMenuOpen && (
                <div className="md:hidden bg-pink-600 text-pink-50 p-4">
                    <nav className="flex flex-col space-y-2">
                        <a href="/inicio" className="hover:text-pink-200">Inicio</a>
                        <a href="/menu" className="hover:text-pink-200">Productos</a>
                        <a href="/aboutUs" className="hover:text-pink-200">Nosotros</a>
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
                        <a href="/menu" className="hover:text-pink-200">
                            <button
                                className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition duration-300">
                                Explora nuestros productos
                            </button>
                        </a>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold text-pink-800 mb-8 text-center">Nuestros deliciosos productos</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-4">
                            {/* Aquí se listan los productos, puedes reemplazarlo con datos de la base de datos */}
                            {['Cupcake de Fresa', 'Macarons de Rosa', 'Pastel de Cereza'].map((product, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                                    <img
                                        src={`/placeholder.svg?height=200&width=300`}
                                        alt={product}
                                        className="w-full h-48 object-cover mb-4 rounded"
                                    />
                                    <h3 className="text-xl font-semibold text-pink-800 mb-2">{product}</h3>
                                    <p className="text-pink-600 mb-4">Delicious {product.toLowerCase()} made fresh daily</p>
                                    <a href="/Producto">
                                        <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-300">
                                            Ver Producto
                                        </button>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-pink-500 text-pink-50 py-8">
                <div className="container mx-auto text-center">
                    <p>&copy; 2023 Dolci Mimi. Todos los derechos reservados.</p>
                    <div className="mt-4">
                        <a href="#" className="text-pink-200 hover:text-white mx-2">Política de Privacidad</a>
                        <a href="#" className="text-pink-200 hover:text-white mx-2">Términos de Servicio</a>
                    </div>
                </div>
            </footer>

            {isCartOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
                    <div className="bg-white w-full max-w-md h-full overflow-y-auto">
                        <div className="p-4">
                            <button onClick={toggleCart} className="mb-4">
                                <X />
                            </button>
                            <CartComponent />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
