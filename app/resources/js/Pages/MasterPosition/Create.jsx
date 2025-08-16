import DashboardLayout from "@/Layouts/DashboardLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Transition } from "@headlessui/react";
import { ArrowLeftIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Input } from "postcss";
import { useEffect } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
export default function Create() {
    const master_positions = usePage().props.master_positions;
    const flash_message = usePage().props.flash_message;
    useEffect(() => {
        if (flash_message?.message) {
            toast[flash_message.type || 'success'](flash_message.message);
        }
    }, [flash_message]);
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        title: '',
        parent_id: '',
        _method: 'POST'
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(route('master-position.store'), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <>
            <div className="py-5">
                <div className="bg-white dark:bg-[#1F1F1F] p-4 shadow rounded-lg sm:p-8 flex flex-col gap-5 justify-between">
                    <div className='flex flex-row justify-between w-full'>
                        <header>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Tambah Jabatan</h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Masukkan name jabatan untuk membuat jabatan
                            </p>
                        </header>

                        <Button variant="gold" type="button" asChild className="shadow-[0_0_15px_#ECBB4E]">
                            <Link as="button" href={route('master-position.index')} className="flex flex-row items-center text-[14px] font-bold">
                                <ArrowLeftIcon className="w-3 h-3 mr-2 font-bold" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                    <form onSubmit={onHandleSubmit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="title" value="Nama Jabatan" />
                            <TextInput
                                id="title"
                                className="mt-1 block w-full dark:bg-[#1F1F1F]"
                                value={data.title}
                                name="title"
                                type="text"
                                onChange={(e) => setData('title', e.target.value)}
                                isFocused
                                placeholder="Contoh: Orang Himpunan"
                                autoComplete="title"
                                onErrors={errors.title && <InputError message={errors.title} className="mt-2" />}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="parent_id" value="Jabatan Induk" />
                            <Select
                                value={data.parent_id}
                                onValueChange={(value) => setData('parent_id', value)}
                                className="mt-1 block w-full rounded-[10px] border-[1px] border-[#818181] px-4 placeholder:text-[14px] placeholder:text-[#6F6F6F] focus:border-none focus:ring-none"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Jabatan Induk"  />
                                </SelectTrigger>
                                <SelectContent>
                                    {master_positions.map((position) => (
                                        <SelectItem key={position.id} value={String(position.id)}>
                                            {position.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.parent_id} className="mt- text-red-600" />
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
