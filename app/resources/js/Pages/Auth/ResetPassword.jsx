import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex min-h-full w-full flex-1 flex-col items-center justify-center px-6 py-36 lg:px-8">
            <div className="flex w-full flex-row md:w-[900px]">
                <Card className="w-full rounded-l-lg rounded-r-none dark:bg-[#1f1f1f]">
                    <CardHeader className="flex flex-col items-center justify-center">
                        <p className="text-4xl font-black leading-relaxed tracking-tighter text-[#785233]">
                            HMTI-<span className="text-[#ECC067]">NG</span>
                        </p>

                        <h2 className="text-center text-lg font-medium leading-relaxed tracking-tight text-muted-foreground">
                            Buat password baru anda
                        </h2>
                    </CardHeader>
                    <CardContent className="flex flex-row">
                        <form onSubmit={submit} className="w-full">
                            <div>
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full dark:bg-[#1f1f1f]"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    onErrors={errors.email && <InputError message={errors.email} className="mt-2" />}
                                />


                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="password" value="Password" />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full dark:bg-[#1f1f1f]"
                                    autoComplete="new-password"
                                    isFocused={true}
                                    onChange={(e) => setData('password', e.target.value)}
                                    onErrors={errors.password && <InputError message={errors.password} className="mt-2" />}
                                />

                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                                <TextInput
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full dark:bg-[#1f1f1f]"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    onErrors={errors.password_confirmation && <InputError message={errors.password_confirmation} className="mt-2" />}
                                />

                            </div>

                            <div className="mt-4 flex items-center justify-end">
                                <Button className="w-full shadow-[0_0_10px_#ECBB4E]" variant="gold" disabled={processing}>
                                    Reset Password
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <div className="hidden w-full items-center justify-center rounded-r-lg bg-[#000000] dark:bg-[#FFFFFF] md:flex">
                    <img src="/assets/icon/logo_hmti.png" target="_blank" className="h-[224px] w-[224px]" />
                </div>
            </div>
        </div >
    );
}

ResetPassword.layout = (page) => <GuestLayout children={page} title={'Reset Password'} />;
