import { IconMasterJabatan } from '@/Components/IconAdmin';
import Modal from '@/Components/Modal';
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
	const master_positions = usePage().props.master_positions;
	const total_position = usePage().props.total_position;
	const { props } = usePage();


	const flash_message = usePage().props.flash_message;
	useEffect(() => {
		if (flash_message?.message) {
			toast[flash_message.type || 'success'](flash_message.message);
		}
	}, [flash_message]);

	const [positions, setPositions] = useState(master_positions);
	const [selectIdPosition, setSelectIdPosition] = useState(0);
	const [globalFilterValue, setGlobalFilterValue] = useState('');
	const [loading, setLoading] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);

	const modalFormOpenHandler = (sieId) => {
		setModalOpen(true);
		setSelectIdPosition(sieId);
	};

	useEffect(() => {
		setLoading(false);
	}, []);

	const closeModal = () => {
		setModalOpen(false);
		setSelectIdPosition(0);
	};

	const dt = useRef(null);
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
	});

	useEffect(() => {
		setPositions(
			props.master_positions.map((master_position) => {
				return {
					id: master_position.id,
					title: master_position.title ?? '',
					parent_id: master_position.parent_id ?? '',
					parents: master_position.parents,
				};
			}),
		);
	}, [props.master_positions]);

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		let _filters = { ...filters };

		_filters['global'].value = value;

		setFilters(_filters);
		setGlobalFilterValue(value);
	};

	const exportCSV = (selectionOnly) => {
		dt.current.exportCSV({ selectionOnly });
	};
	const exportExcel = () => {
		import('xlsx').then((xlsx) => {
			const exportData = master_positions.map((master_position) => ({
				ID: master_position.id ?? '',
				Title: master_position.title ?? '',
			}));
			const worksheet = xlsx.utils.json_to_sheet(exportData);
			const workbook = { Sheets: { master_position: worksheet }, SheetNames: ['master_position'] };
			const excelBuffer = xlsx.write(workbook, {
				bookType: 'xlsx',
				type: 'array',
			});

			saveAsExcelFile(excelBuffer, 'master_positions');
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

	const rowNumberTemplate = (rowData, column) => column.rowIndex + 1;

	const renderHeader = () => {
		return (
			<div className="flex flex-col justify-between gap-2 md:flex-row">
				<div className="justify-content-end flex flex-col-reverse items-center gap-2 md:flex-row">
					<IconField iconPosition="left">
						<InputIcon className="pi pi-search" />
						<InputText
							value={globalFilterValue}
							onChange={onGlobalFilterChange}
							placeholder="Ketik kata kunci"
							className="p-inputtext p-inputtext-lg"
						/>
					</IconField>
					<div className="flex flex-row gap-2 export-buttons">
						<Button
							type="button"
							className="rounded-[500px] bg-[#785233] px-5 py-5"
							variant="none"
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
							onClick={exportExcel}
							data-pr-tooltip="Export XLS"
						>
							<DocumentArrowDownIcon className="h-5 w-5 text-white" />
						</Button>
					</div>
				</div>
				<Button variant="gold" type="button" asChild className="shadow-[0_0_15px_#ECBB4E]">
					<Link as="button" href={route('master-position.create')} className="py-5 text-[14px] font-bold">
						<PlusIcon className="h-5 w-5 text-white" />
						Tambah Jabatan
					</Link>
				</Button>
			</div>
		);
	};

	const actionTemplate = (rowData) => {
		return (
			<>
				<div className="action_buttons flex flex-row items-center gap-2">
					<Button variant="none" data-pr-tooltip="Edit data" className="w-0">
						<Link
							className="flex items-center justify-center rounded-md border-2 border-[#dfe44d] p-1.5 transition-all duration-300 ease-in-out hover:bg-[#dfe44d]/20"
							type="button"
							href={route('master-position.edit', rowData.id)}
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
	return (
		<>
			<div className="py-5">
				<div className="flex flex-col justify-between gap-5 rounded-lg bg-white p-4 shadow dark:bg-[#1F1F1F] sm:p-8">
					<div className="mt-5 flex flex-col justify-between gap-2 md:flex-row">
						<div className="flex flex-row gap-10 rounded-[14px] border-2 border-[#ecbb4e]/20 bg-white p-5 dark:bg-[#101010]">
							<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ecbb4e]/20">
								<IconMasterJabatan width={30} height={30} />
							</div>
							<div className="flex flex-col gap-0">
								<p className="light:text-[#202224]/70 text-[16px] font-medium tracking-[0.03em]">
									Jumlah Jabatan
								</p>
								<p className="text-[28px] font-bold tracking-[1px]">{total_position}</p>
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
										value={positions}
										ref={dt}
										paginator
										rows={5}
										loading={loading}
										filters={filters}
										globalFilterFields={['sie_name']}
										emptyMessage="Tidak ada sie yang tersedia."
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
											header="Nama Jabatan"
											body={(rowData) => (rowData.title ? rowData.title : '-')}
											className="min-w-[12rem]"
										></Column>
										<Column
											field="parent_id"
											header="Induk Jabatan"
											body={(rowData) =>
												rowData?.parents?.title ? rowData?.parents?.title : '-'
											}
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
												Apakah anda yakin menghapus jabatan ini
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
															route('master-position.destroy', { id: selectIdPosition }),
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
		title={'Master Position'}
		header={'Master Position'}
		description={'Kelola master position di page ini'}
	/>
);
