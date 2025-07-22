import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Login({ status, canResetPassword }) {
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

    return (

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Card>
                    <CardHeader className="flex flex-col items-center justify-center">
                        <Link href="/" className="text-4xl font-black leading-relaxed tracking-tighter">
                            RifsTasks<span className="text-red-500">.</span>
                        </Link>
                        <h2 className="text-left text-lg font-medium leading-relaxed tracking-tight text-muted-foreground">
                            Sign in to your account
                        </h2>
                    </CardHeader>
                    <CardContent>
                        <div className="mt-6 mb-6 sm:mx-auto sm:w-full sm:max-w-sm">
                            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}
                            <form className="space-y-6" onSubmit={submit}>
                                {/* form */}
                                <div>
                                    <InputLabel htmlFor="nim" value="NIM" />
                                    <TextInput
                                        id="nim"
                                        type="nim"
                                        name="nim"
                                        value={data.nim}
                                        className="mt-1 block w-full"
                                        autoComplete="nim"
                                        isFocused={true}
                                        onChange={(e) => setData('nim', e.target.value)}
                                        onErrors={
                                            errors.nim && <InputError message={errors.nim} className="mt-2" />
                                        }
                                    />
                                </div>
                                <div>
                                    {/* <div className="flex items-center justify-between">
                                        <InputLabel htmlFor="password" value="Password" />
                                        {canResetPassword && (
                                            <div className="text-sm">
                                                <Link
                                                    href="#"
                                                    className="font-semibold text-red-500 hover:text-red-600"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            </div>
                                        )}
                                    </div> */}
                                    <div>
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            onErrors={
                                                errors.password && (
                                                    <InputError message={errors.password} className="mt-2" />
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 block">
                                    <label htmlFor="" className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                        />
                                        <span className="ms-2 text-sm text-muted-foreground">Remember me</span>
                                    </label>
                                </div>
                                <div>
                                    <Button type="submit" variant="blue" className="w-full" disabled={processing}>
                                        Sign in
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

Login.layout = (page) => <GuestLayout children={page} title="Log in" />;
