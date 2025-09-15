import { useState } from 'react';

export default function ProductImage({ src, alt, className = '', productName = '' }) {
    const [imageError, setImageError] = useState(false);
    
    // Generar imagen placeholder basada en el nombre del producto
    const getPlaceholderImage = (name) => {
        // Usar Lorem Picsum con seed basado en el nombre del producto para consistencia
        const seed = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        return `https://picsum.photos/seed/${seed}/400/300`;
    };
    
    // Función para manejar error de imagen
    const handleImageError = () => {
        setImageError(true);
    };
    
    // Función para determinar qué imagen mostrar
    const getImageSrc = () => {
        if (imageError || !src) {
            return getPlaceholderImage(productName || alt);
        }
        return src;
    };
    
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <img
                src={getImageSrc()}
                alt={alt}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={handleImageError}
                loading="lazy"
            />
            {imageError && (
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center">
                    <div className="text-center p-4">
                        <div className="text-4xl mb-2">🧁</div>
                        <p className="text-sm text-gray-600 font-medium">
                            {productName || alt}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}