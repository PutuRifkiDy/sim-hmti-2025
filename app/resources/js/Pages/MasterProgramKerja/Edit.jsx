import { ImageUpload } from '@/Components/ImageUpload';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Transition } from '@headlessui/react';
import { ArrowLeftIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function Edit() {
	const proker = usePage().props.proker;
	const { data, setData, put, post, recentlySuccessful, processing, errors } = useForm({
		title: proker.title ?? '',
		description: proker.description ?? '',
		img_path: '',
		period_id: proker.period_id,
		_method: 'PUT',
	});

	const onHandleSubmit = (e) => {
		e.preventDefault();

		if (!(data.img_path instanceof File)) {
			delete data.img_path;
		}

		post(route('master-program-kerja.update', proker.id), {
			preserveScroll: true,
			preserveState: true,
		});
	};
	return (
		<>
			<div className="py-5">
				<div className="flex flex-col justify-between gap-5 rounded-lg bg-white p-4 shadow dark:bg-[#040529] sm:p-8">
					<div className="flex w-full flex-row justify-between">
						<header>
							<h2 className="text-lg font-medium text-gray-900">Edit Program Kerja</h2>

							<p className="mt-1 text-sm text-gray-600">
								Masukkan judul, deskripsi, dan juga gambar dari program kerja
							</p>
						</header>

						<Button variant="gold" type="button" asChild className="shadow-[0_0_15px_#ECBB4E]">
							<Link
								as="button"
								href={route('master-program-kerja.index', { id: proker.period.id })}
								className="flex flex-row items-center text-[14px] font-bold"
							>
								<ArrowLeftIcon className="mr-2 h-3 w-3 font-bold" />
								Kembali
							</Link>
						</Button>
					</div>
					<div className="mb-10 mt-2 grid grid-cols-1 gap-5 md:grid-cols-3">
						<div>
							<InputLabel
								htmlFor="title"
								value="Periode"
								className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
							/>
							<p>{proker.period.title ? proker.period.title : '-'}</p>
						</div>
						<div>
							<InputLabel
								htmlFor="start_date"
								value="Tanggal Mulai"
								className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
							/>
							<p>{proker.period.start_date ? proker.period.start_date : '-'}</p>
						</div>
						<div>
							<InputLabel
								htmlFor="end_date"
								value="Tanggal Selesai"
								className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
							/>
							<p>{proker.period.end_date ? proker.period.end_date : '-'}</p>
						</div>
					</div>
					<form onSubmit={onHandleSubmit} className="space-y-6">
						<div>
							<InputLabel htmlFor="title" value="Judul Program Kerja" />
							<TextInput
								id="title"
								className="mt-1 block w-full"
								value={data.title}
								name="title"
								type="text"
								onChange={(e) => setData('title', e.target.value)}
								isFocused
								autoComplete="title"
								placeholder="contoh: Build IT 2025"
								onErrors={errors.title && <InputError message={errors.title} className="mt-2" />}
							/>
						</div>
						<div>
							<InputLabel htmlFor="description" value="Judul Program Kerja" />
							<TextInput
								id="description"
								className="mt-1 block w-full"
								value={data.description}
								name="description"
								type="text"
								onChange={(e) => setData('description', e.target.value)}
								placeholder="contoh: Build IT 2025 merupakan program kerja"
								autoComplete="description"
								onErrors={
									errors.description && <InputError message={errors.description} className="mt-2" />
								}
							/>
						</div>
						<div>
							<InputLabel htmlFor="img_path" value="Gambar Program Kerja" className="mt-2" />
							<ImageUpload
								imagePath={proker.img_path}
								onChangeImage={(file, previewUrl) => {
									setData('img_path', file);
									setPreview(previewUrl);
								}}
								errorMessage={errors.img_path}
							/>
						</div>

						<div className="flex items-center gap-4">
							<Button
								type="submit"
								variant="gold"
								disabled={processing}
								className="flex flex-row items-center justify-center gap-2 shadow-[0_0_15px_#ECBB4E] dark:bg-[#0F114C]"
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

Edit.layout = (page) => <DashboardLayout children={page} title={'Edit Master Program Kerja'} />;
