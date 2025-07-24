import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Transition } from "@headlessui/react";
import { ArrowLeftIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Input } from "postcss";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Create() {
    // 1. input berupa angkatan
    // 2. input berupa nomer pertama
    // 3. input berupa nomer terakhir
    // misal angkatan yang di inputkan itu 23, nomor pertama itu 1, nomor terakhir itu 10, maka akan create data users dengan nim 2305551001 - 2305551010
    const flash_message = usePage().props.flash_message;
    useEffect(() => {
        if (flash_message?.message) {
            toast[flash_message.type || 'success'](flash_message.message);
        }
    }, [flash_message]);
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        angkatan: '',
        start: '',
        end: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('master-user.store'));
    };
    return (
        <>
            <div className="py-5">
                <div className="bg-white dark:bg-[#040529] p-4 shadow rounded-lg sm:p-8 flex flex-col gap-5 justify-between">
                    <div className='flex flex-row justify-between w-full'>
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">Tambah Pengguna</h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Masukkan angkatan, nomer pertama, dan nomer terakhir untuk membuat pengguna.
                            </p>
                        </header>

                        <Button variant="blue" type="button" asChild>
                            <Link as="button" href={route('master-user.index')} className="flex flex-row items-center text-[14px] font-bold">
                             <ArrowLeftIcon className="w-3 h-3 mr-2 font-bold" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="angkatan" value="Angkatan" />
                            <TextInput
                                id="angkatan"
                                className="mt-1 block w-full"
                                value={data.angkatan}
                                name="angkatan"
                                type="number"
                                onChange={(e) => setData('angkatan', e.target.value)}
                                required
                                isFocused
                                placeholder="Contoh: 23"
                                autoComplete="angkatan"
                                onErrors={errors.angkatan && <InputError message={errors.angkatan} className="mt-2" />}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="start" value="Nomer Pertama" />
                            <TextInput
                                id="start"
                                className="mt-1 block w-full"
                                value={data.start}
                                name="start"
                                type="number"
                                onChange={(e) => setData('start', e.target.value)}
                                required
                                isFocused
                                placeholder="Contoh: 1"
                                autoComplete="start"
                                onErrors={errors.start && <InputError message={errors.start} className="mt-2" />}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="end" value="Nomer Terakhir" />
                            <TextInput
                                id="end"
                                className="mt-1 block w-full"
                                value={data.end}
                                name="end"
                                type="number"
                                onChange={(e) => setData('end', e.target.value)}
                                required
                                isFocused
                                placeholder="Contoh: 10"
                                autoComplete="end"
                                onErrors={errors.end && <InputError message={errors.end} className="mt-2" />}
                            />
                        </div>

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
                </div>
            </div>
        </>
    );
}

Create.layout = (page) => <DashboardLayout children={page} title={"Master User"}/>;
