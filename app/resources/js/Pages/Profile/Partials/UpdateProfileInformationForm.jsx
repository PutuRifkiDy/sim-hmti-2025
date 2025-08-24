import { CancelUpdateProfile, IconEditForDashboard, IconPreviewImageProfile } from '@/Components/IconAdmin';
import { ImageUpload } from '@/Components/ImageUpload';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { flashMessage } from '@/lib/utils';
import { Transition } from '@headlessui/react';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
	const user = usePage().props.auth.user;

	const [updateProfileInformation, setUpdateProfileInformation] = useState(false);

	const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
		name: user.name ?? '',
		email: user.email ?? '',
		nim: user.nim,
		line_id: user.line_id ?? '',
		phone_number: user.phone_number ?? '',
		birthday: user.birthday ?? '',
		address: user.address ?? '',
		username: user.username ?? '',
		img_path: user.img_path ?? '',
		_method: 'PUT',
	});

	const onHandleSubmit = (e) => {
		e.preventDefault();

		if (!(data.img_path instanceof File)) {
			delete data.img_path;
		}
		post(route('profile.update'), {
			onSuccess: (success) => {
				const flash = flashMessage(success);
				if (flash) toast[flash.type](flash.message);

				setTimeout(() => {
					window.location.reload();
				}, 1000);
			},
			preserveScroll: true,
			preserveState: true,
		});
	};

	const onHandleChange = (e) => {
		setData(e.target.name, e.target.value);
	};

	const dateFormat = (birthday) => {
		const date = new Date(birthday);
		const month = date.toLocaleString('default', { month: 'long' });
		const day = date.getDate();
		const year = date.getFullYear();
		return `${day} ${month} ${year}`;
	};

	return (
		<section className={className}>
			<div className="flex w-full flex-row justify-between">
				<header>
					<h2 className="text-lg font-medium text-gray-900 dark:text-white">Informasi Pengguna</h2>

					<p className="mt-1 text-sm text-gray-600">Update informasi pengguna dan alamat email akun Anda.</p>
				</header>
				{updateProfileInformation == false && (
					<Button
						className="flex items-center justify-center gap-3 shadow-[0_0_15px_#ECBB4E] dark:bg-[#ECBB4E]"
						variant="gold"
						onClick={() => setUpdateProfileInformation(true)}
					>
						<IconEditForDashboard />
						Edit
					</Button>
				)}
				{updateProfileInformation == true && (
					<Button
						className="flex items-center justify-center gap-3 border-2 border-[#ECBB4E] p-3 text-[#ECBB4E] dark:border-[#ECBB4E] dark:text-white"
						variant="none"
						onClick={() => setUpdateProfileInformation(false)}
					>
						<CancelUpdateProfile />
						Batal
					</Button>
				)}
			</div>

			{updateProfileInformation == true && (
				<form onSubmit={onHandleSubmit} className="mt-6 space-y-6">
					<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
						<div>
							<InputLabel htmlFor="nim" value="NIM" />

							<TextInput
								id="nim"
								className="mt-1 block w-full dark:bg-[#1F1F1F]"
								name="nim"
								type="text"
								value={data.nim}
								onChange={onHandleChange}
								required
								isFocused
								placeholder="Masukkan nim anda"
								autoComplete="nim"
								onErrors={errors.nim && <InputError message={errors.nim} className="mt-2" />}
							/>
						</div>

						<div>
							<InputLabel htmlFor="name" value="Nama" />

							<TextInput
								id="name"
								className="mt-1 block w-full dark:bg-[#1F1F1F]"
								name="name"
								type="text"
								value={data.name}
								onChange={onHandleChange}
								required
								placeholder="Masukkan nama anda"
								autoComplete="name"
								onErrors={errors.name && <InputError message={errors.name} className="mt-2" />}
							/>
						</div>

						<div>
							<InputLabel htmlFor="email" value="Email" />

							<TextInput
								id="email"
								type="text"
								className="mt-1 block w-full dark:bg-[#1F1F1F]"
								name="email"
								value={data.email}
								onChange={onHandleChange}
								required
								placeholder="Masukkan email anda"
								autoComplete="email"
								onErrors={errors.email && <InputError message={errors.email} className="mt-2" />}
							/>
						</div>

						<div>
							<InputLabel htmlFor="line_id" value="ID Line" />

							<TextInput
								id="line_id"
								className="mt-1 block w-full dark:bg-[#1F1F1F]"
								type="text"
								name="line_id"
								value={data.line_id}
								onChange={onHandleChange}
								required
								placeholder="Masukkan id line anda"
								autoComplete="id_line"
								onErrors={errors.line_id && <InputError message={errors.line_id} className="mt-2" />}
							/>
						</div>

						<div>
							<InputLabel htmlFor="phone_number" value="Nomor Telepon" />

							<TextInput
								id="phone_number"
								className="mt-1 block w-full dark:bg-[#1F1F1F]"
								name="phone_number"
								type="text"
								value={data.phone_number}
								onChange={onHandleChange}
								required
								placeholder="Masukkan nomor telepon anda"
								autoComplete="phone_number"
								onErrors={
									errors.phone_number && <InputError message={errors.phone_number} className="mt-2" />
								}
							/>
						</div>

						<div>
							<InputLabel htmlFor="birthday" value="Tanggal Lahir" />

							<TextInput
								id="birthday"
								className="mt-1 block w-full dark:bg-[#1F1F1F]"
								name="birthday"
								type="date"
								value={data.birthday}
								onChange={onHandleChange}
								required
								placeholder="Masukkan tanggal lahir anda"
								autoComplete="birthday"
								onErrors={errors.birthday && <InputError message={errors.birthday} className="mt-2" />}
							/>
						</div>

						<div>
							<InputLabel htmlFor="address" value="Alamat" />

							<TextInput
								id="address"
								className="mt-1 block w-full dark:bg-[#1F1F1F]"
								name="address"
								type="text"
								value={data.address}
								onChange={onHandleChange}
								required
								placeholder="Masukkan alamat anda"
								autoComplete="address"
								onErrors={errors.address && <InputError message={errors.address} className="mt-2" />}
							/>
						</div>

						<div>
							<InputLabel htmlFor="username" value="Username" />

							<TextInput
								id="username"
								className="mt-1 block w-full dark:bg-[#1F1F1F]"
								name="username"
								type="text"
								value={data.username}
								onChange={onHandleChange}
								required
								placeholder="Masukkan username anda"
								autoComplete="username"
								onErrors={errors.username && <InputError message={errors.username} className="mt-2" />}
							/>
						</div>

						<div className="flex flex-col gap-2">
							<InputLabel
								htmlFor="img_path"
								value="Foto Diri"
								className="text-[12px] font-normal text-[#676767] dark:text-white"
							/>

							<ImageUpload
								imagePath={user.img_path}
								onChangeImage={(file, previewUrl) => {
									setData('img_path', file);
									setPreview(previewUrl);
								}}
								errorMessage={errors.img_path}
							/>

							{/* Input Image Incoming sajalah */}
						</div>
					</div>

					{mustVerifyEmail && user.email_verified_at === null && (
						<div>
							<p className="mt-2 text-sm text-gray-800">
								Your email address is unverified.
								<Link
									href={route('verification.send')}
									method="post"
									as="button"
									className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								>
									Click here to re-send the verification email.
								</Link>
							</p>

							{status === 'verification-link-sent' && (
								<div className="mt-2 text-sm font-medium text-green-600">
									A new verification link has been sent to your email address.
								</div>
							)}
						</div>
					)}

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
			)}

			{updateProfileInformation == false && (
				<div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
					<div>
						<InputLabel
							htmlFor="nim"
							value="NIM"
							className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
						/>
						<p>{data.nim}</p>
					</div>
					<div>
						<InputLabel
							htmlFor="name"
							value="Nama"
							className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
						/>
						<p>{data.name ? data.name : '-'}</p>
					</div>
					<div>
						<InputLabel
							htmlFor="email"
							value="Email"
							className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
						/>
						<p>{data.email ? data.email : '-'}</p>
					</div>
					<div>
						<InputLabel
							htmlFor="line_id"
							value="ID Line"
							className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
						/>
						<p>{data.line_id ? data.line_id : '-'}</p>
					</div>
					<div>
						<InputLabel
							htmlFor="phone_number"
							value="Nomor Telepon"
							className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
						/>
						<p>{data.phone_number ? data.phone_number : '-'}</p>
					</div>
					<div>
						<InputLabel
							htmlFor="birthday"
							value="Tanggal Lahir"
							className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
						/>
						<p>{data.birthday ? dateFormat(data.birthday) : '-'}</p>
					</div>
					<div>
						<InputLabel
							htmlFor="address"
							value="Alamat"
							className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
						/>
						<p>{data.address ? data.address : '-'}</p>
					</div>
					<div>
						<InputLabel
							htmlFor="username"
							value="Username"
							className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
						/>
						<p>{data.username ? data.username : '-'}</p>
					</div>
					<div>
						<InputLabel
							htmlFor="role"
							value="Role"
							className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
						/>
						<div className="max-w-fit rounded-[20px] bg-[#ECBB4E] px-2 py-1">
							<p className="text-[12px] text-white">
								{user.role == 'divisi_it'
									? 'Admin'
									: user.role == 'ketua_kegiatan'
										? 'Ketua Kegiatan'
										: user.role == 'guest'
											? 'Mahasiswa'
											: '-'}
							</p>
						</div>
					</div>
					<div>
						<Dialog>
							<DialogTrigger className="flex flex-row items-center justify-center gap-3">
								<p className="text-[14px] text-[#676767] dark:text-gray-400">Foto Profile</p>
								<IconPreviewImageProfile />
							</DialogTrigger>
							<DialogContent className="max-w-xl dark:bg-[#1F1F1F]">
								<DialogTitle>Foto Profile</DialogTitle>
								<img
									src={user.img_path ? user.img_path : 'assets/images/default_image_profile.png'}
									className="h-64 w-auto"
									alt=""
								/>
								<a
									href={user.img_path ? user.img_path : 'assets/images/default_image_profile.png'}
									target="_blank"
									rel="noopener noreferrer"
									className="text-center"
								>
									Buka dalam Tab Baru
								</a>
							</DialogContent>
						</Dialog>
					</div>
				</div>
			)}
		</section>
	);
}
