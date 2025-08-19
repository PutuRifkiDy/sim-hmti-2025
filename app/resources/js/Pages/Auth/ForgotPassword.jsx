import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
	const { data, setData, post, processing, errors } = useForm({
		email: '',
	});

	const submit = (e) => {
		e.preventDefault();

		post(route('password.email'));
	};

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-24 lg:px-8">
				<div className="flex w-full flex-row md:w-[900px]">
					<Card className="w-full rounded-l-lg rounded-r-none dark:bg-[#1f1f1f]">
						<CardHeader className="flex flex-col items-center justify-center">
							{/* <Link href="/" className="text-4xl font-black leading-relaxed tracking-tighter">
								HMTI-<span className="text-red-500">NG</span>
							</Link> */}
							<h2 className="text-left text-lg font-medium leading-relaxed tracking-tight text-muted-foreground">
								Reset Password
							</h2>
						</CardHeader>
						<CardContent>
							<div className="mb-6 mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
								<div className="mb-4 text-sm text-gray-600">
									Forgot your password? No problem. Just let us know your email address and we will
									email you a password reset link that will allow you to choose a new one.
								</div>

								{status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

								<form onSubmit={submit} className='mt-16'>
									<TextInput
										id="email"
										type="email"
										name="email"
										value={data.email}
										className="mt-1 block w-full"
										isFocused={true}
										onChange={(e) => setData('email', e.target.value)}
									/>

									<InputError message={errors.email} className="mt-2" />

									<div className="mt-4 flex items-center justify-end">
										<Button
											className="w-full bg-black dark:bg-[#ACACAC]"
											variant=""
											disabled={processing}
										>
											Email Password Reset Link
										</Button>
									</div>
								</form>
							</div>
						</CardContent>
					</Card>
					<div className="hidden w-full items-center justify-center rounded-r-lg bg-[#000000] dark:bg-[#ACACAC] md:flex">
						<img src="/assets/icon/logo_hmti.png" target="_blank" className="h-[224px] w-[224px]" />
					</div>
				</div>
			</div>
		</>
	);
}

ForgotPassword.layout = (page) => <GuestLayout children={page} title={'Forgot Password'} />;
