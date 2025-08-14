import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Transition } from "@headlessui/react";
import { ArrowLeftIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Create() {
    const period_id = usePage().props.period_id;
    const months = usePage().props.months;
    const flash_message = usePage().props.flash_message;

    useEffect(() => {
        if (flash_message?.message) {
            toast[flash_message.type || 'success'](flash_message.message);
        }
    }, [flash_message]);

    const { data, setData, post, errors, recentlySuccessful, reset, clearErrors, processing } = useForm({
        title: '',
        month: '',
        total_income: 0,
        period_id: period_id,
        _method: 'POST'
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route('master-financial.store', { id: period_id }), {
            preserveScroll: true,
            preserveState: true,
        });
    }

    return (
        <>
            <div className="py-5">
                <div className="bg-white dark:bg-[#040529] p-4 shadow rounded-lg sm:p-8 flex flex-col gap-5 justify-between">
                    <div className='flex flex-row justify-between w-full'>
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">Tambah Keuangan</h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Masukkan judul, bulan, dan total pendapatan
                            </p>
                        </header>

                        <Button variant="gold" type="button" asChild>
                            <Link as="button" href={route('master-financial.index', { id: period_id })} className="flex flex-row items-center text-[14px] font-bold">
                                <ArrowLeftIcon className="w-3 h-3 mr-2 font-bold" />
                                Kembali
                            </Link>
                        </Button>
                    </div>

                    <form onSubmit={onHandleSubmit} className="space-y-6">
                        <div>
                            <InputLabel
                                htmlFor="title"
                                value="Judul"
                            />
                            <TextInput
                                id="title"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                autoComplete="title"
                                placeholder="Masukkan judul keuangan (boleh kosong)"
                                onChange={(e) => setData('title', e.target.value)}
                                onErrors={errors.title && <InputError message={errors.title} />}
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="month"
                                value="Bulan"
                            />
                            <Select
                                value={data.month}
                                onValueChange={(value) => setData('month', value)}
                                className="mt-1 block w-full rounded-[10px] border-[1px] border-[#818181] px-4 placeholder:text-[14px] placeholder:text-[#6F6F6F] focus:border-none focus:ring-none">
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Bulan" />
                                </SelectTrigger>
                                <SelectContent>
                                    {months.map((month) => (
                                        <SelectItem key={month.id} value={month.name}>
                                            {month.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {errors.month && <InputError message={errors.month} className="mt-2 text-red-600" />}
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="total_income"
                                value="Total Income"
                            />
                            <TextInput
                                id="total_income"
                                name="total_income"
                                value={data.total_income}
                                type="number"
                                className="mt-1 block w-full"
                                autoComplete="total_income"
                                placeholder="Contoh 1000000"
                                onChange={(e) => setData('total_income', e.target.value)}
                                onErrors={errors.total_income && <InputError message={errors.total_income} />}
                            />
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

Create.layout = (page) => <DashboardLayout children={page} title={"Create Master Financial"} />
