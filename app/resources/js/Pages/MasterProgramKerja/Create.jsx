import { ImageUpload } from '@/Components/ImageUpload';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Transition } from '@headlessui/react';
import { ArrowLeftIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

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
        _method: 'POST',
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        if (!(data.img_path instanceof File)) {
            delete data.img_path;
        }

        post(route('master-program-kerja.store', { id: period.id }), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const dateFormat = (date_parameter) => {
        if (!date_parameter) return '-';

        const date = new Date(date_parameter);
        return date.toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    }
    return (
        <>
            <div className="py-5">
                <div className="flex flex-col justify-between gap-5 rounded-lg bg-white p-4 shadow dark:bg-[#1F1F1F] sm:p-8">
                    <div className="flex w-full flex-row justify-between">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Tambah Program Kerja</h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Masukkan judul, deskripsi, dan gambar program kerja
                            </p>
                        </header>

                        <Button variant="gold" type="button" asChild>
                            <Link
                                as="button"
                                href={route('master-himpunan.index', { id: period.id })}
                                className="group flex flex-row items-center text-[14px] font-bold shadow-[0_0_15px_#ECBB4E] dark:bg-[#ECBB4E] gap-1"
                            >
                                <ArrowLeftIcon className="transform transition-transform duration-300 group-hover:-translate-x-1 h-3 w-3 font-bold" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                    <div className="mb-10 mt-2 grid grid-cols-1 gap-5 md:grid-cols-3">
                        <div>
                            <InputLabel
                                htmlFor="title"
                                value="Periode"
                                className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
                            />
                            <p>{period.title ? period.title : '-'}</p>
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="start_date"
                                value="Tanggal Mulai"
                                className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
                            />
                            <p>{dateFormat(period.start_date)}</p>
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="end_date"
                                value="Tanggal Selesai"
                                className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
                            />
                            <p>{dateFormat(period.end_date)}</p>
                        </div>
                    </div>

                    <form onSubmit={onHandleSubmit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="title" value="Judul" />
                            <TextInput
                                id="title"
                                className="mt-1 block w-full dark:bg-[#1F1F1F]"
                                value={data.title}
                                name="title"
                                type="text"
                                onChange={(e) => setData('title', e.target.value)}
                                isFocused
                                autoComplete="title"
                                placeholder="contoh: Build IT 2025"
                                onErrors={errors.title && <InputError message={errors.title} className="mt-2" />}
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="description" value="Deskripsi" />
                            <TextInput
                                id="description"
                                className="mt-1 block w-full dark:bg-[#1F1F1F]"
                                value={data.description}
                                name="description"
                                type="text"
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="contoh: Build IT 2025 merupakan program kerja"
                                autoComplete="description"
                                onErrors={
                                    errors.description && <InputError message={errors.description} className="mt-2" />
                                }
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
                            <Button
                                type="submit"
                                variant="gold"
                                disabled={processing}
                                className="flex flex-row items-center justify-center gap-2 shadow-[0_0_15px_#ECBB4E] dark:bg-[#ECBB4E]"
                            >
                                Simpan
                                <CheckBadgeIcon className="h-6 w-6 text-white" />
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

Create.layout = (page) => <DashboardLayout children={page} title={'Create Master Program Kerja'} />;
