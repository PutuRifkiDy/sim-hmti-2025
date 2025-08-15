import { ImageUpload } from "@/Components/ImageUpload";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Transition } from "@headlessui/react";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link, useForm, usePage } from "@inertiajs/react";
import { AutoComplete } from "primereact/autocomplete";
import { useState } from "react";
import { toast } from "sonner";

export default function Edit() {
    const users = usePage().props.users;
    const himpunan = usePage().props.himpunan;
    const positions = usePage().props.positions;
    const flash_message = usePage().props.flash_message;
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        position_id: himpunan.position_id ?? '',
        period_id: himpunan.period_id ?? '',
        user_id: himpunan.user_id ?? '',
        img_himpunan_path: himpunan.img_himpunan_path ?? '',
        _method: 'PUT'
    });

    const [items, setItems] = useState([]);
    const [selectedUser, setSelectedUser] = useState(() => {
        const found = users?.find((user) => user.id == himpunan.user_id);
        return found ? {
            label: `${found.name} (${found.nim})`,
            value: found.id
        } : null;
    });
    const search = (event) => {
        const query = event.query.toLowerCase();
        const filtered = users
            .filter(user => user.name?.toLowerCase().includes(query) || user.nim.includes(query))
            .map(user => ({
                label: `${user.name} (${user.nim})`,
                value: user.id,
            }));
        setItems(filtered);
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();

        if (!(data.img_himpunan_path instanceof File)) {
            delete data.img_himpunan_path;
        }

        post(route('master-himpunan.update', { id: himpunan.id }), {
            preserveScroll: true,
            preserveState: true,
            onError: () => {
                reset('user_id', 'position_id');
                toast.error('Input tidak valid. Form telah direset.');
            },
        });
    };

    return (
        <>
            <div className="py-5">
                <div className="bg-white dark:bg-[#040529] p-4 shadow rounded-lg sm:p-8 flex flex-col gap-5 justify-between">
                    <div className='flex flex-row justify-between w-full'>
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">Edit Fungsionaris</h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Lakukan perubahan pada nama, jabatan, dan gambar fungsionaris
                            </p>
                        </header>

                        <Button variant="gold" type="button" asChild className="shadow-[0_0_15px_#ECBB4E]">
                            <Link as="button" href={route('master-himpunan.index', { id: himpunan.period_id })} className="flex flex-row items-center text-[14px] font-bold">
                                <ArrowLeftIcon className="w-3 h-3 mr-2 font-bold" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                    <form onSubmit={onHandleSubmit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="user_id" value="Penjabat" />
                            <AutoComplete
                                field="label"
                                suggestions={items}
                                completeMethod={search}
                                value={selectedUser}
                                onChange={(e) => {
                                    setSelectedUser(e.value);
                                    setData("user_id", e.value?.value ?? '');
                                }}
                                placeholder="Cari berdasarkan nama atau NIM"
                                className={`w-full ${errors.user_id ? 'p-invalid' : ''}`}
                            />
                            {errors.user_id && <InputError message={errors.user_id} className="mt-2 text-red-600" />}
                        </div>

                        <div>
                            <InputLabel htmlFor="position_id" value="Jabatan" />
                            <Select
                                defaultValue={data.position_id}
                                onValueChange={(value) => setData('position_id', value)}
                                className='mt-1 block w-full rounded-[10px] border-[1px] border-[#818181] px-4 placeholder:text-[14px] placeholder:text-[#6F6F6F] dark:bg-[#040529]'
                            >
                                <SelectTrigger>
                                    <SelectValue className='dark:bg-[#040529] bg-white'>
                                        {positions.find((position) => String(position.id) === String(data.position_id))?.title || 'Pilih Jabatan'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent className="dark:bg-[#040529]">
                                    {positions.map((position) => (
                                        <SelectItem key={position.id} value={String(position.id)}>
                                            {position.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.position_id && <small className="text-red-500">{errors.position_id}</small>}
                        </div>

                        <div>
                            <InputLabel htmlFor="img_himpunan_path" value={"Foto Fungsionaris"} />

                            <ImageUpload
                                imagePath={himpunan.img_himpunan_path}
                                onChangeImage={(file, previewUrl) => {
                                    setData("img_himpunan_path", file);
                                    setPreview(previewUrl);
                                }}
                                errorMessage={errors.img_himpunan_path}
                            />
                        </div>


                        {/* Submit */}
                        <Button
                            type="submit"
                            variant="gold"
                            disabled={processing}
                            className="shadow-[0_0_15px_#ECBB4E]"
                        >
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
                    </form>
                </div>
            </div >
        </>
    );
}

Edit.layout = (page) => <DashboardLayout children={page} title={"Edit Master Sie"} />
