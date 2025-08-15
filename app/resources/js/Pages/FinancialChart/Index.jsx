import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { router, usePage } from "@inertiajs/react";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { useState } from "react";
import { Line, Bar } from 'react-chartjs-2';
export default function Index() {
    ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, BarElement);
    const monthLabels = usePage().props.monthLabels;
    const financialData = usePage().props.financialData;
    const data_periods = usePage().props.data_periods;
    const periodActive = usePage().props.periodActive;


    const financialDataAllPeriod = usePage().props.financialDataAllPeriod;
    const periodLabels = usePage().props.periodLabels;


    const [selectedPeriodId, setSelectedPeriodId] = useState(periodActive.id);

    const onHandleChange = (value) => {
        setSelectedPeriodId(value);

        router.get(route('master-grafik.index'), {
            period_id: value
        }, {
            preserveState: true
        })
    }

    const data = {
        labels: monthLabels,
        datasets: [
            {
                label: `Keuangan HMTI periode aktif ${periodActive.title} perbulan`,
                data: financialData,
                backgroundColor: '#ECBB4E',
                borderColor: '#ECBB4E',
                borderWidth: 5,
                pointRadius: 5
            },
        ]
    }

    const dataAllPeriod = {
        labels: periodLabels,
        datasets: [
            {
                label: `Keuangan seluruh HMTI perperiode`,
                data: financialDataAllPeriod,
                backgroundColor: '#ECBB4E',
                borderColor: '#ECBB4E',
                borderWidth: 5,
                pointRadius: 5
            },
        ]
    }

    return (
        <>
            <div className="py-5">
                <div className="bg-white dark:bg-[#040529] p-4 shadow rounded-lg sm:p-8 ">
                    <Select
                        value={selectedPeriodId}
                        onValueChange={onHandleChange}
                    >
                        <SelectTrigger className="md:w-[250px] w-full">
                            <SelectValue placeholder="Pilih Periode" />
                        </SelectTrigger>
                        <SelectContent>
                            {data_periods.map((p) => (
                                <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Line
                        className="mt-10"
                        data={data}
                    />
                    <Line
                        className="mt-10"
                        data={dataAllPeriod}
                    />
                </div>
            </div>
        </>
    );
}

Index.layout = (page) => <DashboardLayout children={page} title={"Grafik Keuangan HMTI"} header={"Grafik Keuangan"} description={"Lihat Grafik Keuangan di periode ini"} />;
