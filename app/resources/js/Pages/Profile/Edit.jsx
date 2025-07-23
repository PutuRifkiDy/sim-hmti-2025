import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Edit({ mustVerifyEmail, status }) {
	return (


			<div className="py-5">
				<div className="mx-auto w-full space-y-6">
					<div className="bg-white dark:bg-[#040529] p-4 shadow sm:rounded-lg sm:p-8">
						<UpdateProfileInformationForm
							mustVerifyEmail={mustVerifyEmail}
							status={status}
							className="w-full"
						/>
					</div>

					<div className="bg-white dark:bg-[#040529] p-4 shadow sm:rounded-lg sm:p-8">
						<UpdatePasswordForm className="w-full" />
					</div>

					{/* <div className="bg-white dark:bg-[#040529] p-4 shadow sm:rounded-lg sm:p-8">
						<DeleteUserForm className="max-w-xl" />
					</div> */}
				</div>
			</div>
	);
}

Edit.layout = (page) => <DashboardLayout children={page} title={"Profil"} header={"Profil"} description={"Kelola profil anda di page ini"}/>;


