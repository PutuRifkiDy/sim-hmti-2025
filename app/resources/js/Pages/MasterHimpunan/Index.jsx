import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import DashboardLayout from '@/Layouts/DashboardLayout';
import {
	ArrowLeftIcon,
	DocumentArrowDownIcon,
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
	const positions = usePage().props.positions;
	const himpunan_members_in_this_periode = usePage().props.himpunan_members_in_this_periode;
	const periode = usePage().props.periode;

	const flash_message = usePage().props.flash_message;
	useEffect(() => {
		if (flash_message?.message) {
			toast[flash_message.type || 'success'](flash_message.message);
		}
	}, [flash_message]);

	const [himpunanMembers, setHimpunanMembers] = useState(himpunan_members_in_this_periode);
	const [selectIdHimpunanMembers, setSelectIdMembers] = useState(0);
	const [globalFilterValue, setGlobalFilterValue] = useState('');
	const [loading, setLoading] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);

	const modalFormOpenHandler = (himpunanMembersId) => {
		setModalOpen(true);
		setSelectIdMembers(himpunanMembersId);
	};

	useEffect(() => {
		setLoading(false);
	}, []);

	const closeModal = () => {
		setModalOpen(false);
		setSelectIdMembers(0);
	};

	const dt = useRef(null);

	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		title: { value: null, matchMode: FilterMatchMode.EQUALS },
		nim: { value: null, matchMode: FilterMatchMode.EQUALS },
		name: { value: null, matchMode: FilterMatchMode.EQUALS },
		period: { value: null, matchMode: FilterMatchMode.EQUALS },
	});

	useEffect(() => {
		setHimpunanMembers(
			props.himpunan_members_in_this_periode.map((himpunan_member) => {
				return {
					id: himpunan_member.id,
					position_id: himpunan_member.position_id,
					user_id: himpunan_member.user_id,
					img_himpunan_path: himpunan_member.img_himpunan_path,
					period_id: himpunan_member.period_id,
					position: himpunan_member.position,
					user: himpunan_member.user,
					period: himpunan_member.period,
				};
			}),
		);
	}, [props.himpunan_members_in_this_periode]);

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		let _filters = { ...filters };

		_filters['global'].value = value;

		setFilters(_filters);
		setGlobalFilterValue(value);
	};

	const exportExcel = () => {
		import('xlsx').then((xlsx) => {
			const exportData = himpunan_members_in_this_periode.map((himpunanMembers) => ({
				ID: himpunanMembers.id ?? '',
				Nama: himpunanMembers.user.name ?? '',
				NIM: himpunanMembers.user.nim ?? '',
				Email: himpunanMembers.user.email ?? '',
				LineID: himpunanMembers.user.line_id ?? '',
				NomorTelepon: himpunanMembers.user.phone_number ?? '',
				TanggalLahir: himpunanMembers.user.birthday ?? '',
				Alamat: himpunanMembers.user.address ?? '',
				Username: himpunanMembers.user.username ?? '',
				Periode: himpunanMembers.period.title ?? '',
				Jabatan: himpunanMembers.position.title ?? '',
			}));
			const worksheet = xlsx.utils.json_to_sheet(exportData);
			const workbook = { Sheets: { master_himpunans: worksheet }, SheetNames: ['master_himpunans'] };
			const excelBuffer = xlsx.write(workbook, {
				bookType: 'xlsx',
				type: 'array',
			});

			saveAsExcelFile(excelBuffer, 'master_himpunans');
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
					{/* <Button type="button" className="bg-[#0f114c] px-5 py-5 rounded-[500px]" variant="none" rounded onClick={() => exportCSV(false)} data-pr-tooltip="Export CSV">
                        <DocumentPlusIcon className="w-5 h-5 text-white" />
                    </Button> */}
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
				<Button variant="gold" type="button" asChild className="shadow-[0_0_15px_#ECBB4E]">
					<Link
						as="button"
						href={route('master-himpunan.create', { id: periode.id })}
						className="py-5 text-[14px] font-bold"
					>
						<PlusIcon className="h-5 w-5 text-white" />
						Tambah Fungsionaris
					</Link>
				</Button>
			</div>
		);
	};

	const rowNumberTemplate = (rowData, column) => column.rowIndex + 1;

	const actionTemplate = (rowData) => {
		return (
			<>
				<div className="action_buttons flex flex-row items-center gap-2">
					<Button variant="none" data-pr-tooltip="Edit data" className="w-0">
						<Link
							className="flex items-center justify-center rounded-md border-2 border-[#dfe44d] p-1.5 transition-all duration-300 ease-in-out hover:bg-[#dfe44d]/20"
							type="button"
							href={route('master-himpunan.edit', rowData.id)}
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

	const penjabatTemplate = (rowData) => {
		return (
			<>
				<div className="flex flex-row items-center gap-2">
					<Avatar>
						{rowData.user.img_path ? (
							<AvatarImage
								src={rowData.user.img_path}
								alt={rowData.user.name}
								className="w-full object-cover"
							/>
						) : (
							<AvatarFallback>{rowData.user.nim?.substring(0, 2)}</AvatarFallback>
						)}
					</Avatar>
					{rowData.user.name ? rowData.user.name : rowData.user.nim}
				</div>
			</>
		);
	};

	const imgHimpunanTemplate = (rowData) => {
		return (
			<>
				<div className="flex flex-row items-center gap-2">
					<Avatar>
						{rowData.img_himpunan_path ? (
							<AvatarImage
								src={rowData.img_himpunan_path}
								alt={rowData.user.name}
								className="w-full object-cover"
							/>
						) : (
							<AvatarFallback>{rowData.user.nim?.substring(0, 2)}</AvatarFallback>
						)}
					</Avatar>
					{rowData.position.title ? rowData.position.title : '-'}
				</div>
			</>
		);
	};

	return (
		<>
			<div className="py-5">
				<div className="flex flex-col justify-between gap-5 rounded-lg bg-white p-4 shadow dark:bg-[#1F1F1F] sm:p-8">
					<div className="flex w-full flex-row justify-between gap-2">
						<header>
							<h2 className="text-lg font-medium text-gray-900 dark:text-white">
								Daftar Anggota Himpunan di Periode {periode.title}
							</h2>

							<p className="mt-1 text-sm text-gray-600">Kelola daftar anggota himpunan di periode ini</p>
						</header>

						<Button variant="gold" type="button" asChild className="shadow-[0_0_15px_#ECBB4E]">
							<Link
								as="button"
								href={route('master-period.index')}
								className="flex flex-row items-center text-[14px] font-bold"
							>
								<ArrowLeftIcon className="mr-2 h-3 w-3 font-bold" />
								Kembali
							</Link>
						</Button>
					</div>
					<div className="mb-5 mt-2 grid grid-cols-1 gap-5 md:grid-cols-3">
						<div>
							<InputLabel
								htmlFor="title"
								value="Periode"
								className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
							/>
							<p>{periode.title ? periode.title : '-'}</p>
						</div>
						<div>
							<InputLabel
								htmlFor="start_date"
								value="Tanggal Mulai"
								className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
							/>
							<p>{periode.start_date ? periode.start_date : '-'}</p>
						</div>
						<div>
							<InputLabel
								htmlFor="end_date"
								value="Tanggal Selesai"
								className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
							/>
							<p>{periode.end_date ? periode.end_date : '-'}</p>
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
										value={himpunanMembers}
										ref={dt}
										paginator
										rows={5}
										loading={loading}
										filters={filters}
										globalFilterFields={['position.title', 'user.nim', 'user.name']}
										emptyMessage="Tidak ada fungsionaris yang tersedia di periode ini."
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
											field="position.title"
											header="Jabatan"
											body={imgHimpunanTemplate}
											className="min-w-[12rem]"
										></Column>
										<Column
											field="user.name"
											header="Penjabat"
											body={penjabatTemplate}
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
												Apakah anda yakin menghapus fungsionaris ini
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
															route('master-himpunan.destroy', {
																id: selectIdHimpunanMembers,
															}),
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
		title={'Master Himpunan'}
		header={'Master Himpunan'}
		description={'Kelola master himpunan di page ini'}
	/>
);
