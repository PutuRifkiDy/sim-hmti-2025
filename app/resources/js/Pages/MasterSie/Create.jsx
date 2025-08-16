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
	useEffect(() => {
		if (flash_message?.message) {
			toast[flash_message.type || 'success'](flash_message.message);
		}
	}, [flash_message]);
	const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
		sie_name: '',
		_method: 'POST',
	});

	const onHandleSubmit = (e) => {
		e.preventDefault();
		post(route('master-sie.store'), {
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
							<h2 className="text-lg font-medium text-gray-900 dark:text-white">Tambah Sie</h2>

							<p className="mt-1 text-sm text-gray-600">Masukkan name sie untuk membuat sie</p>
						</header>

						<Button variant="gold" type="button" asChild className="shadow-[0_0_15px_#ECBB4E]">
							<Link
								as="button"
								href={route('master-sie.index')}
								className="flex flex-row items-center text-[14px] font-bold"
							>
								<ArrowLeftIcon className="mr-2 h-3 w-3 font-bold" />
								Kembali
							</Link>
						</Button>
					</div>
					<form onSubmit={onHandleSubmit} className="space-y-6">
						<div>
							<InputLabel htmlFor="sie_name" value="Nama Sie" />
							<TextInput
								id="sie_name"
								className="mt-1 block w-full dark:bg-[#1F1F1F]"
								value={data.sie_name}
								name="sie_name"
								type="text"
								onChange={(e) => setData('sie_name', e.target.value)}
								isFocused
								placeholder="Contoh: Keamanan Alam Semesta"
								autoComplete="sie_name"
								onErrors={errors.sie_name && <InputError message={errors.sie_name} className="mt-2" />}
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

Create.layout = (page) => <DashboardLayout children={page} title={'Create Master Sie'} />;
