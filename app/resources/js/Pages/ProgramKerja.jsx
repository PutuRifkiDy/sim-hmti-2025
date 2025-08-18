import GuestLayout from "@/Layouts/GuestLayout";
import TitleProgramKerjaSection from "./ProgramKerja/TitleProgramKerjaSection";
import { router, usePage } from "@inertiajs/react";
import ProgramKerjaSection from "./ProgramKerja/ProgramKerjasection";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";

export default function ProgramKerja() {
    const data_periods = usePage().props.data_periods;
    const program_kerja_active = usePage().props.program_kerja_active;
    const periodActive = usePage().props.periodActive;

    console.log('ini adalah periodActive', periodActive);

    const [selectedPeriodId, setSelectedPeriodId] = useState(periodActive.id);

    const onHandleChange = (value) => {
        setSelectedPeriodId(value);

        router.get(
            route('program-kerja'),
            {
                period_id: value,
            },
            {
                preserveState: true,
            },
        );
    }


    return (
        <>
            <div className="md:py-24 py-5 px-12">
                <TitleProgramKerjaSection />
                <Select value={selectedPeriodId} onValueChange={onHandleChange}>
                    <SelectTrigger className="w-full md:w-[250px]">
                        <SelectValue placeholder="Pilih Periode" />
                    </SelectTrigger>
                    <SelectContent>
                        {data_periods.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                                {p.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 mt-5">
                    {program_kerja_active.map((program, index) => (
                        <ProgramKerjaSection key={index} title={program.title} img_path={program.img_path} description={program.description} />
                    ))}
                </div>
            </div>
        </>
    );
}

ProgramKerja.layout = (page) => <GuestLayout children={page} title="Program Kerja" />;
