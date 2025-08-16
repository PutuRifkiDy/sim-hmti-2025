import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Transition } from '@headlessui/react';
import { ArrowLeftIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function Edit() {
	const position = usePage().props.position;
	const master_positions = usePage().props.master_positions;
	const { data, setData, processing, post, reset, errors, recentlySuccessful } = useForm({
		title: position.title ?? '',
		parent_id: position.parent_id ?? '',
		_method: 'PUT',
	});

	const onHandleSubmit = (e) => {
		e.preventDefault();

		post(route('master-position.update', position.id), {
			preserveScroll: true,
			preserveState: true,
		});
	};

	const onHandleChange = (e) => {
		setData(e.target.name, e.target.value);
	};
	return (
		<>
			<div className="py-5">
				<div className="flex flex-col justify-between gap-5 rounded-lg bg-white p-4 shadow dark:bg-[#1F1F1F] sm:p-8">
					<div className="flex w-full flex-row justify-between">
						<header>
							<h2 className="text-lg font-medium text-gray-900 dark:text-white">Update Jabatan</h2>

							<p className="mt-1 text-sm text-gray-600">Update data jabatan di bawah ini</p>
						</header>

						<Button variant="gold" type="button" asChild className="shadow-[0_0_15px_#ECBB4E]">
							<Link
								as="button"
								href={route('master-position.index')}
								className="flex flex-row items-center text-[14px] font-bold"
							>
								<ArrowLeftIcon className="mr-2 h-3 w-3 font-bold" />
								Kembali
							</Link>
						</Button>
					</div>
					<form onSubmit={onHandleSubmit} className="mt-6 space-y-6">
						<div className="grid grid-cols-1 gap-5">
							<div>
								<InputLabel htmlFor="title" value="Nama Jabatan" />

								<TextInput
									id="title"
									className="mt-1 block w-full dark:bg-[#1F1F1F]"
									name="title"
									type="text"
									value={data.title}
									onChange={onHandleChange}
									required
									isFocused
									placeholder="Contoh: Orang Himpunan"
									autoComplete="title"
									onErrors={errors.title && <InputError message={errors.title} className="mt-2" />}
								/>
							</div>
							<div>
								<InputLabel htmlFor="position_id" value="Jabatan Induk" />

								<Select
									value={data.parent_id}
									onValueChange={(value) => setData('parent_id', value)}
									className="focus:ring-none mt-1 block w-full rounded-[10px] border-[1px] border-[#818181] px-4 placeholder:text-[14px] placeholder:text-[#6F6F6F] focus:border-none dark:bg-[#040529]"
								>
									<SelectTrigger>
										<SelectValue placeholder="Pilih Jabatan" />
									</SelectTrigger>
									<SelectContent className="dark:bg-[#101010]">
										{master_positions.map((position) => (
											<SelectItem key={position.id} value={String(position.id)}>
												{position.title}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<InputError message={errors.parent_id} className="mt- text-red-600" />
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
		</>
	);
}

Edit.layout = (page) => <DashboardLayout children={page} title={'Edit Master Position'} />;
