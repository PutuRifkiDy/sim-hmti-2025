import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Transition } from "@headlessui/react";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function Edit() {
    const sie = usePage().props.sie;
    const {data, setData, processing, post, reset, errors, recentlySuccessful} = useForm({
        sie_name: sie.sie_name ?? '',
        _method: 'PUT'
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route('master-sie.update', sie.id), {
            preserveScroll: true,
            preserveState: true,
        });
    }

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    }
    return (

        <>
            <div className="py-5">
                <div className="bg-white dark:bg-[#040529] p-4 shadow rounded-lg sm:p-8 flex flex-col gap-5 justify-between">
                    <div className='flex flex-row justify-between w-full'>
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">Update Sie</h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Update data sie di bawah ini
                            </p>
                        </header>

                        <Button variant="blue" type="button" asChild>
                            <Link as="button" href={route('master-sie.index')} className="flex flex-row items-center text-[14px] font-bold">
                                <ArrowLeftIcon className="w-3 h-3 mr-2 font-bold" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                    <form onSubmit={onHandleSubmit} className="mt-6 space-y-6">
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                            <div>
                                <InputLabel htmlFor="sie_name" value="Nama Sie" />

                                <TextInput
                                    id="sie_name"
                                    className="mt-1 block w-full"
                                    name="sie_name"
                                    type="text"
                                    value={data.sie_name}
                                    onChange={onHandleChange}
                                    required
                                    isFocused
                                    placeholder="Masukkan sie_name anda"
                                    autoComplete="sie_name"
                                    onErrors={errors.sie_name && <InputError message={errors.sie_name} className='mt-2' />}
                                />

                            </div>
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

Edit.layout = (page) => <DashboardLayout children={page} title={"Edit Master Sie"} />;
