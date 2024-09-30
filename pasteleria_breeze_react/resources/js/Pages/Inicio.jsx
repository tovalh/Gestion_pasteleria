import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";


export default function Inicio({ products }) {
    return (
        <Layout>
            <Head title="Home"/>
            <div className="relative">
                <img src="/images/hero-cake.jpg" alt="Hero Cake" className="w-full h-64 object-cover"/>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">Sweet Delights Bakery</h1>
                </div>
                <button
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-2 rounded">
                    Explore Our Products
                </button>
            </div>

            <div className="container mx-auto mt-8 bg-pink-100">
                <h2 className="text-2xl font-bold mb-4">Our Delicious Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {products.map((product, index) => (
                        <div key={index} className="border p-4 rounded">
                            <h3 className="font-bold">{product.name}</h3>
                            <p>{product.description}</p>
                            <img src={product.img}/>
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
