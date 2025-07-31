import { IconPreviewImageProfile } from "@/Components/IconAdmin";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { ArrowLeftIcon, DocumentArrowDownIcon, DocumentPlusIcon, PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Link, router, usePage } from "@inertiajs/react";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Index() {
    const { props } = usePage();
    const prokers = usePage().props.prokers;
    const period = usePage().props.period;

    const flash_message = usePage().props.flash_message;
    useEffect(() => {
        if (flash_message?.message) {
            toast[flash_message.type || 'success'](flash_message.message);
        }
    }, [flash_message]);

    const [programKerjas, setProgramKerjas] = useState(prokers);
    const [selectIdProgramKerjas, setSelectIdProgramKerjas] = useState(0);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    const modalFormOpenHandler = (programKerjaId) => {
        setModalOpen(true);
        setSelectIdProgramKerjas(programKerjaId);
    }

    useEffect(() => {
        setLoading(false);
    }, []);

    const closeModal = () => {
        setModalOpen(false);
        setSelectIdProgramKerjas(0);
    }

    const dt = useRef(null);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    useEffect(() => {
        setProgramKerjas(
            props.prokers.map((proker) => {
                return {
                    id: proker.id,
                    title: proker.title ?? '',
                    description: proker.description ?? '',
                    img_path: proker.img_path ?? '',
                    period: proker.period
                };
            })
        );
    }, [props.prokers]);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {

            const exportData = prokers.map(proker => ({
                ID: proker.id ?? '',
                title: proker.title ?? '',
                description: proker.description ?? '',
            }));
            const worksheet = xlsx.utils.json_to_sheet(exportData);
            const workbook = { Sheets: { 'master_prokers': worksheet }, SheetNames: ['master_prokers'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'master_prokers');
        });
    };

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
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
            <div className="flex md:flex-row justify-between flex-col">
                <div className="flex items-center justify-content-end gap-2 export-buttons">
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" className="p-inputtext p-inputtext-sm" />
                    </IconField>
                    <Button type="button" className="bg-[#0f114c] px-5 py-5 rounded-[500px]" variant="none" rounded onClick={() => exportCSV(false)} data-pr-tooltip="Export CSV">
                        <DocumentPlusIcon className="w-5 h-5 text-white" />
                    </Button>
                    <Button type="button" variant="none" className="bg-yellow-500 px-5 py-5 rounded-[500px]" severity="success" rounded onClick={exportExcel} data-pr-tooltip="Export XLS">
                        <DocumentArrowDownIcon className="w-5 h-5 text-white" />
                    </Button>
                </div>
                <Button variant="blue" type="button" asChild>
                    <Link as="button" href={route('master-program-kerja.create', { id: period.id })} className="text-[14px] font-bold py-5">Tambah Program Kerja</Link>
                </Button>
            </div>
        );
    };

    const rowNumberTemplate = (rowData, column) => column.rowIndex + 1;

    const actionTemplate = (rowData) => {
        return (
            <>
                <div className="flex flex-row gap-2 items-center action_buttons">

                    <Button
                        variant="none"
                        data-pr-tooltip="Edit data"
                        className="w-0"
                    >
                        <Link
                            className="flex justify-center items-center border-2 rounded-md border-[#dfe44d] p-1.5 hover:bg-[#4DE45C]/20 transition-all duration-300 ease-in-out"
                            type="button"
                            href={route('master-program-kerja.edit', rowData.id)}>
                            <PencilSquareIcon className="text-[#dfe44d] w-5 h-5" />
                        </Link>
                    </Button>

                    <Button
                        variant="none"
                        className="flex justify-center items-center border-2 rounded-md border-[#E82323] p-1.5 hover:bg-[#E82323]/20 transition-all duration-300 ease-in-out"
                        data-pr-tooltip="Hapus data"
                        onClick={() => modalFormOpenHandler(rowData.id)}>
                        <XCircleIcon className="text-[#E82323] w-5 h-5" />
                    </Button>
                </div>
            </>
        );
    }

    const imgProkerTemplate = (rowData) => {
        return (
            <>
                <Dialog>
                    <DialogTrigger className='flex flex-row gap-3 justify-center items-center d font-normal'>
                        Buka
                        <IconPreviewImageProfile />
                    </DialogTrigger>
                    <DialogContent className="dark:bg-[#0F114C]">
                        <DialogTitle>
                            Gambar Proker
                        </DialogTitle>
                        <img src={rowData?.img_path ? `${rowData.img_path}` : 'assets/icon/default_image_profile.png'} className="h-64 w-auto" alt="" />
                        <a href={rowData?.img_path ? `${rowData.img_path}` : 'assets/icon/default_image_profile.png'} className="text-center" target="_blank" rel="noopener noreferrer">Buka di tab baru</a>
                    </DialogContent>
                </Dialog>
            </>
        );
    }
    return (
        <>
            <div className="py-5">
                <div className="bg-white dark:bg-[#040529] p-4 shadow rounded-lg sm:p-8 flex flex-col gap-5 justify-between">
                    <div className='flex flex-row justify-between w-full'>
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">
                                Daftar Program Kerja di Periode {period.title}
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Kelola daftar program kerja di periode ini
                            </p>
                        </header>

                        <Button variant="blue" type="button" asChild>
                            <Link as="button" href={route('master-period.index')} className="flex flex-row items-center text-[14px] font-bold">
                                <ArrowLeftIcon className="w-3 h-3 mr-2 font-bold" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                    <div className='mt-2 mb-10 grid md:grid-cols-3 grid-cols-1 gap-5'>
                        <div>
                            <InputLabel htmlFor="title" value="Periode" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                            <p>{period.title ? period.title : '-'}</p>
                        </div>
                        <div>
                            <InputLabel htmlFor="start_date" value="Tanggal Mulai" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                            <p>{period.start_date ? period.start_date : '-'}</p>
                        </div>
                        <div>
                            <InputLabel htmlFor="end_date" value="Tanggal Selesai" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                            <p>{period.end_date ? period.end_date : '-'}</p>
                        </div>
                    </div>

                    <Card className="dark:bg-[#040529] dark:border dark:border-white rounded-xl">
                        <CardContent className="overflow-hidden">
                            <div className="my-8">
                                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-5 lg:-mx-8">
                                    <Tooltip target=".export-buttons>button" position="bottom" />
                                    <Tooltip target=".action_buttons>button" position="bottom" />
                                    <DataTable
                                        header={renderHeader()}
                                        value={programKerjas}
                                        ref={dt}
                                        paginator rows={5}
                                        loading={loading}
                                        filters={filters}
                                        globalFilterFields={['title', 'description']}
                                        emptyMessage="Tidak ada program kerja yang tersedia di periode ini."
                                        rowsPerPageOptions={[5, 10, 25, 50]}
                                        tableStyle={{ minWidth: '50rem' }}
                                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                        currentPageReportTemplate="showing {first} to {last} of {totalRecords} results">
                                        <Column
                                            field="number"
                                            header="No"
                                            body={rowNumberTemplate}
                                            className="min-w-[5rem]">
                                        </Column>
                                        <Column
                                            field="title"
                                            header="Program Kerja"
                                            body={(rowData) => rowData.title ? rowData.title : '-'}
                                            className="min-w-[12rem]">
                                        </Column>
                                        <Column
                                            field="description"
                                            header="Deskripsi"
                                            body={(rowData) => rowData.description ? rowData.description : '-'}
                                            className="min-w-[12rem] text-justify">
                                        </Column>
                                        <Column
                                            field="img_path"
                                            header="Gambar Proker"
                                            body={imgProkerTemplate}
                                            className="min-w-[12rem]">
                                        </Column>
                                        <Column
                                            field="action"
                                            header="Aksi"
                                            body={actionTemplate}
                                            className="min-w-[12rem]">
                                        </Column>
                                    </DataTable>
                                    <Modal show={modalOpen} onClose={closeModal} maxWidth="md" >
                                        <div className="p-5">
                                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Apakah anda yakin menghapus program kerja ini
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-600 dark:text-white">
                                                Anda tidak akan dapat mengembalikan data ini.
                                            </p>

                                            <div className="mt-10 flex justify-end flex-row gap-5">
                                                <Button onClick={closeModal} variant="blue" type="button">Cancel</Button>
                                                <Button
                                                    variant="red"
                                                    onClick={() => {
                                                        router.delete(route('master-program-kerja.destroy', { id: selectIdProgramKerjas }), {
                                                            preserveScroll: true,
                                                            preserveState: true,
                                                            onSuccess: () => {
                                                                closeModal();

                                                            }
                                                        })
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

Index.layout = (page) => <DashboardLayout children={page} title={"Program Kerja"} header={"Program Kerja"} description={"Kelola program kerja di page ini"} />;
