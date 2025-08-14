import InputLabel from "@/Components/InputLabel";
import { Button } from "@/Components/ui/button";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { ArrowLeftIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Link, usePage } from "@inertiajs/react";
import DOMPurify from 'dompurify';

export default function Registered() {
    const oprec_regist = usePage().props.oprec_regist;
    const cleanDescription = DOMPurify.sanitize(oprec_regist.oprec.description);
    const cleanReasonJoin = DOMPurify.sanitize(oprec_regist.reason_join);
    const cleanExperience = DOMPurify.sanitize(oprec_regist.experience);
    console.log("Oprec Regist:", oprec_regist);
    return (
        <>
            <div className="py-5">
                <div className="bg-white dark:bg-[#040529] p-4 shadow rounded-lg sm:p-8 flex flex-col gap-5 justify-between">
                    <div className="flex gap-2 px-4 py-4 border-l-4 border-l-[#00D238] dark:border-l-[#55b1d7] bg-[#00D238]/20 dark:bg-[#55b1d7]/20 w-full items-center mb-5">
                        <CheckBadgeIcon className="shrink-0 h-6 w-6 text-[#00D238] dark:text-white" />
                        <p className='text-[#00D238] font-medium text-[14px] leading-[16px] dark:text-white'>
                            Anda telah terdaftar pada kegiatan ini. Silahkan tunggu undangan dari panitia untuk mengikuti kegiatan ini.
                        </p>
                    </div>
                    <div className='flex flex-row w-full'>
                        <Button variant="gold" type="button" asChild>
                            <Link as="button" href={route('oprec-regist.index')} className="flex flex-row items-center text-[14px] font-bold">
                                <ArrowLeftIcon className="w-3 h-3 mr-2 font-bold" />
                                Kembali
                            </Link>
                        </Button>
                    </div>

                    <div className="flex md:flex-row flex-col w-[100%] gap-10">
                        <div className="w-[40%]">
                            <img src={oprec_regist.oprec.poster_path} alt="Poster Oprec" className="w-full h-auto" />
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: cleanDescription }} className="w-[60%]" />
                    </div>

                    <div className='flex flex-row justify-between w-full mt-10'>
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">
                                Anda telah terdaftar pada kegiatan ini
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Silahkan tunggu undangan dari panitia untuk mengikuti kegiatan ini
                            </p>
                        </header>
                    </div>

                    <div className='mt-10 mb-5 grid md:grid-cols-3 grid-cols-1 gap-5'>
                        <div>
                            <InputLabel htmlFor="nim" value="NIM" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                            <p>{oprec_regist.user.nim ? oprec_regist.user.nim : '-'}</p>
                        </div>
                        <div>
                            <InputLabel htmlFor="name" value="Nama" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                            <p>{oprec_regist.user.name ? oprec_regist.user.name : '-'}</p>
                        </div>
                        <div>
                            <InputLabel htmlFor="phone_number" value="Nomor Telepon" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                            <p>{oprec_regist.user.phone_number ? oprec_regist.user.phone_number : '-'}</p>
                        </div>
                    </div>
                    <div>
                        <InputLabel htmlFor="experience" value="Pengalaman" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                        <div dangerouslySetInnerHTML={{ __html: cleanExperience }} className="w-[60%]" />
                    </div>
                    <div>
                        <InputLabel htmlFor="reason_join" value="Alasan Bergabung" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                        <div dangerouslySetInnerHTML={{ __html: cleanReasonJoin }} className="w-[60%]" />
                    </div>
                </div>
            </div>
        </>
    );
}

Registered.layout = (page) => <DashboardLayout children={page} title={"Oprec Regist"} header={"Oprec Regist"} description={"Daftar kegiatan di page ini"} />;
