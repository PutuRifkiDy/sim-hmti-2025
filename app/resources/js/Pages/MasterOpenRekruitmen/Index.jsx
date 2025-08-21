import { IconMasterOprec } from '@/Components/IconAdmin';
import Modal from '@/Components/Modal';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import DashboardLayout from '@/Layouts/DashboardLayout';
import {
	DocumentArrowDownIcon,
	EyeIcon,
	PencilSquareIcon,
	PlusIcon,
	UserIcon,
	XCircleIcon,
} from '@heroicons/react/24/solid';
import { Link, router, usePage } from '@inertiajs/react';
import DOMPurify from 'dompurify';
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
	const oprecs = usePage().props.oprecs;
	const total_oprec = usePage().props.total_oprec;
	const total_registered = usePage().props.total_registered;
	const date_now = usePage().props.date_now;

	const flash_message = usePage().props.flash_message;
	useEffect(() => {
		if (flash_message?.message) {
			toast[flash_message.type || 'success'](flash_message.message);
		}
	}, [flash_message]);

	const [oprecsData, setOprecData] = useState(oprecs);
	const [selectIdOprecs, setSelectIdOprecs] = useState(0);
	const [globalFilterValue, setGlobalFilterValue] = useState('');
	const [loading, setLoading] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);

	const modalFormOpenHandler = (oprecId) => {
		setModalOpen(true);
		setSelectIdOprecs(oprecId);
	};

	useEffect(() => {
		setLoading(false);
	}, []);

	const closeModal = () => {
		setModalOpen(false);
		setSelectIdOprecs(0);
	};

	const dt = useRef(null);

	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		oprec_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
		description: { value: null, matchMode: FilterMatchMode.CONTAINS },
		start_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
		end_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
		postmsg: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});

	useEffect(() => {
		setOprecData(
			props.oprecs?.map((oprec) => {
				return {
					id: oprec.id,
					oprec_name: oprec.oprec_name ?? '',
					description: oprec.description ?? '',
					start_date: oprec.start_date ?? '',
					end_date: oprec.end_date ?? '',
					poster_path: oprec.poster_path ?? '',
					postmsg: oprec.postmsg ?? '',
				};
			}),
		);
	}, [props.oprecs]);

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		let _filters = { ...filters };

		_filters['global'].value = value;

		setFilters(_filters);
		setGlobalFilterValue(value);
	};

	const exportExcel = () => {
		import('xlsx').then((xlsx) => {
			const exportData = oprecs.map((oprec) => ({
				ID: oprec.id ?? '',
				Title: oprec.oprec_name ?? '',
				Description: oprec.description ?? '',
				StartDate: oprec.start_date ?? '',
				EndDate: oprec.end_date ?? '',
				PosterPath: oprec.poster_path ?? '',
				PostMsg: oprec.postmsg ?? '',
			}));
			const worksheet = xlsx.utils.json_to_sheet(exportData);
			const workbook = { Sheets: { master_oprecs: worksheet }, SheetNames: ['master_oprecs'] };
			const excelBuffer = xlsx.write(workbook, {
				bookType: 'xlsx',
				type: 'array',
			});

			saveAsExcelFile(excelBuffer, 'master_oprecs');
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
						onClick={exportExcel}
						data-pr-tooltip="Export XLS"
					>
						<DocumentArrowDownIcon className="h-5 w-5 text-white" />
					</Button>
				</div>
				<Button variant="gold" type="button" asChild className="shadow-[0_0_15px_#ECBB4E]">
					<Link
						as="button"
						href={route('master-open-rekruitmen.create')}
						className="py-5 text-[14px] font-bold"
					>
						<PlusIcon className="h-5 w-5 text-white" />
						Tambah Oprec
					</Link>
				</Button>
			</div>
		);
	};

	const actionTemplate = (rowData) => {
		return (
			<>
				<div className="action_buttons flex flex-row items-center gap-2">
					<Button variant="none" data-pr-tooltip="Lihat pendaftar" className="w-0">
						<Link
							className="flex items-center justify-center rounded-md border-2 border-[#00D238] p-1.5 transition-all duration-300 ease-in-out hover:bg-[#00D238]/20"
							type="button"
							href={route('master-open-rekruitmen.see-registered', rowData.id)}
						>
							<EyeIcon className="h-5 w-5 text-[#00D238]" />
						</Link>
					</Button>

					<Button variant="none" data-pr-tooltip="Edit data" className="w-0">
						<Link
							className="flex items-center justify-center rounded-md border-2 border-[#dfe44d] p-1.5 transition-all duration-300 ease-in-out hover:bg-[#dfe44d]/20"
							type="button"
							href={route('master-open-rekruitmen.edit', rowData.id)}
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

	const imgOprecTemplate = (rowData) => {
		return (
			<>
				<div className="max-w-fit overflow-hidden rounded-lg">
					<img
						src={rowData?.poster_path ? `${rowData.poster_path}` : 'assets/icon/default_image_profile.png'}
						className="h-64 w-auto transform transition-all duration-300 ease-in-out hover:scale-105"
						alt=""
					/>
				</div>
			</>
		);
	};

	const descriptionTemplate = (rowData) => {
		const cleanDescription = DOMPurify.sanitize(rowData.description);

		return <div dangerouslySetInnerHTML={{ __html: cleanDescription }} className="line-clamp-5 w-full" />;
	};

	const totalPendaftarTemplate = (rowData) => {
		const totalRegistered = total_registered[rowData.id] || 0;
		if (date_now >= rowData.start_date && date_now <= rowData.end_date) {
			return (
				<div className="flex flex-col items-center gap-1">
					<div className="flex flex-row items-center gap-2">
						<UserIcon className="h-5 w-5 text-gray-500 dark:text-white" />
						<p>{totalRegistered} Pendaftar</p>
					</div>
					<p className="text-[#00D238]">Berlangsung</p>
				</div>
			);
		} else {
			return (
				<div className="flex flex-col items-center gap-1">
					<div className="flex flex-row items-center gap-2">
						<UserIcon className="h-5 w-5 text-gray-500 dark:text-white" />
						<p>{totalRegistered} Pendaftar</p>
					</div>
					<p className="text-[#E82323]">Selesai</p>
				</div>
			);
		}
	};

    const dateFormat = (date_parameter) => {
        if (!date_parameter) return '-';

        const date = new Date(date_parameter);
        return date.toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

	return (
		<>
			<div className="py-5">
				<div className="flex flex-col justify-between gap-5 rounded-lg bg-white p-4 shadow dark:bg-[#1F1F1F] sm:p-8">
					<div className="mt-5 flex flex-col justify-between gap-2 md:flex-row">
						<div className="flex flex-row gap-10 rounded-[14px] border-2 border-[#ecbb4e]/20 bg-white p-5 dark:bg-[#101010]">
							<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ecbb4e]/20">
								<IconMasterOprec width={30} height={30} />
							</div>
							<div className="flex flex-col gap-0">
								<p className="light:text-[#202224]/70 text-[16px] font-medium tracking-[0.03em]">
									Jumlah Open Rekruitmen
								</p>
								<p className="text-[28px] font-bold tracking-[1px]">{total_oprec}</p>
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
										value={oprecsData}
										ref={dt}
										paginator
										rows={5}
										loading={loading}
										filters={filters}
										globalFilterFields={[
											'oprec_name',
											'description',
											'postmsg',
											'start_date',
											'end_date',
										]}
										emptyMessage="Tidak ada oprec yang tersedia"
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
											field="poster_path"
											header="Poster"
											body={imgOprecTemplate}
											className="min-w-[18rem]"
										></Column>
										<Column
											field="oprec_name"
											header="Nama"
											body={(rowData) => rowData.oprec_name ?? '-'}
											className="min-w-[12rem]"
										></Column>
										<Column
											field="description"
											header="Deskripsi"
											body={descriptionTemplate}
											className="min-w-[20rem]"
										></Column>
										<Column
											field="start_date"
											header="Tanggal Mulai"
											body={(rowData) => dateFormat(rowData.start_date)}
											className="min-w-[12rem]"
										></Column>
										<Column
											field="end_date"
											header="Tanggal Selesai"
											body={(rowData) => dateFormat(rowData.end_date)}
											className="min-w-[12rem]"
										></Column>
										<Column
											field="end_date"
											header="Pesan"
											body={(rowData) => rowData.postmsg ?? '-'}
											className="min-w-[12rem]"
										></Column>
										<Column
											field="total_pendaftar"
											header="Total Pendaftar"
											body={totalPendaftarTemplate}
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
												Apakah anda yakin menghapus open recruitmen ini
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
															route('master-open-rekruitmen.destroy', {
																id: selectIdOprecs,
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
		title={'Master Open Rekruitmen'}
		header={'Master Open Recruitmen'}
		description={'Kelola master open recruitmen di page ini'}
	/>
);
