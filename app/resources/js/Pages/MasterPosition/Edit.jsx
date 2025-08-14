import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Transition } from "@headlessui/react";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function Edit() {
    const position = usePage().props.position;
    const master_positions = usePage().props.master_positions;
    const { data, setData, processing, post, reset, errors, recentlySuccessful } = useForm({
        title: position.title ?? '',
        parent_id: position.parent_id ?? '',
        _method: 'PUT'
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route('master-position.update', position.id), {
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
                            <h2 className="text-lg font-medium text-gray-900">Update Jabatan</h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Update data jabatan di bawah ini
                            </p>
                        </header>

                        <Button variant="gold" type="button" asChild>
                            <Link as="button" href={route('master-position.index')} className="flex flex-row items-center text-[14px] font-bold">
                                <ArrowLeftIcon className="w-3 h-3 mr-2 font-bold" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                    <form onSubmit={onHandleSubmit} className="mt-6 space-y-6">
                        <div className='grid grid-cols-1 gap-5'>
                            <div>
                                <InputLabel htmlFor="title" value="Nama Jabatan" />

                                <TextInput
                                    id="title"
                                    className="mt-1 block w-full"
                                    name="title"
                                    type="text"
                                    value={data.title}
                                    onChange={onHandleChange}
                                    required
                                    isFocused
                                    placeholder="Contoh: Orang Himpunan"
                                    autoComplete="title"
                                    onErrors={errors.title && <InputError message={errors.title} className='mt-2' />}
                                />

                            </div>
                            <div>
                                <InputLabel htmlFor="position_id" value="Jabatan Induk" />

                                <Select
                                    value={data.parent_id}
                                    onValueChange={(value) => setData('parent_id', value)}
                                    className="mt-1 block w-full rounded-[10px] border-[1px] border-[#818181] px-4 placeholder:text-[14px] placeholder:text-[#6F6F6F] dark:bg-[#040529] focus:border-none focus:ring-none"
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Jabatan" />
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-[#040529]">
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
                        </div>


                        <div className="flex items-center gap-4">
                            <Button type="submit" variant="gold" disabled={processing} className="flex flex-row gap-2 justify-center items-center dark:bg-[#0F114C]">
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

Edit.layout = (page) => <DashboardLayout children={page} title={"Edit Master Position"} />;
