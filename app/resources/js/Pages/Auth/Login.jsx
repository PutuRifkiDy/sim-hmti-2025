import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import GuestLayout from '@/Layouts/GuestLayout';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const [viewPassword, setViewPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        nim: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    const toggleViewPassword = () => {
        setViewPassword(!viewPassword);
    };

    return (
        <div className="flex min-h-full w-full flex-1 flex-col items-center justify-center px-6 py-48 lg:px-8">
            <div className="flex w-full flex-row md:w-[900px]">
                <Card className="w-full rounded-l-lg rounded-r-none dark:bg-[#1f1f1f]">
                    <CardHeader className="flex flex-col items-center justify-center">
                        <p className="text-4xl font-black leading-relaxed tracking-tighter">
                            HMTI-<span className="text-red-500">NG</span>
                        </p>

                        <h2 className="text-center text-lg font-medium leading-relaxed tracking-tight text-muted-foreground">
                            Masuk ke akun anda untuk akses fitur yang tersedia
                        </h2>
                    </CardHeader>
                    <CardContent className="flex flex-row">
                        <div className="mb-6 mt-6 w-full">
                            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}
                            <form className="space-y-6" onSubmit={submit}>
                                {/* form */}
                                <div className="w-full">
                                    <InputLabel htmlFor="nim" value="NIM" />
                                    <TextInput
                                        id="nim"
                                        type="nim"
                                        name="nim"
                                        value={data.nim}
                                        className="mt-1 block w-full dark:bg-[#1f1f1f]"
                                        autoComplete="nim"
                                        isFocused={true}
                                        onChange={(e) => setData('nim', e.target.value)}
                                        onErrors={errors.nim && <InputError message={errors.nim} className="mt-2" />}
                                    />
                                </div>
                                <div className="relative w-full">
                                    <InputLabel htmlFor="password" value="Password" />
                                    <TextInput
                                        id="password"
                                        type={viewPassword == true ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full dark:bg-[#1f1f1f]"
                                        autoComplete="password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        onErrors={
                                            errors.password && <InputError message={errors.password} className="mt-2" />
                                        }
                                    />
                                    {viewPassword && (
                                        <EyeSlashIcon
                                            className="absolute right-3 top-10 h-6 w-6 cursor-pointer text-gray-600"
                                            onClick={toggleViewPassword}
                                        />
                                    )}
                                    {!viewPassword && (
                                        <EyeIcon
                                            className="absolute right-3 top-10 h-6 w-6 cursor-pointer text-gray-600"
                                            onClick={toggleViewPassword}
                                        />
                                    )}
                                </div>
                                <div className="mt-4 flex flex-row items-center justify-between gap-2">
                                    <label htmlFor="" className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                        />
                                        <span className="ms-2 text-sm text-muted-foreground">Ingat saya</span>
                                    </label>
                                    {canResetPassword && (
                                        <div className="mt-3 text-end text-sm">
                                            <Link
                                                href={route('password.request')}
                                                className="font-regular duration-400 text-[#4880FF] underline transition-all ease-in-out hover:text-[#4880FF]/80 hover:no-underline"
                                            >
                                                Lupa password?
                                            </Link>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <Button
                                        type="submit"
                                        variant="gold"
                                        className="w-full shadow-[0_0_15px_#ECBB4E]"
                                        disabled={processing}
                                    >
                                        Masuk
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </CardContent>
                </Card>
                <div className="hidden w-full items-center justify-center rounded-r-lg bg-[#000000] dark:bg-[#FFFFFF] md:flex">
                    <img src="/assets/icon/logo_hmti.png" target="_blank" className="h-[224px] w-[224px]" />
                </div>
            </div>
        </div>
    );
}

Login.layout = (page) => <GuestLayout children={page} title="Log in" />;
