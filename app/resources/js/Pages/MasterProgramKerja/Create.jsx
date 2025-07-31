import { ImageUpload } from "@/Components/ImageUpload";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Transition } from "@headlessui/react";
import { ArrowLeftIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Create() {
    const flash_message = usePage().props.flash_message;
    const period = usePage().props.period;

    useEffect(() => {
        if (flash_message?.message) {
            toast[flash_message.type || 'success'](flash_message.message);
        }
    }, [flash_message]);

    const { data, setData, post, processing, errors, recentlySuccessful, reset, clearErrors } = useForm({
        title: '',
        description: '',
        img_path: '',
        period_id: period.id,
        _method: 'POST'
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        if (!(data.img_path instanceof File)) {
            delete data.img_path;
        }

        post(route('master-program-kerja.store', { id: period.id }), {
            preserveScroll: true,
            preserveState: true
        });
    }
    console.log(period);
    return (
        <>
            <div className="py-5">
                <div className="bg-white dark:bg-[#040529] p-4 shadow rounded-lg sm:p-8 flex flex-col gap-5 justify-between">
                    <div className='flex flex-row justify-between w-full'>
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">Tambah Fungsionaris</h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Masukkan name fungsionaris dan jabatan untuk membuat fungsionaris
                            </p>
                        </header>

                        <Button variant="blue" type="button" asChild>
                            <Link as="button" href={route('master-himpunan.index', { id: period.id })} className="flex flex-row items-center text-[14px] font-bold">
                                <ArrowLeftIcon className="w-3 h-3 mr-2 font-bold" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                    <div className='mt-2 mb-10 grid md:grid-cols-3 grid-cols-1 gap-5'>
                        <div>
                            <InputLabel htmlFor="title" value="period" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                            <p>{period.title ? period.title : '-'}</p>
                        </div>
                        <div>
                            <InputLabel htmlFor="start_date" value="Tanggal Mulai" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                            <p>{period.start_date ? period.start_date : '-'}</p>
                        </div>
                        <div>
                            <InputLabel htmlFor="end_date" value="Tanggal Selesai" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                            <p>{period.end_date ? period.end_date : '-'}</p>
                        </div>
                    </div>

                    <form onSubmit={onHandleSubmit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="title" value="Judul Program Kerja" />
                            <TextInput
                                id="title"
                                className="mt-1 block w-full"
                                value={data.title}
                                name="title"
                                type="text"
                                onChange={(e) => setData('title', e.target.value)}
                                required
                                isFocused
                                autoComplete="title"
                                placeholder="contoh: Build IT 2025"
                                onErrors={errors.title && <InputError message={errors.title} className="mt-2" />}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="description" value="Judul Program Kerja" />
                            <TextInput
                                id="description"
                                className="mt-1 block w-full"
                                value={data.description}
                                name="description"
                                type="text"
                                onChange={(e) => setData('description', e.target.value)}
                                required
                                placeholder="contoh: Build IT 2025 merupakan program kerja"
                                autoComplete="description"
                                onErrors={errors.description && <InputError message={errors.description} className="mt-2" />}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="img_path" value="Gambar Program Kerja" className="mt-2" />
                            <ImageUpload
                                imagePath={data.img_path}
                                onChangeImage={(file, previewUrl) => {
                                    setData('img_path', file);
                                    setPreview(previewUrl);
                                }}
                                errorMessage={errors.img_path}
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

Create.layout = (page) => <DashboardLayout children={page} title={"Create Master Program Kerja"} />;
