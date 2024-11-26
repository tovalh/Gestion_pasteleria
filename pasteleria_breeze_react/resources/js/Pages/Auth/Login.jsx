import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="bg-[#F7F0E9] min-h-screen flex items-center justify-center">
            <Head title="Iniciar Sesión" />

            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                {status && (
                    <div className="mb-4 text-sm font-medium text-pink-600">
                        {status}
                    </div>
                )}

                <h2 className="text-3xl font-bold text-pink-800 mb-8 text-center">
                    Iniciar Sesión
                </h2>

                <form onSubmit={submit}>
                    <div>
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
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
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
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4 block">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                                className="border-pink-300 text-pink-600 focus:ring-pink-500"
                            />
                            <span className="ms-2 text-sm text-pink-600">
                                Recordarme
                            </span>
                        </label>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-pink-600 hover:text-pink-800 transition duration-300"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        )}

                        <button
                            className={`bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition duration-300 ${
                                processing && 'opacity-75'
                            }`}
                            disabled={processing}
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-pink-800 mb-4">¿No tienes una cuenta?</p>
                    <Link
                        href="/register"
                        className="inline-block bg-white text-pink-500 px-6 py-2 rounded-full border-2 border-pink-500 hover:bg-pink-500 hover:text-white transition duration-300"
                    >
                        Regístrate aquí
                    </Link>
                </div>
            </div>
        </div>
    );
}
