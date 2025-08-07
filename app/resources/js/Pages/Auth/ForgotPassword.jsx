import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>


            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Card>
                        <CardHeader className="flex flex-col items-center justify-center">
                            <Link href="/" className="text-4xl font-black leading-relaxed tracking-tighter">
                                HMTI-<span className="text-red-500">NG</span>
                            </Link>
                            <h2 className="text-left text-lg font-medium leading-relaxed tracking-tight text-muted-foreground">
                                Sign in to your account
                            </h2>
                        </CardHeader>
                        <CardContent>
                            <div className="mt-6 mb-6 sm:mx-auto sm:w-full sm:max-w-sm">
                                <div className="mb-4 text-sm text-gray-600">
                                    Forgot your password? No problem. Just let us know your email address and we will email you a password
                                    reset link that will allow you to choose a new one.
                                </div>

                                {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

                                <form onSubmit={submit}>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />

                                    <InputError message={errors.email} className="mt-2" />

                                    <div className="mt-4 flex items-center justify-end">
                                        <Button className="ms-4" variant="blue" disabled={processing}>
                                            Email Password Reset Link
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

ForgotPassword.layout = (page) => <GuestLayout children={page} title={"Forgot Password"} />
