import { IconPreviewImageProfile } from "@/Components/IconAdmin";
import Modal from "@/Components/Modal";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { CurrencyDollarIcon, DocumentArrowDownIcon, DocumentPlusIcon, EyeIcon, PencilSquareIcon, PlusIcon, UserGroupIcon, XCircleIcon } from "@heroicons/react/24/solid";
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
    const master_periods = usePage().props.master_periods;
    const total_period = usePage().props.total_period;
    const total_fungsionaris = usePage().props.total_fungsionaris;
    const total_programkerja = usePage().props.total_programkerja;

    console.log("Master periods", master_periods);

    const { props } = usePage();

    const flash_message = usePage().props.flash_message;
    useEffect(() => {
        if (flash_message?.message) {
            toast[flash_message.type || 'success'](flash_message.message);
        }
    }, [flash_message]);

    const [periods, setPeriods] = useState(master_periods);
    const [selectIdPeriods, setSelectIdPeriods] = useState(0);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    const modalFormOpenHandler = (periodId) => {
        setModalOpen(true);
        setSelectIdPeriods(periodId);
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    const closeModal = () => {
        setModalOpen(false);
        setSelectIdPeriods(0);
    };

    const dt = useRef(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        start_date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        end_date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    useEffect(() => {
        setPeriods(
            props.master_periods.map((master_period) => {
                return {
                    id: master_period.id,
                    title: master_period.title ?? '',
                    start_date: master_period.start_date ?? '',
                    end_date: master_period.end_date ?? '',
                    anggaran_dasar: master_period.anggaran_dasar ?? '',
                    anggaran_rumah_tangga: master_period.anggaran_rumah_tangga ?? '',
                    agenda_khusus: master_period.agenda_khusus ?? '',
                    youtube_link: master_period.youtube_link ?? '',
                    cover_path: master_period.cover_path ?? '',
                };
            })
        );
    }, [props.master_periods]);

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

            const exportData = master_periods.map(master_period => ({
                ID: master_period.id ?? '',
                Title: master_period.title ?? '',
                StartDate: master_period.start_date ?? '',
                EndDate: master_period.end_date ?? '',
                'Anggaran Dasar': master_period.anggaran_dasar ?? '',
                'Anggaran Rumah Tangga': master_period.anggaran_rumah_tangga ?? '',
                'Agenda Khusus': master_period.agenda_khusus ?? '',
                'YouTube Link': master_period.youtube_link ?? '',
            }));
            const worksheet = xlsx.utils.json_to_sheet(exportData);
            const workbook = { Sheets: { 'master_periods': worksheet }, SheetNames: ['master_periods'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'master_periods');
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

    const rowNumberTemplate = (rowData, column) => column.rowIndex + 1;

    const renderHeader = () => {
        return (
            <div className="flex md:flex-row justify-between flex-col">
                <div className="flex items-center justify-content-end gap-2 export-buttons">
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Ketik kata kunci" className="p-inputtext p-inputtext-sm" />
                    </IconField>
                    <Button type="button" className="bg-[#0f114c] px-5 py-5 rounded-[500px]" variant="none" rounded onClick={() => exportCSV(false)} data-pr-tooltip="Export CSV">
                        <DocumentPlusIcon className="w-5 h-5 text-white" />
                    </Button>
                    <Button type="button" variant="none" className="bg-yellow-500 px-5 py-5 rounded-[500px]" severity="success" rounded onClick={exportExcel} data-pr-tooltip="Export XLS">
                        <DocumentArrowDownIcon className="w-5 h-5 text-white" />
                    </Button>
                </div>
                <Button variant="gold" type="button" asChild className="shadow-[0_0_15px_#ECBB4E]">
                    <Link as="button" href={route('master-period.create')} className="text-[14px] font-bold py-5">
                        <PlusIcon className="w-5 h-5 text-white" />
                        Tambah Periode
                    </Link>
                </Button>
            </div>
        );
    };

    const anggaranDasarTemplate = (rowData) => {
        return (
            <>
                <Dialog>
                    <DialogTrigger className='flex flex-row gap-3 justify-center items-center font-normal'>
                        Buka
                        <IconPreviewImageProfile />
                    </DialogTrigger>
                    <DialogContent className="dark:bg-[#0F114C] max-w-3xl h-[80%]">
                        <DialogTitle>
                            Anggaran Dasar
                        </DialogTitle>
                        <div className="overflow-hidden">
                            <iframe className="w-full h-screen" src={rowData.anggaran_dasar ? `${rowData.anggaran_dasar}` : 'assets/icon/default_image_profile.png'}
                                allow="autoplay"></iframe>
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        );
    }

    const anggaranRumahTanggaTemplate = (rowData) => {
        return (
            <>
                <Dialog>
                    <DialogTrigger className='flex flex-row gap-3 justify-center items-center d font-normal'>
                        Buka
                        <IconPreviewImageProfile />
                    </DialogTrigger>
                    <DialogContent className="dark:bg-[#0F114C] max-w-3xl h-[80%]">
                        <DialogTitle>
                            Anggaran Rumah Tangga
                        </DialogTitle>
                        <div className="overflow-hidden">
                            <iframe class="w-full h-screen" src={rowData.anggaran_rumah_tangga ? `${rowData.anggaran_rumah_tangga}` : 'assets/icon/default_image_profile.png'}
                                allow="autoplay"></iframe>
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        );
    }

    const agendaKhususTemplate = (rowData) => {
        return (
            <>
                <Dialog>
                    <DialogTrigger className='flex flex-row gap-3 justify-center items-center d font-normal'>
                        Buka
                        <IconPreviewImageProfile />
                    </DialogTrigger>
                    <DialogContent className="dark:bg-[#0F114C] max-w-3xl h-[80%]">
                        <DialogTitle>
                            Agenda Khusus
                        </DialogTitle>
                        <div className="overflow-hidden">
                            <iframe class="w-full h-screen" src={rowData.agenda_khusus ? `${rowData.agenda_khusus}` : 'assets/icon/default_image_profile.png'}
                                allow="autoplay"></iframe>
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        );
    }

    const youtubeLinkTemplate = (rowData) => {
        return (
            <>
                <Dialog>
                    <DialogTrigger className='flex flex-row gap-3 justify-center items-center d font-normal'>
                        Buka
                        <IconPreviewImageProfile />
                    </DialogTrigger>
                    <DialogContent className="dark:bg-[#0F114C]  max-w-3xl h-[80%]">
                        <DialogTitle>
                            Video Himpunan
                        </DialogTitle>
                        <div className="overflow-hidden">
                            <iframe
                                src={rowData.youtube_link ? `${rowData.youtube_link}` : 'https://www.youtube.com/embed/VIDEO_ID'}
                                title="Himpunan Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-screen"
                            ></iframe>
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        );
    }


    const coverImagePeriodTemplate = (rowData) => {
        return (
            <>
                <Dialog>
                    <DialogTrigger className='flex flex-row gap-3 justify-center items-center d font-normal'>
                        Buka
                        <IconPreviewImageProfile />
                    </DialogTrigger>
                    <DialogContent className="dark:bg-[#0F114C] max-w-xl">
                        <DialogTitle>
                            Gambar Cover
                        </DialogTitle>
                        <img src={rowData?.cover_path ? `${rowData.cover_path}` : 'assets/icon/default_image_profile.png'} className="h-64 w-auto" alt="" />
                        <a href={rowData?.cover_path ? `${rowData.cover_path}` : 'assets/icon/default_image_profile.png'} className="text-center" target="_blank" rel="noopener noreferrer">Buka di tab baru</a>
                    </DialogContent>
                </Dialog>
            </>
        );
    }

    const actionTemplate = (rowData) => {
        return (
            <>
                <div className="flex flex-row gap-2 items-center action_buttons">
                    <Button
                        variant="none"
                        data-pr-tooltip="Kelola keuangan di periode ini"
                        className="w-0"
                    >
                        <Link
                            className="flex justify-center items-center border-2 rounded-md border-[#FFA800] p-1.5 hover:bg-[#FFA800]/40 transition-all duration-300 ease-in-out"
                            type="button"
                            href={route('master-financial.index', rowData.id)}>
                            <CurrencyDollarIcon className="text-[#FFA800] w-5 h-5" />
                        </Link>
                    </Button>
                    <Button
                        variant="none"
                        data-pr-tooltip="Kelola program kerja di periode ini"
                        className="w-0"
                    >
                        <Link
                            className="flex justify-center items-center border-2 rounded-md border-[#3ff876] p-1.5 hover:bg-[#3ff876]/40 transition-all duration-300 ease-in-out"
                            type="button"
                            href={route('master-program-kerja.index', rowData.id)}>
                            <EyeIcon className="text-[#3ff876] w-5 h-5" />
                        </Link>
                    </Button>

                    <Button
                        variant="none"
                        data-pr-tooltip="Kelola fungsionaris di periode ini"
                        className="w-0"
                    >
                        <Link
                            className="flex justify-center items-center border-2 rounded-md border-[#4880FF] p-1.5 hover:bg-[#4880FF]/40 transition-all duration-300 ease-in-out"
                            type="button"
                            href={route('master-himpunan.index', rowData.id)}>
                            <UserGroupIcon className="text-[#4880FF] w-5 h-5" />
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
                            href={route('master-period.edit', rowData.id)}>
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

    return (
        <>
            <div className="py-5">
                <div className="bg-white dark:bg-[#040529] p-4 shadow rounded-lg sm:p-8 flex flex-col gap-5 justify-between">
                    <div className="flex flex-col md:flex-row justify-between gap-2 mt-5">
                        <div className="flex flex-row gap-10 rounded-[14px] p-5 bg-white  shadow">
                            <div className="flex flex-col gap-1">
                                <p className="font-medium text-[16px] light:text-[#202224]/70  tracking-[0.03em]">Jumlah Periode</p>
                                <p className=" font-bold text-[28px] tracking-[1px]">{total_period}</p>
                            </div>
                            <img src="/assets/icon/icon-jumlah-pengguna.png" className="w-[60px] h-[60px]" alt="" />
                        </div>
                        <div className="flex flex-row gap-10 rounded-[14px] p-5 bg-white  shadow">
                            <div className="flex flex-col gap-1">
                                <p className="font-medium text-[16px] light:text-[#202224]/70  tracking-[0.03em]">Jumlah Fungsionaris</p>
                                <p className=" font-bold text-[28px] tracking-[1px]">{total_fungsionaris}</p>
                            </div>
                            <img src="/assets/icon/icon-jumlah-pengguna.png" className="w-[60px] h-[60px]" alt="" />
                        </div>
                        <div className="flex flex-row gap-10 rounded-[14px] p-5 bg-white  shadow">
                            <div className="flex flex-col gap-1">
                                <p className="font-medium text-[16px] light:text-[#202224]/70  tracking-[0.03em]">Jumlah Program Kerja</p>
                                <p className=" font-bold text-[28px] tracking-[1px]">{total_programkerja}</p>
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
                                        value={periods}
                                        ref={dt}
                                        paginator rows={5}
                                        loading={loading}
                                        filters={filters}
                                        globalFilterFields={['title', 'start_date', 'end_date']}
                                        emptyMessage="Tidak ada periode yang tersedia."
                                        rowsPerPageOptions={[5, 10, 25, 50]}
                                        tableStyle={{ minWidth: '50rem' }}
                                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                        currentPageReportTemplate="{first} to {last} of {totalRecords}">
                                        <Column
                                            field="number"
                                            header="No"
                                            body={rowNumberTemplate}
                                            className="min-w-[5rem]">
                                        </Column>
                                        <Column
                                            field="title"
                                            header="Nama Periode"
                                            body={(rowData) => rowData.title ? rowData.title : '-'}
                                            className="min-w-[12rem]">
                                        </Column>
                                        <Column
                                            field="start_date"
                                            header="Periode Mulai"
                                            body={(rowData) => rowData.start_date ? rowData.start_date : '-'}
                                            className="min-w-[12rem]">
                                        </Column>
                                        <Column
                                            field="end_date"
                                            header="Periode Selesai"
                                            body={(rowData) => rowData.end_date ? rowData.end_date : '-'}
                                            className="min-w-[12rem]">
                                        </Column>
                                        <Column
                                            field="anggaran_dasar"
                                            header="Anggaran Dasar"
                                            body={anggaranDasarTemplate}
                                            className="min-w-[12rem]">
                                        </Column>
                                        <Column
                                            field="anggaran_rumah_tangga"
                                            header="Anggaran Rumah Tangga"
                                            body={anggaranRumahTanggaTemplate}
                                            className="min-w-[12rem]">
                                        </Column>
                                        <Column
                                            field="agenda_khusus"
                                            header="Angenda Khusus"
                                            body={agendaKhususTemplate}
                                            className="min-w-[12rem]">
                                        </Column>
                                        <Column
                                            field="youtube_link"
                                            header="Link Youtube"
                                            body={youtubeLinkTemplate}
                                            className="min-w-[12rem]">
                                        </Column>
                                        <Column
                                            field="cover_path"
                                            header="Cover Periode Himpunan"
                                            body={coverImagePeriodTemplate}
                                            className="min-w-[15rem]">
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
                                                Apakah anda yakin menghapus periode ini
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-600 dark:text-white">
                                                Anda tidak akan dapat mengembalikan data ini.
                                            </p>

                                            <div className="mt-10 flex justify-end flex-row gap-5">
                                                <Button onClick={closeModal} variant="gold" type="button">Cancel</Button>
                                                <Button
                                                    variant="red"
                                                    onClick={() => {
                                                        router.delete(route('master-period.destroy', { id: selectIdPeriods }), {
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

Index.layout = (page) => <DashboardLayout children={page} title={"Master Periode"} header={"Master Periode"} description={"Kelola Periode di page ini"} />;
