import { ImageUpload } from "@/Components/ImageUpload";
import InputError from "@/Components/InputError";
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
        title: period.title ?? '',
        start_date: period.start_date ?? '',
        end_date: period.end_date ?? '',
        anggaran_dasar: period.anggaran_dasar ?? '',
        anggaran_rumah_tangga: period.anggaran_rumah_tangga ?? '',
        agenda_khusus: period.agenda_khusus ?? '',
        youtube_link: period.youtube_link ?? '',
        cover_path: period.cover_path ?? '',
        _method: 'PUT'
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        if (!(data.cover_path instanceof File)) {
            delete data.cover_path;
        }
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
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

                            <div>
                                <InputLabel htmlFor="anggaran_dasar" value="Anggaran Dasar " />
                                <TextInput
                                    id="anggaran_dasar"
                                    className="mt-1 block w-full"
                                    value={data.anggaran_dasar}
                                    name="anggaran_dasar"
                                    type="text"
                                    onChange={(e) => setData('anggaran_dasar', e.target.value)}
                                    required
                                    isFocused
                                    placeholder="Link google drive"
                                    autoComplete="anggaran_dasar"
                                    onErrors={errors.anggaran_dasar && <InputError message={errors.anggaran_dasar} className="mt-2" />}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="anggaran_rumah_tangga" value="Anggaran Rumah Tangga" />
                                <TextInput
                                    id="anggaran_rumah_tangga"
                                    className="mt-1 block w-full"
                                    value={data.anggaran_rumah_tangga}
                                    name="anggaran_rumah_tangga"
                                    type="text"
                                    onChange={(e) => setData('anggaran_rumah_tangga', e.target.value)}
                                    required
                                    isFocused
                                    placeholder="Link google drive"
                                    autoComplete="anggaran_rumah_tangga"
                                    onErrors={errors.anggaran_rumah_tangga && <InputError message={errors.anggaran_rumah_tangga} className="mt-2" />}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="agenda_khusus" value="Anggaran Khusus" />
                                <TextInput
                                    id="agenda_khusus"
                                    className="mt-1 block w-full"
                                    value={data.agenda_khusus}
                                    name="agenda_khusus"
                                    type="text"
                                    onChange={(e) => setData('agenda_khusus', e.target.value)}
                                    required
                                    isFocused
                                    placeholder="Link google drive"
                                    autoComplete="agenda_khusus"
                                    onErrors={errors.agenda_khusus && <InputError message={errors.agenda_khusus} className="mt-2" />}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="youtube_link" value="Link Youtube" />
                                <TextInput
                                    id="youtube_link"
                                    className="mt-1 block w-full"
                                    value={data.youtube_link}
                                    name="youtube_link"
                                    type="text"
                                    onChange={(e) => setData('youtube_link', e.target.value)}
                                    required
                                    isFocused
                                    placeholder="Link embed youtube"
                                    autoComplete="youtube_link"
                                    onErrors={errors.youtube_link && <InputError message={errors.youtube_link} className="mt-2" />}
                                />
                            </div>
                        </div>

                        <ImageUpload
                            imagePath={period.cover_path}
                            onChangeImage={(file, previewUrl) => {
                                setData("cover_path", file);
                                setPreview(previewUrl);
                            }}
                            errorMessage={errors.cover_path}
                        />

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
