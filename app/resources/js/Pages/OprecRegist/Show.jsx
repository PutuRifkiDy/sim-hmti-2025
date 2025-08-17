import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextArea from '@/Components/TextArea';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Transition } from '@headlessui/react';
import { ArrowLeftIcon, CheckBadgeIcon, ClockIcon } from '@heroicons/react/24/solid';
import { Link, useForm, usePage } from '@inertiajs/react';
import DOMPurify from 'dompurify';
import { useEffect } from 'react';
import { toast } from 'sonner';

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
        _method: 'POST',
    });

    const cleanDescription = DOMPurify.sanitize(oprec.description);

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route('oprec-regist.store'), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <div className="py-5">
            {user.already_filled == false && (
                <div className="mb-5 flex w-full items-center gap-2 border-l-4 border-l-[#ECBB4E] bg-[#ECBB4E]/20 px-4 py-2 dark:border-l-[#55b1d7] dark:bg-[#55b1d7]/20">
                    <ClockIcon className="h-5 w-5 shrink-0 text-[#ECBB4E] dark:text-white" />
                    <p className="text-[12px] font-medium leading-[16px] text-[#ECBB4E] dark:text-white">
                        Lengkapi profil anda terlebih dahulu sebelum mendaftar kegiatan.
                    </p>
                </div>
            )}
            <div className="mb-5 flex w-full flex-row">
                <Button variant="gold" type="button" className="shadow-[0_0_15px_#ECBB4E]" asChild>
                    <Link
                        as="button"
                        href={route('oprec-regist.index')}
                        className="group flex flex-row items-center text-[14px] font-bold gap-2"
                    >
                        <ArrowLeftIcon className="h-3 w-3 font-bold transform transition-transform duration-300 group-hover:-translate-x-1" />
                        Kembali
                    </Link>
                </Button>
            </div>
            <div className="flex flex-col justify-between gap-5 rounded-lg bg-white p-4 shadow dark:bg-[#1F1F1F] sm:p-8">
                <div className="mb-5 flex flex-col gap-2 leading-[110%]">
                    <p className="text-[30px] font-bold text-[#000000] dark:text-white">{oprec?.oprec_name}</p>
                    <p className="text-[15px] leading-[110%] text-[#7F7F7F]">Informasi open recruitmen</p>
                </div>

                <div className="flex w-[100%] flex-col gap-10 md:flex-row">
                    <div className="w-[40%]">
                        <img src={oprec.poster_path} alt="Poster Oprec" className="h-auto w-full" />
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: cleanDescription }} className="w-[60%]" />
                </div>

                <div className="mt-10 flex w-full flex-row justify-between">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                            Pendaftaran Open Rekruitmen
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Lengkapi form pendaftaran di bawah ini untuk mengikuti kegiatan tersebut.
                        </p>
                    </header>
                </div>

                <div className="mb-5 mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
                    <div>
                        <InputLabel
                            htmlFor="nim"
                            value="NIM"
                            className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
                        />
                        <p>{user.nim ? user.nim : '-'}</p>
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="name"
                            value="Nama"
                            className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
                        />
                        <p>{user.name ? user.name : '-'}</p>
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="phone_number"
                            value="Nomor Telepon"
                            className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
                        />
                        <p>{user.phone_number ? user.phone_number : '-'}</p>
                    </div>
                </div>

                <form onSubmit={onHandleSubmit} className="space-y-6">
                    <div className="mb-5 grid grid-cols-1 gap-5">
                        <div>
                            <InputLabel htmlFor="reason_join" value="Alasan Bergabung" className="" />
                            <TextArea
                                value={data.reason_join}
                                autoComplete="reason_join"
                                onChange={(e) => setData('reason_join', e.target.value)}
                                name="reason_join"
                                style={{ height: '200px' }}
                                placeholder="Masukkan Deskripsi"
                                isFocused
                                className="dark:bg-[#101010]"
                            />
                            <InputError message={errors.reason_join} className="mt-2 text-red-600" />
                        </div>
                        <div>
                            <InputLabel htmlFor="experience" value="Pengalaman" className="" />
                            <TextArea
                                value={data.experience}
                                autoComplete="experience"
                                onChange={(e) => setData('experience', e.target.value)}
                                name="experience"
                                style={{ height: '200px' }}
                                placeholder="Masukkan Pengalaman"
                                className="dark:bg-[#101010]"
                            />
                            <InputError message={errors.experience} className="mt-2 text-red-600" />
                        </div>
                        <div>
                            <InputLabel htmlFor="sie_id" value="Pilih Sie" />

                            <Select
                                value={data.sie_id}
                                onValueChange={(value) => setData('sie_id', value)}
                                className="focus:ring-none mt-1 block w-full rounded-[10px] border-[1px] border-[#818181] px-4 placeholder:text-[14px] placeholder:text-[#6F6F6F] focus:border-none dark:bg-[#040529]"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Sie" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-[#101010]">
                                    {sies.map((sie) => (
                                        <SelectItem key={sie.id} value={String(sie.sie_id)}>
                                            {sie.master_sie.sie_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <InputError message={errors.sie_id} className="mt- text-red-600" />
                        </div>
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
    );
}

Show.layout = (page) => <DashboardLayout children={page} title={'Oprec Regist'} />;
