import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { use, useRef, useState } from 'react';
import DeleteUserForm from './DeleteUserForm';
import { CheckBadgeIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { flashMessage } from '@/lib/utils';
import { toast } from 'sonner';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const user = usePage().props.auth.user;
    const [viewPassword, setViewPassword] = useState(false);
    const [viewPassword2, setViewPassword2] = useState(false);
    const [viewPassword3, setViewPassword3] = useState(false);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleViewPassword = () => {
        setViewPassword(!viewPassword);
    }

    const handleViewPassword2 = () => {
        setViewPassword2(!viewPassword2);
    }

    const handleViewPassword3 = () => {
        setViewPassword3(!viewPassword3);
    }

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);

                reset();
            },
            preserveScroll: true,
            preserveState: true,
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-200">Pengaturan Akun</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 md:w-[400px] w-full">
                    Pastikan akun anda menggunakan kata sandi yang panjang dan acak untuk tetap aman.
                </p>
            </header>

            <div className="mt-6 flex md:flex-row flex-col-reverse justify-between">
                <div className='w-full flex flex-col justify-end'>
                    <DeleteUserForm />
                </div>

                <form onSubmit={updatePassword} className='w-full'>

                    <div className='w-full flex flex-col gap-5'>
                        <div className='relative'>
                            <InputLabel htmlFor="current_password" value="Password Sekarang" className='text-[12px] text-[#676767] font-normal dark:text-white' />

                            <TextInput
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                type={viewPassword == true ? "text" : "password"}
                                className="mt-1 block w-full"
                                isFocused
                                autoComplete="current-password"
                                onErrors={errors.current_password && <InputError message={errors.current_password} className='mt-2' />}
                            />
                            {viewPassword == true ? (
                                <EyeSlashIcon
                                    onClick={handleViewPassword}
                                    className="absolute right-4 top-[2.8rem] h-5 w-5 -translate-y-1/2 cursor-pointer text-[#6F6F6F]"
                                />
                            ) : (
                                <EyeIcon
                                    onClick={handleViewPassword}
                                    className="absolute right-4 top-[2.8rem] h-5 w-5 -translate-y-1/2 cursor-pointer text-[#6F6F6F]"
                                />
                            )}

                        </div>

                        <div className='relative'>
                            <InputLabel htmlFor="password" value="Password Baru" className='text-[12px] text-[#676767] font-normal dark:text-white' />

                            <TextInput
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type={viewPassword2 == true ? "text" : "password"}
                                className="mt-1 block w-full"
                                isFocused
                                autoComplete="new-password"
                                onErrors={errors.password && <InputError message={errors.password} className='mt-2' />}
                            />

                            {viewPassword2 == true ? (
                                <EyeSlashIcon
                                    onClick={handleViewPassword2}
                                    className="absolute right-4 top-[2.8rem] h-5 w-5 -translate-y-1/2 cursor-pointer text-[#6F6F6F]"
                                />
                            ) : (
                                <EyeIcon
                                    onClick={handleViewPassword2}
                                    className="absolute right-4 top-[2.8rem] h-5 w-5 -translate-y-1/2 cursor-pointer text-[#6F6F6F]"
                                />
                            )}

                        </div>

                        <div className='relative'>
                            <InputLabel htmlFor="password_confirmation" value="Password Konfirmasi" className='text-[12px] text-[#676767] font-normal dark:text-white' />

                            <TextInput
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type={viewPassword3 == true ? "text" : "password"}
                                className="mt-1 block w-full"
                                isFocused
                                autoComplete="new-password"
                                onErrors={errors.password_confirmation && <InputError message={errors.password_confirmation} className='mt-2' />}
                            />

                            {viewPassword3 == true ? (
                                <EyeSlashIcon
                                    onClick={handleViewPassword3}
                                    className="absolute right-4 top-[2.8rem] h-5 w-5 -translate-y-1/2 cursor-pointer text-[#6F6F6F]"
                                />
                            ) : (
                                <EyeIcon
                                    onClick={handleViewPassword3}
                                    className="absolute right-4 top-[2.8rem] h-5 w-5 -translate-y-1/2 cursor-pointer text-[#6F6F6F]"
                                />
                            )}

                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant="blue" disabled={processing} className="flex flex-row gap-2 justify-center items-center dark:bg-[#0F114C]">
                                Simpan
                                <CheckBadgeIcon className='w-6 h-6 text-white' />
                            </Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">Telah Disimpan.</p>
                            </Transition>
                        </div>
                    </div>

                </form>
            </div>
        </section>
    );
}
