import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Hapus Akun</h2>

                <p className="mt-1 text-sm text-gray-600 md:max-w-[400px] w-full">
                    Saat anda menghapus akun anda, semua data dan informasi akan dihapus secara permanen. Sebelum menghapus akun anda, tolong unduh data atau informasi yang anda inginkan untuk di simpan.
                </p>
            </header>

            <Button variant="red" onClick={confirmUserDeletion}>Delete Account</Button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Apakah anda yakin ingin menghapus akun?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Setelah akun Anda dihapus, semua sumber daya dan data terkait akan dihapus secara permanen. Silakan masukkan kata sandi Anda untuk mengonfirmasi bahwa Anda ingin menghapus akun Anda secara permanen.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                            onErrors={errors.password && <InputError message={errors.password} className="mt-2" />}
                        />

                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button type="button" variant="blue" onClick={closeModal}>Batal</Button>

                        <Button type="submit" variant="red" className="ms-3" disabled={processing}>
                            Hapus Akun
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
