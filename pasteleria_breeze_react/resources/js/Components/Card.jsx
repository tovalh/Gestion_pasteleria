import React from 'react';

export function Card({ children }) {
    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            {children}
        </div>
    );
}

export function CardHeader({ children }) {
    return <div className="p-4 border-b border-gray-200 font-semibold">{children}</div>;
}

export function CardContent({ children }) {
    return <div className="p-4">{children}</div>;
}

export function CardFooter({ children }) {
    return <div className="p-4 border-t border-gray-200 text-sm text-gray-500">{children}</div>;
}
