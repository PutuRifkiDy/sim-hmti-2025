import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Transition } from "@headlessui/react";
import { ArrowLeftIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Link, useForm, usePage } from "@inertiajs/react";
import { use, useEffect } from "react";
import { toast } from "sonner";

export default function Edit() {
    const period = usePage().props.period;
    const flash_message = usePage().props.flash_message;
    useEffect(() => {
        if (flash_message?.message) {
            toast[flash_message.type || 'success'](flash_message.message);
        }
    }, [flash_message]);
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        title: period.title ?? '' ,
        start_date: period.start_date ?? '',
        end_date: period.end_date ?? '',
        _method: 'PUT'
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(route('master-period.update', period.id), {
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
                            <h2 className="text-lg font-medium text-gray-900">Update Periode</h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Masukkan name periode, tanggal mulai dan tanggal selesai untuk update periode
                            </p>
                        </header>

                        <Button variant="blue" type="button" asChild>
                            <Link as="button" href={route('master-period.index')} className="flex flex-row items-center text-[14px] font-bold">
                                <ArrowLeftIcon className="w-3 h-3 mr-2 font-bold" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                    <form onSubmit={onHandleSubmit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="title" value="Nama Periode" />
                            <TextInput
                                id="title"
                                className="mt-1 block w-full"
                                value={data.title}
                                name="title"
                                type="text"
                                onChange={(e) => setData('title', e.target.value)}
                                required
                                isFocused
                                placeholder="Contoh: Kabinet Harmoni Bangga"
                                autoComplete="title"
                                onErrors={errors.title && <InputError message={errors.title} className="mt-2" />}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="start_date" value="Tanggal Mulai Periode" />
                            <TextInput
                                id="start_date"
                                className="mt-1 block w-full"
                                value={data.start_date}
                                name="start_date"
                                type="date"
                                onChange={(e) => setData('start_date', e.target.value)}
                                required
                                isFocused
                                autoComplete="start_date"
                                onErrors={errors.start_date && <InputError message={errors.start_date} className="mt-2" />}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="end_date" value="Tanggal Selesai Periode" />
                            <TextInput
                                id="end_date"
                                className="mt-1 block w-full"
                                value={data.end_date}
                                name="end_date"
                                type="date"
                                onChange={(e) => setData('end_date', e.target.value)}
                                required
                                isFocused
                                autoComplete="end_date"
                                onErrors={errors.end_date && <InputError message={errors.end_date} className="mt-2" />}
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

Edit.layout = (page) => <DashboardLayout children={page} title={"Edit Master Periode"} />;
