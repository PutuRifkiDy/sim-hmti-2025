import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Transition } from '@headlessui/react';
import { ArrowLeftIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

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
		_method: 'POST',
	});

	const onHandleSubmit = (e) => {
		e.preventDefault();

		post(route('master-financial.store', { id: period_id }), {
			preserveScroll: true,
			preserveState: true,
		});
	};

	return (
		<>
			<div className="py-5">
				<div className="flex flex-col justify-between gap-5 rounded-lg bg-white p-4 shadow dark:bg-[#1F1F1F] sm:p-8">
					<div className="flex w-full flex-row justify-between">
						<header>
							<h2 className="text-lg font-medium text-gray-900 dark:text-white">Tambah Keuangan</h2>

							<p className="mt-1 text-sm text-gray-600">Masukkan judul, bulan, dan total pendapatan</p>
						</header>

						<Button variant="gold" type="button" asChild className="shadow-[0_0_15px_#ECBB4E]">
							<Link
								as="button"
								href={route('master-financial.index', { id: period_id })}
								className="group flex flex-row items-center text-[14px] font-bold gap-1"
							>
								<ArrowLeftIcon className="transform transition-transform duration-300 group-hover:-translate-x-1 h-3 w-3 font-bold" />
								Kembali
							</Link>
						</Button>
					</div>

					<form onSubmit={onHandleSubmit} className="space-y-6">
						<div>
							<InputLabel htmlFor="title" value="Judul" />
							<TextInput
								id="title"
								name="title"
								value={data.title}
								className="mt-1 block w-full dark:bg-[#1F1F1F]"
								autoComplete="title"
								placeholder="Masukkan judul keuangan (boleh kosong)"
								onChange={(e) => setData('title', e.target.value)}
								onErrors={errors.title && <InputError message={errors.title} />}
							/>
						</div>
						<div>
							<InputLabel htmlFor="month" value="Bulan" />
							<Select
								value={data.month}
								onValueChange={(value) => setData('month', value)}
								className="focus:ring-none mt-1 block w-full rounded-[10px] border-[1px] border-[#818181] px-4 placeholder:text-[14px] placeholder:text-[#6F6F6F] focus:border-none"
							>
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
							<InputLabel htmlFor="total_income" value="Total Income" />
							<TextInput
								id="total_income"
								name="total_income"
								value={data.total_income}
								type="number"
								className="mt-1 block w-full [appearance:textfield] dark:bg-[#1F1F1F] dark:only-of-type:bg-[#1F1F1F]"
								autoComplete="total_income"
								placeholder="Contoh 1000000"
								onChange={(e) => setData('total_income', e.target.value)}
								onErrors={errors.total_income && <InputError message={errors.total_income} />}
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

Create.layout = (page) => <DashboardLayout children={page} title={'Create Master Keuangan'} />;
