import React from 'react';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-3">
                    <h1 className="text-xl font-semibold">Sweet Delights Bakery</h1>
                </div>
            </nav>

            <main>{children}</main>

            <footer className="bg-gray-800 text-white mt-8">
                <div className="container mx-auto px-4 py-3 text-center">
                    © 2023 Sweet Delights Bakery. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
