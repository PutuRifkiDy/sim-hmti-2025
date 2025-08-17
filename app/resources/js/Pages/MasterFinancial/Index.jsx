import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import DashboardLayout from '@/Layouts/DashboardLayout';
import {
	ArrowLeftIcon,
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
	// const financial = usePage().props.financial;
	const { props } = usePage();
	const master_financials = usePage().props.master_financials;
	const period = usePage().props.period;

	const flash_message = usePage().props.flash_message;
	useEffect(() => {
		if (flash_message?.message) {
			toast[flash_message.type || 'success'](flash_message.message);
		}
	}, [flash_message]);

	const [financials, setFinancials] = useState(master_financials);
	const [selectIdFinancial, setSelectIdFinancial] = useState(0);
	const [globalFilterValue, setGlobalFilterValue] = useState('');
	const [loading, setLoading] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);

	const modalFormOpenHandler = (financialId) => {
		setModalOpen(true);
		setSelectIdFinancial(financialId);
	};

	useEffect(() => {
		setLoading(false);
	}, []);

	const closeModal = () => {
		setModalOpen(false);
		setSelectIdFinancial(0);
	};

	const dt = useRef(null);

	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
		month: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
		total_income: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	});

	useEffect(() => {
		setFinancials(
			props.master_financials.map((master_financial) => {
				return {
					id: master_financial.id,
					title: master_financial.title ?? '',
					month: master_financial.month ?? '',
					total_income: master_financial.total_income ?? '',
					period: master_financial.period,
				};
			}),
		);
	}, [props.master_financials]);

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		let _filters = { ...filters };

		_filters['global'].value = value;

		setFilters(_filters);
		setGlobalFilterValue(value);
	};

	const exportExcel = () => {
		import('xlsx').then((xlsx) => {
			const exportData = master_financials.map((financial) => ({
				ID: financial.id ?? '',
				Judul: financial.title ?? '',
				Bulan: financial.month ?? '',
				'Total Income': financial.total_income ?? '',
			}));
			const worksheet = xlsx.utils.json_to_sheet(exportData);
			const workbook = { Sheets: { master_financials: worksheet }, SheetNames: ['master_financials'] };
			const excelBuffer = xlsx.write(workbook, {
				bookType: 'xlsx',
				type: 'array',
			});

			saveAsExcelFile(excelBuffer, 'master_financials');
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
	const exportCSV = (selectionOnly) => {
		dt.current.exportCSV({ selectionOnly });
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
					<Link
						as="button"
						href={route('master-financial.create', { id: period.id })}
						className="py-5 text-[14px] font-bold"
					>
						<PlusIcon className="h-5 w-5 text-white" />
						Tambah Keuangan
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
							href={route('master-financial.edit', rowData.id)}
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
					<div className="flex w-full flex-row justify-between">
						<header>
							<h2 className="text-lg font-medium text-gray-900 dark:text-white">
								Daftar keuangan di Periode {period.title}
							</h2>

							<p className="mt-1 text-sm text-gray-600">Kelola keuangan di periode ini</p>
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
							<p>{period.title ? period.title : '-'}</p>
						</div>
						<div>
							<InputLabel
								htmlFor="start_date"
								value="Tanggal Mulai"
								className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
							/>
							<p>{dateFormat(period.start_date)}</p>
						</div>
						<div>
							<InputLabel
								htmlFor="end_date"
								value="Tanggal Selesai"
								className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
							/>
							<p>{dateFormat(period.end_date)}</p>
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
										value={financials}
										ref={dt}
										paginator
										rows={5}
										loading={loading}
										filters={filters}
										globalFilterFields={['title', 'month', 'total_income']}
										emptyMessage="Tidak ada keuangan yang tersedia."
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
											field="title"
											header="Judul"
											body={(rowData) => rowData.title ?? '-'}
											className="min-w-[12rem]"
										></Column>
										<Column
											field="month"
											header="Bulan"
											body={(rowData) => rowData.month ?? '-'}
											className="min-w-[20rem]"
										></Column>
										<Column
											field="total_income"
											header="Total"
											body={(rowData) => rowData.total_income ?? '-'}
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
												Apakah anda yakin menghapus data ini
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
															route('master-financial.destroy', {
																id: selectIdFinancial,
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
		title={'Master Financial'}
		header={'Master Financial'}
		description={'Kelola financial himpunan di page ini'}
	/>
);
