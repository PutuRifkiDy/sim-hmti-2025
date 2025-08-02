import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Transition } from "@headlessui/react";
import { ArrowLeftIcon, CheckBadgeIcon, ClockIcon } from "@heroicons/react/24/solid";
import { Link, useForm, usePage } from "@inertiajs/react";
import DOMPurify from 'dompurify';
import { Editor } from "primereact/editor";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Show() {
    const oprec = usePage().props.oprec;
    const sies = usePage().props.sies;
    const user = usePage().props.user;
    const oprec_regist = usePage().props.oprec_regist;

    const flash_message = usePage().props.flash_message;
    useEffect(() => {
        if (flash_message?.message) {
            toast[flash_message.type || 'success'](flash_message.message);
        }
    }, [flash_message]);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        reason_join: '',
        experience: '',
        sie_id: '',
        oprec_id: oprec.id,
        user_id: user.id,
        _method: 'POST'
    });


    const cleanDescription = DOMPurify.sanitize(oprec.description);
    console.log("Oprec:", oprec);
    console.log("Sies:", sies);
    console.log("User:", user);

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route('oprec-regist.store'), {
            preserveScroll: true,
            preserveState: true,
        });
    }

    return (
        <div className="py-5">
            <div className="bg-white dark:bg-[#040529] p-4 shadow rounded-lg sm:p-8 flex flex-col gap-5 justify-between">
                {user.already_filled == false && (
                    <div className="flex gap-2 px-4 py-2 border-l-4 border-l-[#0F114C] dark:border-l-[#55b1d7] bg-[#0F114C]/20 dark:bg-[#55b1d7]/20 w-full items-center mb-5">
                        <ClockIcon className="shrink-0 h-5 w-5 text-[#0F114C] dark:text-white" />
                        <p className='text-[#0F114C] font-medium text-[12px] leading-[16px] dark:text-white'>
                            Lengkapi profil anda terlebih dahulu sebelum mendaftar kegiatan.
                        </p>
                    </div>
                )}
                <div className='flex flex-row w-full'>


                    <Button variant="blue" type="button" asChild>
                        <Link as="button" href={route('oprec-regist.index')} className="flex flex-row items-center text-[14px] font-bold">
                            <ArrowLeftIcon className="w-3 h-3 mr-2 font-bold" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <div className="flex md:flex-row flex-col w-[100%] gap-10">
                    <div className="w-[40%]">
                        <img src={oprec.poster_path} alt="Poster Oprec" className="w-full h-auto" />
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: cleanDescription }} className="w-[60%]" />
                </div>

                <div className='flex flex-row justify-between w-full mt-10'>
                    <header>
                        <h2 className="text-lg font-medium text-gray-900">Pendaftaran Open Rekruitmen</h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Lengkapi form pendaftaran di bawah ini untuk mengikuti kegiatan tersebut.
                        </p>
                    </header>
                </div>

                <div className='mt-10 mb-5 grid md:grid-cols-3 grid-cols-1 gap-5'>
                    <div>
                        <InputLabel htmlFor="nim" value="NIM" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                        <p>{user.nim ? user.nim : '-'}</p>
                    </div>
                    <div>
                        <InputLabel htmlFor="name" value="Nama" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                        <p>{user.name ? user.name : '-'}</p>
                    </div>
                    <div>
                        <InputLabel htmlFor="phone_number" value="Nomor Telepon" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                        <p>{user.phone_number ? user.phone_number : '-'}</p>
                    </div>
                </div>

                <form onSubmit={onHandleSubmit} className="space-y-6">
                    <div className='mb-5 grid grid-cols-1 gap-5'>
                        <div>
                            <InputLabel htmlFor="reason_join" value="Alasan Bergabung" className='' />
                            <Editor
                                value={data.reason_join}
                                autoComplete="reason_join"
                                onTextChange={(e) => setData('reason_join', e.htmlValue)}
                                name="reason_join"
                                style={{ height: '200px' }}
                                placeholder="Masukkan Deskripsi"
                                isFocused

                            />
                            <InputError message={errors.reason_join} className="mt-2 text-red-600" />

                        </div>
                        <div>
                            <InputLabel htmlFor="experience" value="Pengalaman" className='' />
                            <Editor
                                value={data.experience}
                                autoComplete="experience"
                                onTextChange={(e) => setData('experience', e.htmlValue)}
                                name="experience"
                                style={{ height: '200px' }}
                                placeholder="Masukkan Pengalaman"

                            />
                            <InputError message={errors.experience} className="mt-2 text-red-600" />
                        </div>
                        <div>
                            <InputLabel htmlFor="sie_id" value="Pilih Sie" />

                            <Select
                                value={data.sie_id}
                                onValueChange={(value) => setData('sie_id', value)}
                                className="mt-1 block w-full rounded-[10px] border-[1px] border-[#818181] px-4 placeholder:text-[14px] placeholder:text-[#6F6F6F] dark:bg-[#040529] focus:border-none focus:ring-none"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Sie" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-[#040529]" >
                                    {sies.map((sie) => (
                                        <SelectItem key={sie.id} value={String(sie.sie_id)}>
                                            {sie.master_sie.sie_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <InputError
                                message={errors.sie_id} className="mt- text-red-600" />
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
    );
}

Show.layout = (page) => <DashboardLayout children={page} title={"Oprec Regist"} />
