import { ImageUpload } from '@/Components/ImageUpload';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Transition } from '@headlessui/react';
import { ArrowLeftIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { Link, useForm, usePage } from '@inertiajs/react';
import { AutoComplete } from 'primereact/autocomplete';
import { Editor } from 'primereact/editor';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Edit() {
	const sies = usePage().props.sies;
	const oprec = usePage().props.oprec;
	const master_sies = usePage().props.master_sies;

	const flash_message = usePage().props.flash_message;
	useEffect(() => {
		if (flash_message?.message) {
			toast[flash_message.type || 'success'](flash_message.message);
		}
	}, [flash_message]);

	const [items, setItems] = useState([]);
	const [selectedSie, setSelectedSie] = useState(() => {
		return sies.map((sie) => ({
			label: `${sie.master_sie.sie_name}`,
			value: sie.sie_id,
		}));
	});

	const search = (event) => {
		const query = event.query.toLowerCase();
		const filtered = master_sies
			.filter((sie) => sie.sie_name?.toLowerCase().includes(query))
			.map((sie) => ({
				label: `${sie.sie_name}`,
				value: sie.id,
			}));
		setItems(filtered);
	};

	const { data, setData, post, processing, errors, recentlySuccessful, reset, clearErrors } = useForm({
		sie_id: selectedSie.map((item) => item.value),
		oprec_name: oprec.oprec_name ?? '',
		description: oprec.description ?? '',
		start_date: oprec.start_date ?? '',
		end_date: oprec.end_date ?? '',
		poster_path: oprec.poster_path ?? '',
		postmsg: oprec.postmsg ?? '',
		_method: 'PUT',
	});

	const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

	useEffect(() => {
		if (isReadyToSubmit) {
			if (!(data.poster_path instanceof File)) {
				delete data.poster_path;
			}
			post(route('master-open-rekruitmen.update', { id: oprec.id }), data, {
				preserveScroll: true,
				preserveState: true,
				onError: () => {
					reset('sie_id');
					toast.error('Input tidak valid. Form telah direset. Silahkan isi kembali form ini.');
				},
			});

			setIsReadyToSubmit(false);
		}
	}, [isReadyToSubmit]);

	const onHandleSubmit = (e) => {
		e.preventDefault();

		setData(
			'sie_id',
			selectedSie.map((sie) => sie.value),
		);
		setIsReadyToSubmit(true);
	};

	return (
		<>
			<div className="py-5">
				<div className="flex flex-col justify-between gap-5 rounded-lg bg-white p-4 shadow dark:bg-[#1F1F1F] sm:p-8">
					<div className="flex w-full flex-row justify-between">
						<header>
							<h2 className="text-lg font-medium text-gray-900 dark:text-white">
								Tambah Open Recruitment
							</h2>

							<p className="mt-1 text-sm text-gray-600">
								Masukkan nama oprec, deskripsi, dan tanggal mulai, tanggal selesai, dan poster untuk
								membuat oprec
							</p>
						</header>

						<Button variant="gold" type="button" asChild className="shadow-[0_0_15px_#ECBB4E]">
							<Link
								as="button"
								href={route('master-open-rekruitmen.index')}
								className="flex flex-row items-center text-[14px] font-bold group gap-1"
							>
								<ArrowLeftIcon className="tranform transition-transform duration-300 group-hover:-translate-x-1 h-3 w-3 font-bold" />
								Kembali
							</Link>
						</Button>
					</div>
					<form onSubmit={onHandleSubmit} className="space-y-6">
						<div className="">
							<InputLabel htmlFor="sie" value="Sie (Boleh pilih lebih dari satu)" />

							<AutoComplete
								multiple
								dropdown
								field="label"
								value={selectedSie}
								suggestions={items}
								completeMethod={search}
								onChange={(e) => {
									setSelectedSie(e.value);
									setData(
										'sie_id',
										e.value.map((item) => item.value),
									);
								}}
								placeholder="Input sie boleh lebih dari satu, ketik kata kunci untuk mencari"
								className={`w-full ${errors.sie_id ? 'p-invalid' : ''}`}
							/>
							<InputError message={errors.sie_id} className="mt-2 text-red-600" />
						</div>
						<div className="">
							<InputLabel htmlFor="description" value="Deskripsi" />

							{/* <TextInput
                                                        id="description"
                                                        type="text"
                                                        name="description"
                                                        value={data.description}
                                                        onChange={(e) => setData('description', e.target.value)}
                                                        className="mt-1 block w-full"
                                                        autoComplete="description"
                                                        isFocused
                                                        required
                                                        placeholder="Masukkan Description"
                                                        onErrors={errors.description && <InputError message={errors.description} className="mt-2 text-red-600" />}
                                                    /> */}
							<Editor
								value={data.description}
								autoComplete="description"
								onTextChange={(e) => setData('description', e.htmlValue)}
								name="description"
								style={{ height: '200px' }}
								placeholder="Masukkan Deskripsi"
							/>
							<InputError message={errors.description} className="mt-2 text-red-600" />
						</div>
						<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
							<div className="">
								<InputLabel htmlFor="oprec_name" value="Nama Oprec" />

								<TextInput
									id="oprec_name"
									type="text"
									name="oprec_name"
									value={data.oprec_name}
									onChange={(e) => setData('oprec_name', e.target.value)}
									className="mt-1 block w-full dark:bg-[#1F1F1F]"
									autoComplete="oprec_name"
									isFocused
									required
									placeholder="Masukkan Nama Oprec"
									onErrors={
										errors.oprec_name && (
											<InputError message={errors.oprec_name} className="mt-2 text-red-600" />
										)
									}
								/>
							</div>

							<div className="">
								<InputLabel htmlFor="postmsg" value="Pesan Poster" />

								<TextInput
									id="postmsg"
									type="text"
									name="postmsg"
									value={data.postmsg}
									onChange={(e) => setData('postmsg', e.target.value)}
									className="mt-1 block w-full dark:bg-[#1F1F1F]"
									autoComplete="postmsg"
									isFocused
									required
									placeholder="Masukkan Nama Oprec"
									onErrors={
										errors.postmsg && (
											<InputError message={errors.postmsg} className="mt-2 text-red-600" />
										)
									}
								/>
							</div>

							<div className="">
								<InputLabel htmlFor="start_date" value="Tanggal Mulai" />

								<TextInput
									id="start_date"
									type="datetime-local"
									name="start_date"
									value={data.start_date}
									onChange={(e) => setData('start_date', e.target.value)}
									className="mt-1 block w-full dark:bg-[#1F1F1F]"
									autoComplete="start_date"
									isFocused
									required
									placeholder="Masukkan Tanggal Mulai"
									onErrors={
										errors.start_date && (
											<InputError message={errors.start_date} className="mt-2 text-red-600" />
										)
									}
								/>
							</div>

							<div className="">
								<InputLabel htmlFor="end_date" value="Tanggal Selesai" />

								<TextInput
									id="end_date"
									type="datetime-local"
									name="end_date"
									value={data.end_date}
									onChange={(e) => setData('end_date', e.target.value)}
									className="mt-1 block w-full dark:bg-[#1F1F1F]"
									autoComplete="end_date"
									isFocused
									required
									placeholder="Masukkan Tanggal Selesai"
									onErrors={
										errors.end_date && (
											<InputError message={errors.end_date} className="mt-2 text-red-600" />
										)
									}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<InputLabel htmlFor="poster_path" value="Gambar Poster" />

								<ImageUpload
									imagePath={data.poster_path}
									onChangeImage={(file, previewUrl) => {
										setData('poster_path', file);
										setPreview(previewUrl);
									}}
									errorMessage={errors.poster_path}
								/>
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

Edit.layout = (page) => <DashboardLayout children={page} title={'Edit Master Open Recruitment'} />;
