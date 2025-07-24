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
export default function Create() {
    const flash_message = usePage().props.flash_message;
    useEffect(() => {
        if (flash_message?.message) {
            toast[flash_message.type || 'success'](flash_message.message);
        }
    }, [flash_message]);
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        sie_name: '',
        _method: 'POST'
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(route('master-sie.store'), {
            preserveScroll: true,
            preserveState: true,
        });
    };
    return (
        <>
            <div className="py-5">
                <div className="bg-white dark:bg-[#040529] p-4 shadow rounded-lg sm:p-8 flex flex-col gap-5 justify-between">
                    <div className='flex flex-row justify-between w-full'>
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">Tambah Sie</h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Masukkan name sie untuk membuat sie
                            </p>
                        </header>

                        <Button variant="blue" type="button" asChild>
                            <Link as="button" href={route('master-sie.index')} className="flex flex-row items-center text-[14px] font-bold">
                                <ArrowLeftIcon className="w-3 h-3 mr-2 font-bold" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                    <form onSubmit={onHandleSubmit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="sie_name" value="Nama Sie" />
                            <TextInput
                                id="sie_name"
                                className="mt-1 block w-full"
                                value={data.sie_name}
                                name="sie_name"
                                type="text"
                                onChange={(e) => setData('sie_name', e.target.value)}
                                required
                                isFocused
                                placeholder="Contoh: Keamanan Angkasa Raya"
                                autoComplete="sie_name"
                                onErrors={errors.sie_name && <InputError message={errors.sie_name} className="mt-2" />}
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

Create.layout = (page) => <DashboardLayout children={page} title={"Create Master Sie"} />;
