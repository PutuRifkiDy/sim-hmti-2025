import { Button } from "@/Components/ui/button";
import { messages } from "@/lib/utils"
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Head, Link } from "@inertiajs/react";

function ErrorHandling({ status }) {
    const errorMessages = messages[status];

    // const iconForErrorMessage = (status) => {
    //     switch (status) {
    //         case '500':
    //             return '500';
    //             break;
    //         case '503':
    //             return (

    //             );
    //             break;
    //         case '404':
    //             return (

    //             );
    //             break;
    //         case '403':
    //             return (

    //             );
    //             break;
    //         case '401':
    //             return (

    //             );
    //             break;
    //         case '429':
    //             return (

    //             );
    //             break;
    //         default:
    //             return <Icon503 />;
    //     }
    // }

    return (
        <>
            <Head title={errorMessages.title} />

            <div className="flex flex-col items-center justify-center py-36 md:px-0 px-5">
                <div className="flex flex-row gap-5 justify-center items-center">
                    <img src="/assets/icon/logo_hmti.png" alt="Logo HMTI" className="w-32 lg:w-56 h-auto" data-aos="fade-up" data-aos-duration="200" />
                    <div className="relative">
                        <span
                            className="block text-5xl lg:text-7xl font-normal text-[#785233] leading-none"
                            style={{ fontFamily: "Arrintika Signature, cursive" }}
                            data-aos="fade-up"
                            data-aos-duration="400"
                        >
                            Error
                        </span>
                        <h1
                            data-aos="fade-up"
                            data-aos-duration="600"
                            className="uppercase text-5xl lg:text-7xl tracking-tighter font-extrabold text-[#ECC067] leading-none -mt-2 lg:-mt-4 font-poppins">
                            {errorMessages.status}
                        </h1>
                    </div>
                </div>

                <h1 className="font-bold text-[35px] text-[#3A3A3A] dark:text-white text-center mt-10">
                    {errorMessages.title}
                </h1>
                <p className="text-[#3A3A3A] text-xl dark:text-white text-center">
                    {errorMessages.description}
                </p>
                <Button variant="gold" type="button" asChild className="shadow-[0_0_15px_#ECBB4E] px-6 py-6 my-10">
                    <Link href={route('welcome')} className="text-white font-medium rounded-[5px] text-xl group">
                        <ArrowLeftIcon className="w-5 h-5 mr-2 transform transition-transform duration-300 group-hover:translate-x-[-5px]" />
                        Kembali ke beranda
                    </Link>
                </Button>
                <p className="text-[#A4A3A3] text-xl text-center">© Himpunan Mahasiswa Teknologi Informasi 2025</p>
            </div>
        </>
    )
}

export default ErrorHandling;
