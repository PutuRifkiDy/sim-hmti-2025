import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/react';

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
            <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-24 lg:px-8">
                <div className="flex w-full flex-row md:w-[900px]">
                    <Card className="w-full rounded-l-lg rounded-r-none dark:bg-[#1f1f1f]">
                        <CardHeader className="flex flex-col items-center justify-center">
                            <p className="text-4xl font-black leading-relaxed tracking-tighter font-poppins text-[#785233]">
                                HMTI-<span className="text-[#ECC067]">NG</span>
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-6 mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                                <div className="mb-4 text-sm text-gray-600">
                                    {/* Forgot your password? No problem. Just let us know your email address and we will
                                    email you a password reset link that will allow you to choose a new one. */}
                                    Lupa password? Tidak masalah. Berikan kami alamat email anda dan kami akan mengirimkan anda email untuk mereset password.
                                </div>

                                {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

                                <form onSubmit={submit} className='mt-16'>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full dark:bg-[#1f1f1f]"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                        onErrors={errors.email && <InputError message={errors.email} className="mt-2" />}
                                    />



                                    <div className="mt-4 flex items-center justify-end">
                                        <Button
                                            className="w-full shadow-[0_0_15px_#ECBB4E]"
                                            variant="gold"
                                            disabled={processing}
                                        >
                                            Email Password Reset Link
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
        </>
    );
}

ForgotPassword.layout = (page) => <GuestLayout children={page} title={'Forgot Password'} />;
