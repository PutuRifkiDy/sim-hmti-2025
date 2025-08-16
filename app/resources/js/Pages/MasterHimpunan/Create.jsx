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
import { AutoComplete } from "primereact/autocomplete";
import { Chips } from "primereact/chips";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Create() {
    const flash_message = usePage().props.flash_message;
    const periode = usePage().props.periode;
    const master_positions = usePage().props.master_positions;
    const users = usePage().props.users;

    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);


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

    useEffect(() => {
        if (flash_message?.message) {
            toast[flash_message.type || 'success'](flash_message.message);
        }
    }, [flash_message]);
    const { data, setData, post, processing, errors, recentlySuccessful, reset, clearErrors } = useForm({
        user_id: [],
        position_id: '',
        period_id: periode.id,
        _method: 'POST'
    });

    const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

    useEffect(() => {
        if (isReadyToSubmit) {
            post(route('master-himpunan.store', { id: periode.id }), {
                ...data,
                preserveScroll: true,
                preserveState: true,
                onError: () => {
                    reset('user_id', 'position_id');
                    toast.error('Input tidak valid. Form telah direset. Silahkan isi kembali form ini.');
                }
            });
            setIsReadyToSubmit(false);
        }
    }, [data.user_id]);

    const onHandleSubmit = (e) => {
        e.preventDefault();

        setData('user_id', data.user_id.map((u) => u.value));
        setIsReadyToSubmit(true);
    };

    return (
        <>
            <div className="py-5">
                <div className="bg-white dark:bg-[#1F1F1F] p-4 shadow rounded-lg sm:p-8 flex flex-col gap-5 justify-between">
                    <div className='flex flex-row justify-between w-full'>
                        <header>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Tambah Fungsionaris</h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Masukkan name fungsionaris dan jabatan untuk membuat fungsionaris
                            </p>
                        </header>

                        <Button variant="gold" type="button" asChild className="shadow-[0_0_15px_#ECBB4E]">
                            <Link as="button" href={route('master-himpunan.index', { id: periode.id })} className="flex flex-row items-center text-[14px] font-bold">
                                <ArrowLeftIcon className="w-3 h-3 mr-2 font-bold" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                    <div className='mt-2 mb-10 grid md:grid-cols-3 grid-cols-1 gap-5'>
                        <div>
                            <InputLabel htmlFor="title" value="Periode" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                            <p>{periode.title ? periode.title : '-'}</p>
                        </div>
                        <div>
                            <InputLabel htmlFor="start_date" value="Tanggal Mulai" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                            <p>{periode.start_date ? periode.start_date : '-'}</p>
                        </div>
                        <div>
                            <InputLabel htmlFor="end_date" value="Tanggal Selesai" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                            <p>{periode.end_date ? periode.end_date : '-'}</p>
                        </div>
                    </div>
                    <form onSubmit={onHandleSubmit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="position_id" value="Jabatan" />

                            <Select
                                value={data.position_id}
                                onValueChange={(value) => setData('position_id', value)}
                                className="mt-1 block w-full rounded-[10px] border-[1px] border-[#818181] px-4 placeholder:text-[14px] placeholder:text-[#6F6F6F] dark:bg-[#101010] focus:border-none focus:ring-none"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Jabatan" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-[#101010]">
                                    {master_positions.map((position) => (
                                        <SelectItem key={position.id} value={String(position.id)}>
                                            {position.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <InputError
                                message={errors.position_id} className="mt- text-red-600" />

                        </div>

                        <div className="">
                            <InputLabel htmlFor="title" value="Nama Penjabat" />

                            <AutoComplete
                                multiple
                                field="label"
                                dropdown
                                value={data.user_id}
                                suggestions={items}
                                completeMethod={search}
                                onChange={(e) => {
                                    setData('user_id', e.value);
                                }}
                                placeholder="Input penjabat boleh lebih dari satu"
                                 className={`w-full ${errors.user_id ? 'p-invalid' : ''}`}
                            />
                            <InputError message={errors.user_id} className="mt-2 text-red-600" />
                        </div>



                        <div className="flex items-center gap-4">
                            <Button type="submit" variant="gold" disabled={processing} className="flex flex-row gap-2 justify-center items-center dark:bg-[#ECBB4E] shadow-[0_0_15px_#ECBB4E]">
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

Create.layout = (page) => <DashboardLayout children={page} title={"Create Master Sie"} />;
