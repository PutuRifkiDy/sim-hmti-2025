import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { ArrowLeftIcon, DocumentArrowDownIcon, DocumentPlusIcon } from "@heroicons/react/24/solid";
import { Link, usePage } from "@inertiajs/react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import InputLabel from "@/Components/InputLabel";

export default function SeeRegistered() {
    const { props } = usePage();
    const oprec_registered = usePage().props.oprec_registered;
    const oprec = usePage().props.oprec;

    const flash_message = usePage().props.flash_message;
    useEffect(() => {
        if (flash_message?.message) {
            toast[flash_message.type || 'success'](flash_message.message);
        }
    }, [flash_message]);

    const [oprecRegistered, setOprecRegistered] = useState(oprec_registered);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);


    const dt = useRef(null);
    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        nim: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        sie_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        reason_join: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        experience: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    useEffect(() => {
        setOprecRegistered(
            props.oprec_registered?.map((registered) => {
                return {
                    id: registered.id,
                    experience: registered.experience,
                    reason_join: registered.reason_join,
                    user_id: registered.user_id,
                    sie_id: registered.sie_id,
                    oprec_id: registered.oprec_id,
                    user: {
                        name: registered.user.name,
                        nim: registered.user.nim,
                        phone_number: registered.user.phone_number,
                        email: registered.user.email,
                        line_id: registered.user.line_id,
                        img_path: registered.user.img_path,
                    },
                    master_sie: {
                        sie_name: registered.master_sie.sie_name,
                    },
                    oprec: {
                        name: registered.oprec.name,
                    },
                };
            })
        );
    }, [props.oprec_registered]);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const stripHtmlTags = (html) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    };
    const exportExcel = () => {

        import('xlsx').then((xlsx) => {

            const exportData = oprec_registered.map(oprec => ({
                ID: oprec.id ?? '',
                'Nama Pendaftar': oprec.user.name ?? '',
                'NIM Pendaftar': oprec.user.nim ?? '',
                'Nama Sie': oprec.master_sie.sie_name ?? '',
                'Alasan Bergabung': stripHtmlTags(oprec.reason_join ?? ''),
                'Pengalaman': stripHtmlTags(oprec.experience ?? ''),
                'Nama Kegiatan': oprec.oprec.name ?? '',
                'No Telepon': oprec.user.phone_number ?? '',
                'Email': oprec.user.email ?? '',
                'Line ID': oprec.user.line_id ?? '',
            }));
            const worksheet = xlsx.utils.json_to_sheet(exportData);
            const workbook = { Sheets: { 'master_oprecs_registered': worksheet }, SheetNames: ['master_oprecs_registered'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'master_oprecs_registered');
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
                    <Button type="button" variant="none" className="bg-yellow-500 px-5 py-5 rounded-[500px]" severity="success" rounded onClick={exportExcel} data-pr-tooltip="Export XLS">
                        <DocumentArrowDownIcon className="w-5 h-5 text-white" />
                    </Button>
                </div>
            </div>
        );
    };

    const kontakTemplate = (rowData) => {
        return (
            <div className="flex flex-col gap-1">
                <p>No telepon: {rowData?.user?.phone_number}</p>
                <p>Email: {rowData?.user?.email}</p>
                <p>ID Line: {rowData?.user?.line_id}</p>
            </div>
        );
    }

    const nameTemplate = (rowData) => {
        return (
            <div className="flex flex-row gap-2">

            </div>
        );
    }

    const reasonJoinTemplate = (rowData) => {
        const cleanReasonJoin = DOMPurify.sanitize(rowData.reason_join);
        return (
            <div dangerouslySetInnerHTML={{ __html: cleanReasonJoin }} className="w-full line-clamp-3" />
        );
    }

    const experienceTemplate = (rowData) => {
        const cleanExperience = DOMPurify.sanitize(rowData.experience);
        return (
            <div dangerouslySetInnerHTML={{ __html: cleanExperience }} className="w-full line-clamp-3" />
        );
    }

    const profileImageTemplate = (rowData) => {
        return (
            <div className="flex flex-row gap-3 items-center">
                <Avatar>
                    {rowData.user?.img_path ? (
                        <AvatarImage src={rowData.user.img_path} alt={rowData.user.name} className="object-cover w-full" />
                    ) : (
                        <AvatarFallback>{rowData.nim?.substring(0, 2)}</AvatarFallback>
                    )}
                </Avatar>
                <span className="text-md">{rowData.user.name}</span>
            </div>
        );
    }

    const rowNumberTemplate = (rowData, column) => column.rowIndex + 1;

    console.log(oprec_registered);
    console.log("ini oprec single", oprec);
    return (
        <>
            <div className="py-5">
                <div className="bg-white dark:bg-[#1F1F1F] p-4 shadow rounded-lg sm:p-8 flex flex-col gap-5 justify-between">
                    {/* <div className="flex flex-col md:flex-row justify-between gap-2 mt-5">
                        <div className="flex flex-row gap-10 rounded-[14px] p-5 bg-white  shadow">
                            <div className="flex flex-col gap-1">
                                <p className="font-medium text-[16px] light:text-[#202224]/70  tracking-[0.03em]">Jumlah Open Rekruitmen</p>
                                <p className=" font-bold text-[28px] tracking-[1px]">{total_oprec}</p>
                            </div>
                            <img src="/assets/icon/icon-jumlah-pengguna.png" className="w-[60px] h-[60px]" alt="" />
                        </div>
                    </div> */}
                    <div className='flex flex-row justify-between w-full'>
                        <header>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                                Daftar pendaftar di kegiatan {oprec.oprec_name}
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Kelola daftar pendaftar di bawah ini.
                            </p>
                        </header>

                        <Button variant="gold" type="button" asChild>
                            <Link as="button" href={route('master-open-rekruitmen.index')} className="flex flex-row items-center text-[14px] font-bold shadow-[0_0_15px_#ECBB4E]">
                                <ArrowLeftIcon className="w-3 h-3 mr-2 font-bold" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                    <div className='mt-2 mb-5 grid md:grid-cols-3 grid-cols-1 gap-5'>
                        <div>
                            <InputLabel htmlFor="oprec_name" value="Nama Kegiatan" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                            <p>{oprec.oprec_name ? oprec.oprec_name : '-'}</p>
                        </div>
                        <div>
                            <InputLabel htmlFor="start_date" value="Tanggal Mulai" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                            <p>{oprec.start_date ? oprec.start_date : '-'}</p>
                        </div>
                        <div>
                            <InputLabel htmlFor="end_date" value="Tanggal Selesai" className='text-[12px] text-[#676767] font-normal dark:text-gray-400' />
                            <p>{oprec.end_date ? oprec.end_date : '-'}</p>
                        </div>
                    </div>

                    <Card className="dark:bg-[#101010] dark:border dark:border-white rounded-xl">
                        <CardContent className="overflow-hidden">
                            <div className="my-8">
                                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-5 lg:-mx-8">
                                    <Tooltip target=".export-buttons>button" position="bottom" />
                                    <Tooltip target=".action_buttons>button" position="bottom" />
                                    <DataTable
                                        header={renderHeader()}
                                        value={oprecRegistered}
                                        ref={dt}
                                        paginator rows={5}
                                        loading={loading}
                                        filters={filters}
                                        globalFilterFields={['user.name', 'user.nim', 'master_sie.sie_name', 'reason_join', 'experience', 'oprec.name', 'user.phone_number', 'user.email', 'user.line_id']}
                                        emptyMessage="Tidak ada pendaftar yang tersedia"
                                        rowsPerPageOptions={[5, 10, 25, 50]}
                                        tableStyle={{ minWidth: '50rem' }}
                                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                        currentPageReportTemplate="showing {first} to {last} of {totalRecords} results"
                                        pt={{
                                            table: { className: 'rounded-[20px] overflow-hidden' },
                                            column: { headerCell: { className: 'dark:bg-[#101010] dark:text-white' } },
                                            paginatorDropdown: {
                                                root: {
                                                    className: 'dark:bg-[#101010] dark:text-gray-300 dark:border-none'
                                                },
                                                panel: {
                                                    className: 'dark:bg-[#101010] dark:text-gray-300'
                                                },
                                                item: {
                                                    className: 'dark:hover:bg-gray-700 dark:hover:text-white'
                                                }
                                            }
                                        }}
                                        rowClassName={() => 'hover:bg-gray-100 dark:bg-[#101010] dark:hover:bg-[#1F1F1F] transition-colors duration-200 dark:text-gray-400'}
                                    >
                                        <Column
                                            field="number"
                                            header="No"
                                            body={rowNumberTemplate}
                                            className="min-w-[5rem]">
                                        </Column>
                                        <Column
                                            field="user.name"
                                            header="Nama"
                                            body={profileImageTemplate}

                                            className="min-w-[20rem]">
                                        </Column>
                                        <Column
                                            field="user.nim"
                                            header="NIM"
                                            body={(rowData) => rowData.user?.nim ?? '-'}
                                            className="min-w-[12rem]">
                                        </Column>
                                        <Column
                                            field="kontak"
                                            header="Kontak"
                                            body={kontakTemplate}
                                            className="min-w-[18rem]">
                                        </Column>
                                        <Column
                                            field="Sie"
                                            header="Tanggal Selesai"
                                            body={(rowData) => rowData.master_sie?.sie_name ?? '-'}
                                            className="min-w-[12rem]">
                                        </Column>
                                        <Column
                                            field="reason_join"
                                            header="Alasan Bergabung"
                                            body={reasonJoinTemplate}
                                            className="min-w-[20rem]">
                                        </Column>
                                        <Column
                                            field="experience"
                                            header="Pengalaman"
                                            body={experienceTemplate}
                                            className="min-w-[20rem]">
                                        </Column>
                                    </DataTable>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

SeeRegistered.layout = (page) => <DashboardLayout children={page} title={"Pendaftar"} header={"Open Rekruitmen"} description={"Kelola pendaftar di page ini"} />;
