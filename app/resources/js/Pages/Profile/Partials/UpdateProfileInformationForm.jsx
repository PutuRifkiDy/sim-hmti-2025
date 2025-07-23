import { CancelUpdateProfile, IconEditForDashboard, IconPreviewImageProfile } from '@/Components/IconAdmin';
import { ImageUpload } from '@/Components/ImageUpload';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { flashMessage } from '@/lib/utils';
import { Transition } from '@headlessui/react';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;
    const [updateProfileInformation, setUpdateProfileInformation] = useState(false);

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: user.name ?? '',
        email: user.email ?? '',
        nim: user.nim,
        line_id: user.line_id ?? '',
        phone_number: user.phone_number ?? '',
        birthday: user.birthday ?? '',
        address: user.address ?? '',
        username: user.username ?? '',
        img_path: user.img_path ?? '',
        _method: 'PUT',
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        if (!(data.img_path instanceof File)) {
            delete data.img_path;
        }
        post(route('profile.update'), {
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    return (
        <section className={className}>
            <div className='flex flex-row justify-between w-full'>
                <header>
                    <h2 className="text-lg font-medium text-gray-900">Informasi Pengguna</h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Update informasi pengguna dan alamat email akun Anda.
                    </p>
                </header>
                {updateProfileInformation == false && (
                    <Button className='flex justify-center items-center gap-3 dark:bg-[#0F114C]' variant="blue" onClick={() => setUpdateProfileInformation(true)}>
                        <IconEditForDashboard />
                        Edit
                    </Button>
                )}
                {updateProfileInformation == true && (
                    <Button className='flex justify-center items-center gap-3 border-[#0F114C] border-2 text-[#0F114C] dark:border-[#0F114C] dark:text-white p-3' variant="none" onClick={() => setUpdateProfileInformation(false)}>
                        <CancelUpdateProfile />
                        Batal
                    </Button>
                )}
            </div>

            {updateProfileInformation == true && (
                <form onSubmit={onHandleSubmit} className="mt-6 space-y-6">
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                        <div>
                            <InputLabel htmlFor="nim" value="NIM" />

                            <TextInput
                                id="nim"
                                className="mt-1 block w-full"
                                name="nim"
                                type="text"
                                value={data.nim}
                                onChange={onHandleChange}
                                required
                                isFocused
                                placeholder="Masukkan nim anda"
                                autoComplete="nim"
                                onErrors={errors.nim && <InputError message={errors.nim} className='mt-2' />}
                            />

                        </div>

                        <div>
                            <InputLabel htmlFor="name" value="Nama" />

                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                name="name"
                                type="text"
                                value={data.name}
                                onChange={onHandleChange}
                                required
                                placeholder="Masukkan nama anda"
                                autoComplete="name"
                                onErrors={errors.name && <InputError message={errors.name} className='mt-2' />}
                            />

                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                name="email"
                                value={data.email}
                                onChange={onHandleChange}
                                required
                                placeholder="Masukkan email anda"
                                autoComplete="email"
                                onErrors={errors.email && <InputError message={errors.email} className='mt-2' />}
                            />

                        </div>

                        <div>
                            <InputLabel htmlFor="line_id" value="ID Line" />

                            <TextInput
                                id="line_id"
                                className="mt-1 block w-full"
                                type="text"
                                name="line_id"
                                value={data.line_id}
                                onChange={onHandleChange}
                                required
                                placeholder="Masukkan id line anda"
                                autoComplete="id_line"
                                onErrors={errors.line_id && <InputError message={errors.line_id} className='mt-2' />}
                            />

                        </div>

                        <div>
                            <InputLabel htmlFor="phone_number" value="Nomor Telepon" />

                            <TextInput
                                id="phone_number"
                                className="mt-1 block w-full"
                                name="phone_number"
                                type="text"
                                value={data.phone_number}
                                onChange={onHandleChange}
                                required
                                placeholder="Masukkan nomor telepon anda"
                                autoComplete="phone_number"
                                onErrors={errors.phone_number && <InputError message={errors.phone_number} className='mt-2' />}
                            />

                        </div>

                        <div>
                            <InputLabel htmlFor="birthday" value="Tanggal Lahir" />

                            <TextInput
                                id="birthday"
                                className="mt-1 block w-full"
                                name="birthday"
                                type="date"
                                value={data.birthday}
                                onChange={onHandleChange}
                                required
                                placeholder="Masukkan tanggal lahir anda"
                                autoComplete="birthday"
                                onErrors={errors.birthday && <InputError message={errors.birthday} className='mt-2' />}
                            />

                        </div>

                        <div>
                            <InputLabel htmlFor="address" value="Alamat" />

                            <TextInput
                                id="address"
                                className="mt-1 block w-full"
                                name="address"
                                type="text"
                                value={data.address}
                                onChange={onHandleChange}
                                required
                                placeholder="Masukkan alamat anda"
                                autoComplete="address"
                                onErrors={errors.address && <InputError message={errors.address} className='mt-2' />}
                            />

                        </div>

                        <div>
                            <InputLabel htmlFor="username" value="Username" />

                            <TextInput
                                id="username"
                                className="mt-1 block w-full"
                                name="username"
                                type="text"
                                value={data.username}
                                onChange={onHandleChange}
                                required
                                placeholder="Masukkan username anda"
                                autoComplete="username"
                                onErrors={errors.username && <InputError message={errors.username} className='mt-2' />}
                            />

                        </div>

                        <div className='flex flex-col gap-2'>
                            <InputLabel htmlFor="img_path" value="Foto Diri" className='text-[12px] text-[#676767] font-normal dark:text-white ' />

                            <ImageUpload
                                imagePath={user.img_path}
                                onChangeImage={(file, previewUrl) => {
                                    setData("img_path", file);
                                    setPreview(previewUrl);
                                }}
                                errorMessage={errors.img_path}
                            />

                            {/* Input Image Incoming sajalah */}

                        </div>
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="mt-2 text-sm text-gray-800">
                                Your email address is unverified.
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Click here to re-send the verification email.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 text-sm font-medium text-green-600">
                                    A new verification link has been sent to your email address.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <Button type="submit" variant="blue" disabled={processing} className="flex flex-row gap-2 justify-center items-center dark:bg-[#0F114C]">
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
                </form>
            )}

            {updateProfileInformation == false && (
                <div className='mt-10 grid md:grid-cols-2 grid-cols-1 gap-5'>
                    <div>
                        <InputLabel htmlFor="nim" value="NIM" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                        <p>{data.nim}</p>
                    </div>
                    <div>
                        <InputLabel htmlFor="name" value="Nama" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                        <p>{data.name ? data.name : '-'}</p>
                    </div>
                    <div>
                        <InputLabel htmlFor="email" value="Email" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                        <p>{data.email ? data.email : '-'}</p>
                    </div>
                    <div>
                        <InputLabel htmlFor="line_id" value="ID Line" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                        <p>{data.line_id ? data.line_id : '-'}</p>
                    </div>
                    <div>
                        <InputLabel htmlFor="phone_number" value="Nomor Telepon" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                        <p>{data.phone_number ? data.phone_number : '-'}</p>
                    </div>
                    <div>
                        <InputLabel htmlFor="birthday" value="Tanggal Lahir" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                        <p>{data.birthday ? data.birthday : '-'}</p>
                    </div>
                    <div>
                        <InputLabel htmlFor="address" value="Alamat" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                        <p>{data.address ? data.address : '-'}</p>
                    </div>
                    <div>
                        <InputLabel htmlFor="username" value="Username" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                        <p>{data.username ? data.username : '-'}</p>
                    </div>
                    <div>
                        <Dialog>
                            <DialogTrigger className='flex flex-row gap-3 justify-center items-center '>
                                <p className='text-[#676767] text-[14px] dark:text-gray-400'>Foto Profile</p>
                                <IconPreviewImageProfile />
                            </DialogTrigger>
                            <DialogContent>
                                <DialogTitle>
                                    Foto Profile
                                </DialogTitle>
                                <img src={user.img_path ? user.img_path : 'assets/images/default_image_profile.png'} className="h-64 w-auto" alt="" />
                                <a href={user.img_path ? user.img_path : 'assets/images/default_image_profile.png'} target="_blank" rel="noopener noreferrer" className='text-center'>Buka dalam Tab Baru</a>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            )}
        </section>
    );
}
