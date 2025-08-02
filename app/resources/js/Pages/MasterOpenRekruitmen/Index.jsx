import { IconPreviewImageProfile } from "@/Components/IconAdmin";
import Modal from "@/Components/Modal";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { DocumentArrowDownIcon, EyeIcon, PencilSquareIcon, UserIcon, XCircleIcon } from "@heroicons/react/24/solid";
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
import DOMPurify from 'dompurify';

export default function Index() {
    const { props } = usePage();
    const oprecs = usePage().props.oprecs;
    const total_oprec = usePage().props.total_oprec;
    const total_registered = usePage().props.total_registered;

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
    }

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
            })
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

            const exportData = oprecs.map(oprec => ({
                ID: oprec.id ?? '',
                Title: oprec.oprec_name ?? '',
                Description: oprec.description ?? '',
                StartDate: oprec.start_date ?? '',
                EndDate: oprec.end_date ?? '',
                PosterPath: oprec.poster_path ?? '',
                PostMsg: oprec.postmsg ?? '',
            }));
            const worksheet = xlsx.utils.json_to_sheet(exportData);
            const workbook = { Sheets: { 'master_oprecs': worksheet }, SheetNames: ['master_oprecs'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
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
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };

    const renderHeader = () => {
        return (
            <div className="flex md:flex-row justify-between flex-col">
                <div className="flex items-center justify-content-end gap-2 export-buttons">
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" className="p-inputtext p-inputtext-sm" />
                    </IconField>
                    {/* <Button type="button" className="bg-[#0f114c] px-5 py-5 rounded-[500px]" variant="none" rounded onClick={() => exportCSV(false)} data-pr-tooltip="Export CSV">
                        <DocumentPlusIcon className="w-5 h-5 text-white" />
                    </Button> */}
                    <Button type="button" variant="none" className="bg-yellow-500 px-5 py-5 rounded-[500px]" severity="success" rounded onClick={exportExcel} data-pr-tooltip="Export XLS">
                        <DocumentArrowDownIcon className="w-5 h-5 text-white" />
                    </Button>
                </div>
                <Button variant="blue" type="button" asChild>
                    <Link as="button" href={route('master-open-rekruitmen.create')} className="text-[14px] font-bold py-5">Tambah Oprec</Link>
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
                        data-pr-tooltip="Lihat pendaftar"
                        className="w-0"
                    >
                        <Link
                            className="flex justify-center items-center border-2 rounded-md border-[#00D238] p-1.5 hover:bg-[#00D238]/20 transition-all duration-300 ease-in-out"
                            type="button"
                            href={route('master-open-rekruitmen.see-registered', rowData.id)}>
                            <EyeIcon className="text-[#00D238] w-5 h-5" />
                        </Link>
                    </Button>

                    <Button
                        variant="none"
                        data-pr-tooltip="Edit data"
                        className="w-0"
                    >
                        <Link
                            className="flex justify-center items-center border-2 rounded-md border-[#dfe44d] p-1.5 hover:bg-[#dfe44d]/20 transition-all duration-300 ease-in-out"
                            type="button"
                            href={route('master-open-rekruitmen.edit', rowData.id)}>
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

    const imgOprecTemplate = (rowData) => {
        return (
            <>
                <Dialog>
                    <DialogTrigger className='flex flex-row gap-3 justify-center items-center d font-normal'>
                        Buka
                        <IconPreviewImageProfile />
                    </DialogTrigger>
                    <DialogContent className="dark:bg-[#0F114C]">
                        <DialogTitle>
                            Gambar Oprec
                        </DialogTitle>
                        <img src={rowData?.poster_path ? `${rowData.poster_path}` : 'assets/icon/default_image_profile.png'} className="h-64 w-auto" alt="" />
                        <a href={rowData?.poster_path ? `${rowData.poster_path}` : 'assets/icon/default_image_profile.png'} className="text-center" target="_blank" rel="noopener noreferrer">Buka di tab baru</a>
                    </DialogContent>
                </Dialog>
            </>
        );
    }

    const descriptionTemplate = (rowData) => {
        const cleanDescription = DOMPurify.sanitize(rowData.description);

        return (
            <div dangerouslySetInnerHTML={{ __html: cleanDescription }} className="w-full line-clamp-3" />
        );
    }


    const totalPendaftarTemplate = (rowData) => {
        const totalRegistered = total_registered[rowData.id] || 0;
        return (
            <div className="flex flex-row items-center gap-2">
                <UserIcon className="w-5 h-5 text-gray-500 dark:text-white" />
                <p>{totalRegistered} Pendaftar</p>
            </div>
        );
    }


    return (
        <>
            <div className="py-5">
                <div className="bg-white dark:bg-[#040529] p-4 shadow rounded-lg sm:p-8 flex flex-col gap-5 justify-between">
                    <div className="flex flex-col md:flex-row justify-between gap-2 mt-5">
                        <div className="flex flex-row gap-10 rounded-[14px] p-5 bg-white  shadow">
                            <div className="flex flex-col gap-1">
                                <p className="font-medium text-[16px] light:text-[#202224]/70  tracking-[0.03em]">Jumlah Open Rekruitmen</p>
                                <p className=" font-bold text-[28px] tracking-[1px]">{total_oprec}</p>
                            </div>
                            <img src="/assets/icon/icon-jumlah-pengguna.png" className="w-[60px] h-[60px]" alt="" />
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
                                        value={oprecsData}
                                        ref={dt}
                                        paginator rows={5}
                                        loading={loading}
                                        filters={filters}
                                        globalFilterFields={['oprec_name', 'description', 'postmsg', 'start_date', 'end_date']}
                                        emptyMessage="Tidak ada oprec yang tersedia"
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
                                            field="oprec_name"
                                            header="Nama Oprec"
                                            body={(rowData) => rowData.oprec_name ?? '-'}
                                            className="min-w-[12rem]">
                                        </Column>
                                        <Column
                                            field="description"
                                            header="Deskripsi"
                                            body={descriptionTemplate}
                                            className="min-w-[20rem]">
                                        </Column>
                                        <Column
                                            field="start_date"
                                            header="Tanggal Mulai"
                                            body={(rowData) => rowData.start_date ?? '-'}
                                            className="min-w-[12rem]">
                                        </Column>
                                        <Column
                                            field="end_date"
                                            header="Tanggal Selesai"
                                            body={(rowData) => rowData.end_date ?? '-'}
                                            className="min-w-[12rem]">
                                        </Column>
                                        <Column
                                            field="end_date"
                                            header="Pesan Oprec"
                                            body={(rowData) => rowData.postmsg ?? '-'}
                                            className="min-w-[12rem]">
                                        </Column>
                                        <Column
                                            field="poster_path"
                                            header="Poster Oprec"
                                            body={imgOprecTemplate}
                                            className="min-w-[12rem]">
                                        </Column>
                                        <Column
                                            field="total_pendaftar"
                                            header="Total Pendaftar"
                                            body={totalPendaftarTemplate}
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
                                                Apakah anda yakin menghapus fungsionaris ini
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-600 dark:text-white">
                                                Anda tidak akan dapat mengembalikan data ini.
                                            </p>

                                            <div className="mt-10 flex justify-end flex-row gap-5">
                                                <Button onClick={closeModal} variant="blue" type="button">Cancel</Button>
                                                <Button
                                                    variant="red"
                                                    onClick={() => {
                                                        router.delete(route('master-open-rekruitmen.destroy', { id: selectIdOprecs }), {
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

Index.layout = (page) => <DashboardLayout children={page} title={"Master Open Rekruitmen"} header={"Master Open Rekruitmen"} description={"Kelola master open rekruitmen di page ini"} />;
