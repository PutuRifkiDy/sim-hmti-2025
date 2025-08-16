import DashboardLayout from '@/Layouts/DashboardLayout';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { usePage } from '@inertiajs/react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
	const user = usePage().props.auth.user;

	return (
		<div className="py-5">
			<div className="mx-auto w-full space-y-6">
				{user.already_filled == false && (
					<div className="flex flex-row items-center gap-2 rounded-md border-l-4 border-l-[#ECBB4E] bg-[#ECBB4E]/30 px-3 py-2">
						<ExclamationCircleIcon className="h-5 w-5 shrink-0 text-[#ECBB4E]" />
						<p className="text-[14px] text-[#ECBB4E]">Harap isi data diri anda terlebih dahulu</p>
					</div>
				)}
				<div className="rounded-lg bg-white p-4 shadow dark:bg-[#1F1F1F] sm:p-8">
					<UpdateProfileInformationForm
						mustVerifyEmail={mustVerifyEmail}
						status={status}
						className="w-full"
					/>
				</div>

				<div className="rounded-lg bg-white p-4 shadow dark:bg-[#1F1F1F] sm:p-8">
					<UpdatePasswordForm className="w-full" />
				</div>

				{/* <div className="bg-white dark:bg-[#040529] p-4 shadow sm:rounded-lg sm:p-8">
						<DeleteUserForm className="max-w-xl" />
					</div> */}
			</div>
		</div>
	);
}

Edit.layout = (page) => (
	<DashboardLayout
		children={page}
		title={'Profil'}
		header={'Profil'}
		description={'Kelola profil anda di page ini'}
	/>
);
