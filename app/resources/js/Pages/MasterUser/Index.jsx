import { IconMasterUser } from '@/Components/IconAdmin';
import Modal from '@/Components/Modal';
import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import DashboardLayout from '@/Layouts/DashboardLayout';
import {
	DocumentArrowDownIcon,
	DocumentPlusIcon,
	PencilSquareIcon,
	PlusIcon,
	XCircleIcon,
} from '@heroicons/react/24/solid';
import { Link, router, usePage } from '@inertiajs/react';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export default function Index() {
	const { props } = usePage();
	const master_users = usePage().props.master_users;
	const total_user = usePage().props.total_user;
	const [users, setUsers] = useState(master_users);
	const flash_message = usePage().props.flash_message;
	useEffect(() => {
		if (flash_message?.message) {
			toast[flash_message.type || 'success'](flash_message.message);
		}
	}, [flash_message]);

	useEffect(() => {
		setUsers(
			props.master_users.map((master_user) => {
				return {
					id: master_user.id,
					name: master_user.name ?? '',
					email: master_user.email ?? '',
					nim: master_user.nim ?? '',
					line_id: master_user.line_id ?? '',
					phone_number: master_user.phone_number ?? '',
					birthday: master_user.birthday ?? '',
					address: master_user.address ?? '',
					username: master_user.username ?? '',
					img_path: master_user.img_path ?? '',
					role: master_user.role ?? '',
				};
			}),
		);
	}, [props.master_users]);

	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
		email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
		nim: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
		line_id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
		phone_number: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
		birthday: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
		address: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
		username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
		role: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	});
	const [globalFilterValue, setGlobalFilterValue] = useState('');
	const [loading, setLoading] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectIdUser, setSelectIdUser] = useState(0);
	const dt = useRef(null);

	useEffect(() => {
		setLoading(false);
	}, []);

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		let _filters = { ...filters };

		_filters['global'].value = value;

		setFilters(_filters);
		setGlobalFilterValue(value);
	};

	// search
	const renderHeader = () => {
		return (
			<div className="flex flex-col justify-between gap-2 md:flex-row">
				<div className="justify-content-end export-buttons flex flex-col-reverse items-center gap-2 md:flex-row">
					<IconField iconPosition="left">
						<InputIcon className="pi pi-search" />
						<InputText
							value={globalFilterValue}
							onChange={onGlobalFilterChange}
							placeholder="Ketik kata kunci"
							className="p-inputtext p-inputtext-lg"
						/>
					</IconField>
					<div className="flex flex-row gap-2">
						<Button
							type="button"
							className="rounded-[500px] bg-[#785233] px-5 py-5"
							variant="none"
							rounded
							onClick={() => exportCSV(false)}
							data-pr-tooltip="Export CSV"
						>
							<DocumentPlusIcon className="h-5 w-5 text-white" />
						</Button>
						<Button
							type="button"
							variant="none"
							className="rounded-[500px] bg-yellow-500 px-5 py-5"
							severity="success"
							rounded
							onClick={exportExcel}
							data-pr-tooltip="Export XLS"
						>
							<DocumentArrowDownIcon className="h-5 w-5 text-white" />
						</Button>
					</div>
				</div>
				<Button variant="gold" type="button" asChild className="shadow-[0_0_15px_#ECBB4E]">
					<Link as="button" href={route('master-user.create')} className="py-5 text-[14px] font-bold">
						<PlusIcon className="h-5 w-5 text-white" />
						Tambah Mahasiswa
					</Link>
				</Button>
			</div>
		);
	};

	// export
	const exportCSV = (selectionOnly) => {
		dt.current.exportCSV({ selectionOnly });
	};
	const exportExcel = () => {
		import('xlsx').then((xlsx) => {
			const exportData = master_users.map((master_user) => ({
				Nama: master_user.name ?? '',
				NIM: master_user.nim ?? '',
				Email: master_user.email ?? '',
				LineID: master_user.line_id ?? '',
				NomorTelepon: master_user.phone_number ?? '',
				TanggalLahir: master_user.birthday ?? '',
				Alamat: master_user.address ?? '',
				Username: master_user.username ?? '',
				Role: master_user.role ?? '',
			}));
			const worksheet = xlsx.utils.json_to_sheet(exportData);
			const workbook = { Sheets: { master_mahasiswa: worksheet }, SheetNames: ['master_mahasiswa'] };
			const excelBuffer = xlsx.write(workbook, {
				bookType: 'xlsx',
				type: 'array',
			});

			saveAsExcelFile(excelBuffer, 'master_users');
		});
	};

	const saveAsExcelFile = (buffer, fileName) => {
		import('file-saver').then((module) => {
			if (module && module.default) {
				let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
				let EXCEL_EXTENSION = '.xlsx';
				const data = new Blob([buffer], {
					type: EXCEL_TYPE,
				});

				module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
			}
		});
	};

	// numbering
	const rowNumberTemplate = (rowData, column) => column.rowIndex + 1;

	// image path
	const profileImageTemplate = (rowData) => {
		return (
			<>
				{rowData.img_path ? (
					// <AvatarImage src={rowData.img_path} alt={rowData.name} className="object-cover w-full h-auto" />
					<div className="h-16 w-16 overflow-hidden rounded-[500px] border-2">
						<img
							src={rowData.img_path}
							alt={rowData.name}
							className="hover:scale-120 h-full w-auto object-cover object-center transition-all duration-300 ease-in-out"
						/>
					</div>
				) : (
					<Avatar className="h-16 w-16">
						<AvatarFallback>{rowData.nim?.substring(0, 2)}</AvatarFallback>
					</Avatar>
				)}
			</>
		);
	};

	const modalFormOpenHandler = (userId) => {
		setModalOpen(true);
		setSelectIdUser(userId);
	};

	const closeModal = () => {
		setModalOpen(false);
		setSelectIdUser(0);
	};

	// action template
	const actionTemplate = (rowData) => {
		return (
			<>
				<div className="action_buttons flex flex-row items-center gap-2">
					<Button variant="none" data-pr-tooltip="Edit data" className="w-0">
						<Link
							className="flex items-center justify-center rounded-md border-2 border-[#dfe44d] p-1.5 transition-all duration-300 ease-in-out hover:bg-[#dfe44d]/20"
							type="button"
							href={route('master-user.edit', rowData.id)}
						>
							<PencilSquareIcon className="h-5 w-5 text-[#dfe44d]" />
						</Link>
					</Button>

					<Button
						variant="none"
						className="flex items-center justify-center rounded-md border-2 border-[#E82323] p-1.5 transition-all duration-300 ease-in-out hover:bg-[#E82323]/20"
						data-pr-tooltip="Hapus data"
						onClick={() => modalFormOpenHandler(rowData.id)}
					>
						<XCircleIcon className="h-5 w-5 text-[#E82323]" />
					</Button>
				</div>
			</>
		);
	};

	const roleTemplate = (rowData) => {
		return rowData.role == 'divisi_it' ? (
			<span>Admin</span>
		) : rowData.role == 'ketua_kegiatan' ? (
			<span>Ketua Kegiatan</span>
		) : (
			<span>Mahasiswa</span>
		);
	};
	return (
		<>
			<div className="py-5">
				<div className="flex flex-col justify-between gap-5 rounded-lg bg-white p-4 shadow dark:bg-[#1F1F1F] sm:p-8">
					<div className="mt-5 flex flex-col justify-between gap-2 md:flex-row">
						<div className="flex flex-row gap-10 rounded-[14px] border-2 border-[#ecbb4e]/20 bg-white p-5 dark:bg-[#101010]">
							<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ecbb4e]/20">
								<IconMasterUser width={30} height={30} />
							</div>
							<div className="flex flex-col gap-0">
								<p className="light:text-[#202224]/70 text-[16px] font-medium tracking-[0.03em]">
									Jumlah Pengguna
								</p>
								<p className="text-[28px] font-bold tracking-[1px]">{total_user}</p>
							</div>
						</div>
					</div>
					<Card className="rounded-xl dark:border dark:border-white dark:bg-[#101010]">
						<CardContent className="overflow-hidden">
							<div className="my-8">
								<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-5 lg:-mx-8">
									<Tooltip target=".export-buttons>button" position="bottom" />
									<Tooltip target=".action_buttons>button" position="bottom" />
									<DataTable
										header={renderHeader()}
										value={users}
										ref={dt}
										paginator
										rows={5}
										loading={loading}
										filters={filters}
										globalFilterFields={[
											'name',
											'email',
											'nim',
											'line_id',
											'phone_number',
											'address',
											'username',
										]}
										emptyMessage="Tidak ada user yang tersedia."
										rowsPerPageOptions={[5, 10, 25, 50]}
										tableStyle={{ minWidth: '50rem' }}
										paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
										currentPageReportTemplate="showing {first} to {last} of {totalRecords} results"
										pt={{
											table: { className: 'rounded-[20px] overflow-hidden' },
											column: { headerCell: { className: 'dark:bg-[#101010] dark:text-white' } },
											paginatorDropdown: {
												root: {
													className: 'dark:bg-[#101010] dark:text-gray-300 dark:border-none',
												},
												panel: {
													className: 'dark:bg-[#101010] dark:text-gray-300',
												},
												item: {
													className: 'dark:hover:bg-gray-700 dark:hover:text-white',
												},
											},
										}}
										rowClassName={() =>
											'hover:bg-gray-100 dark:bg-[#101010] dark:hover:bg-[#1F1F1F] transition-colors duration-200 dark:text-gray-400'
										}
									>
										<Column
											field="number"
											header="No"
											body={rowNumberTemplate}
											className="min-w-[5rem]"
										></Column>
										<Column
											field="name"
											header="Nama"
											body={(rowData) => (rowData.name ? rowData.name : '-')}
											className="min-w-[12rem]"
										></Column>
										<Column
											field="nim"
											header="NIM"
											body={(rowData) => (rowData.nim ? rowData.nim : '-')}
											className="min-w-[12rem]"
										></Column>
										<Column
											field="email"
											header="Email"
											body={(rowData) => (rowData.email ? rowData.email : '-')}
											className="min-w-[12rem]"
										></Column>
										<Column
											field="line_id"
											header="ID Line"
											body={(rowData) => (rowData.line_id ? rowData.line_id : '-')}
											className="min-w-[12rem]"
										></Column>
										<Column
											field="phone_number"
											header="Phone Number"
											body={(rowData) => (rowData.phone_number ? rowData.phone_number : '-')}
											className="min-w-[12rem]"
										></Column>
										<Column
											field="birthday"
											header="Tanggal Lahir"
											body={(rowData) => (rowData.birthday ? rowData.birthday : '-')}
											className="min-w-[12rem]"
										></Column>
										<Column
											field="address"
											header="Alamat"
											body={(rowData) => (rowData.address ? rowData.address : '-')}
											className="min-w-[12rem]"
										></Column>
										<Column
											field="img_path"
											header="Poto Profil"
											body={profileImageTemplate}
											className="min-w-[15rem]"
										></Column>
										<Column
											field="role"
											header="Role"
											body={roleTemplate}
											className="min-w-[12rem]"
										></Column>
										<Column
											field="action"
											header="Aksi"
											body={actionTemplate}
											className="min-w-[12rem]"
										></Column>
									</DataTable>
									<Modal show={modalOpen} onClose={closeModal} maxWidth="md">
										<div className="p-5 dark:bg-[#101010]">
											<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
												Apakah anda yakin menghapus mahasiswa ini
											</h2>

											<p className="mt-1 text-sm text-gray-600 dark:text-white">
												Anda tidak akan dapat mengembalikan data ini.
											</p>

											<div className="mt-10 flex flex-row justify-end gap-5">
												<Button onClick={closeModal} variant="gold" type="button">
													Cancel
												</Button>
												<Button
													variant="red"
													onClick={() => {
														router.delete(
															route('master-user.destroy', { id: selectIdUser }),
															{
																preserveScroll: true,
																preserveState: true,
																onSuccess: () => {
																	closeModal();
																},
															},
														);
													}}
												>
													Hapus
												</Button>
											</div>
										</div>
									</Modal>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}

Index.layout = (page) => (
	<DashboardLayout
		children={page}
		title={'Master User'}
		header={'Master User'}
		description={'Kelola mahasiswa himpunan Teknologi Informasi di page ini'}
	/>
);
