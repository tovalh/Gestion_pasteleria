export default function PaymentError({ error }) {
    return (
        <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-center">
            <div className="bg-red-100 p-6 rounded-lg text-center max-w-md w-full">
                <h1 className="text-2xl font-semibold text-red-700 mb-4">Error en el Pago</h1>
                <p className="text-red-600 mb-4">
                    Ocurrió un error durante el proceso de pago.
                </p>
                <div className="bg-white p-4 rounded-lg mb-6">
                    <p className="text-gray-600">{error}</p>
                </div>
                <a
                    href="/menu"
                    className="inline-flex items-center text-red-600 hover:text-red-700"
                >
                    <ArrowLeft className="w-5 h-5 mr-2"/>
                    Volver al menú
                </a>
            </div>
        </div>
    );
}
