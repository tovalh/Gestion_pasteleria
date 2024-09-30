import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";

export default function Inicio({ products }) {
    const scrollToProducts = () => {
        const productsSection = document.getElementById('products');
        productsSection.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Layout>
            <Head title="Productos"/>
            {/* Hero Section */}
            <div className="relative">
                <img src="/images/hero-cake.jpg" alt="Hero Cake" className="w-full h-64 object-cover"/>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">Sweet Delights Bakery</h1>
                </div>
                <button
                    onClick={scrollToProducts}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-2 rounded shadow-lg hover:bg-yellow-600 transition duration-300">
                    Explore Our Products
                </button>
            </div>

            {/* Products Section */}
            <div id="products" className="container mx-auto mt-8 bg-pink-100 p-6 rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-center">Our Delicious Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <div key={index}
                             className="border p-6 bg-white rounded-lg shadow hover:shadow-xl transition duration-300">
                            <img src={product.img} alt={product.name}
                                 className="w-full h-40 object-cover mb-4 rounded"/>
                            <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                            <p className="text-gray-600">{product.description}</p>
                            <button
                                className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300">
                                More Info / Buy
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p>123 Sweet Lane, Cookie Town, CA 90210</p>
                <p>Phone: (123) 456-7890</p>
                <p>Email: info@sweetdelightsbakery.com</p>
            </div>
        </Layout>
    );
}
