import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { toast } from 'sonner';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

export default function Edit({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;
    // const flash_message = usePage().props.flash_message;
    // if(flash_message?.message) {
    //     toast[flash_message.type || 'success'](flash_message.message);
    // }
	return (

			<div className="py-5">
				<div className="mx-auto w-full space-y-6">
                    {user.already_filled == false && (
                        <div className='flex flex-row gap-2 py-2 px-3 bg-[#ECBB4E]/30 border-l-4 border-l-[#ECBB4E] items-center rounded-md'>
                            <ExclamationCircleIcon className="shrink-0 w-5 h-5 text-[#ECBB4E]" />
                            <p className='text-[#ECBB4E] text-[14px]'>Harap isi data diri anda terlebih dahulu</p>
                        </div>
                    )}
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


