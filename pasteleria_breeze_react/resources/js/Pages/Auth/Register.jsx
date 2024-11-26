import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="bg-[#F7F0E9] min-h-screen flex items-center justify-center">
            <Head title="Registro" />

            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-pink-800 mb-8 text-center">
                    Crear Cuenta
                </h2>

                <form onSubmit={submit}>
                    <div>
                        <InputLabel
                            htmlFor="name"
                            value="Nombre"
                            className="text-pink-800"
                        />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full border-pink-300 focus:border-pink-500 focus:ring-pink-500 rounded-md shadow-sm"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="email"
                            value="Email"
                            className="text-pink-800"
                        />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full border-pink-300 focus:border-pink-500 focus:ring-pink-500 rounded-md shadow-sm"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="password"
                            value="Contraseña"
                            className="text-pink-800"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full border-pink-300 focus:border-pink-500 focus:ring-pink-500 rounded-md shadow-sm"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirmar Contraseña"
                            className="text-pink-800"
                        />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full border-pink-300 focus:border-pink-500 focus:ring-pink-500 rounded-md shadow-sm"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            className={`w-full bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition duration-300 ${
                                processing && 'opacity-75'
                            }`}
                            disabled={processing}
                        >
                            Crear Cuenta
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-pink-800 mb-4">¿Ya tienes una cuenta?</p>
                        <Link
                            href={route('login')}
                            className="inline-block bg-white text-pink-500 px-6 py-2 rounded-full border-2 border-pink-500 hover:bg-pink-500 hover:text-white transition duration-300"
                        >
                            Iniciar Sesión
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
