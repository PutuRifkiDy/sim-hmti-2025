import { ImageUpload } from "@/Components/ImageUpload";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Transition } from "@headlessui/react";
import { ArrowLeftIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Edit() {
    const flash_message = usePage().props.flash_message;
    useEffect(() => {
        if (flash_message?.message) {
            toast[flash_message.type || 'success'](flash_message.message);
        }
    }, [flash_message]);
    const users = usePage().props.users;
    const { data, setData, processing, post, reset, errors, recentlySuccessful } = useForm({
        name: users.name ?? '',
        email: users.email ?? '',
        nim: users.nim ?? '',
        line_id: users.line_id ?? '',
        phone_number: users.phone_number ?? '',
        birthday: users.birthday ?? '',
        address: users.address ?? '',
        username: users.username ?? '',
        img_path: users.img_path ?? '',
        role: users.role ?? '',
        _method: 'PUT',
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        if (!(data.img_path instanceof File)) {
            delete data.img_path;
        }

        post(route('master-user.update', users.id), {
            onSuccess: (success) => {

            },
            preserveScroll: true,
            preserveState: true,
        });
    }

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };
    return (
        <>
            <div className="py-5">
                <div className="bg-white dark:bg-[#040529] p-4 shadow rounded-lg sm:p-8 flex flex-col gap-5 justify-between">
                    <div className='flex flex-row justify-between w-full'>
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">Update Mahasiswa</h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Update data mahasiswa di bawah ini
                            </p>
                        </header>

                        <Button variant="gold" type="button" asChild className="shadow-[0_0_15px_#ECBB4E]">
                            <Link as="button" href={route('master-user.index')} className="flex flex-row items-center text-[14px] font-bold">
                                <ArrowLeftIcon className="w-3 h-3 mr-2 font-bold" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
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
                                    // required
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
                                    // required
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
                                    // required
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
                                    // required
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
                                    // required
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
                                    // required
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
                                    // required
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
                                    // required
                                    placeholder="Masukkan username anda"
                                    autoComplete="username"
                                    onErrors={errors.username && <InputError message={errors.username} className='mt-2' />}
                                />

                            </div>

                            <div className='flex flex-col gap-2'>
                                <InputLabel htmlFor="img_path" value="Foto Diri" className='text-[12px] text-[#676767] font-normal dark:text-white ' />

                                <ImageUpload
                                    imagePath={users.img_path}
                                    onChangeImage={(file, previewUrl) => {
                                        setData("img_path", file);
                                        setPreview(previewUrl);
                                    }}
                                    errorMessage={errors.img_path}
                                />

                                {/* Input Image Incoming sajalah */}

                            </div>

                            <div className="flex flex-col gap-2">
                                <InputLabel htmlFor="role" value="Role" className="text-[12px] text-[#676767] font-normal dark:text-white" />

                                <Select
                                    value={data.role}
                                    onValueChange={(value) => setData("role", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="guest">Mahasiswa</SelectItem>
                                        <SelectItem value="divisi_it">Admin</SelectItem>
                                        <SelectItem value="ketua_kegiatan">Ketua Kegiatan</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.role && <InputError message={errors.role} className="mt-2" />}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="submit" variant="gold" disabled={processing} className="flex flex-row gap-2 justify-center items-center dark:bg-[#0F114C] shadow-[0_0_15px_#ECBB4E]">
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
                </div>
            </div>
        </>
    );
}

Edit.layout = (page) => <DashboardLayout children={page} title={"Edit Master User"} />;
