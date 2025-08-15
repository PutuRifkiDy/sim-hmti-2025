import { Button } from "@/Components/ui/button";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { ArrowRightIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Index() {
    const flash_message = usePage().props.flash_message;
    useEffect(() => {
        if (flash_message?.message) {
            toast[flash_message.type || 'success'](flash_message.message);
        }
    }, [flash_message]);
    const oprecs = usePage().props.oprecs;
    const dateNow = usePage().props.date_now;
    console.log("ini adalah dateNow", dateNow);
    console.log("ini adalah oprecs", oprecs);

    const templateDateTime = (date) => {
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        const formatDate = new Date(date).toLocaleDateString('id-ID', options);
        return formatDate;
    }

    const isOprecActive = (startDate, endDate) => {
        if (dateNow >= startDate && dateNow <= endDate) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-5 mt-10">
                {oprecs?.map((oprec, index) => (
                    <Link href={route('oprec-regist.show', oprec.id)} key={index} className="">
                        <div className={`border-2 border-[#ECBB4E] rounded-[20px] p-4  min-w-full bg-white ${isOprecActive(oprec.start_date, oprec.end_date) == false ? 'opacity-50' : ''}`}>
                            <div className="overflow-hidden rounded-[10px] h-96 w-auto flex items-center">
                                <img src={oprec.poster_path} className="object-center object-cover w-full h-auto transform hover:scale-105 transition-all duration-300 ease-in-out" alt="" />
                            </div>
                            <div className="flex md:flex-row flex-col justify-between items-center mt-3">
                                <div className="flex flex-col">
                                    <p className="text-[#1F1F1F] font-semibold text-[20px] leading-[110%]">
                                        {oprec.oprec_name}
                                    </p>
                                    <p className="text-[13px] leading-[110%] text-[#1F1F1F]">
                                        <span>{templateDateTime(oprec.start_date)}</span> {" - "}<span>{templateDateTime(oprec.end_date)}</span>
                                    </p>
                                </div>
                                <Button variant="none" className="bg-[#ECBB4E] rounded-[10px] shadow-[0_0_15px_#ECBB4E]">
                                    <Link href={route('oprec-regist.show', oprec.id)} className="text-white font-bold text-[14px] flex flex-row items-center gap-1 px-2">
                                        Join
                                        <ArrowRightIcon className="w-4 h-4 inline-block" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

Index.layout = (page) =>
    <DashboardLayout
        children={page}
        title={"Open Recruitmen"}
        header={"Open Recruitmen"}
        description={"Daftar kegiatan himpunan di page ini"}
    />;
