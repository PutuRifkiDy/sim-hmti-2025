import ProgramKerjaSection from "../Components/Landing/ProgramKerjaSection";
import TitleSection from "../Components/ProgramKerja/TitleProgramKerjaSection";

export default function ProgramKerja() {
    return (
        <>
            <div className="flex flex-col space-y-5">
                <TitleSection />
                <ProgramKerjaSection />
            </div>
        </>
    );
}