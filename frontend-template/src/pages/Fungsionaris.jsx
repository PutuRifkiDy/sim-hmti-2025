import BidangSection from "../Components/Fungsionaris/BidangSection";
import DivisiSection from "../Components/Fungsionaris/DivisiSection";
import IntiSection from "../Components/Fungsionaris/IntiSection";
import TitleFungsionarisSection from "../Components/Fungsionaris/TitleFungsionarisSection";

export default function Fungsionaris() {
    return (
        <>
            <div className="flex flex-col gap-2">
                <TitleFungsionarisSection />
                <div className="flex flex-col space-y-10">
                    <IntiSection />
                    <BidangSection />
                    <DivisiSection />
                </div>
            </div>
        </>
    );
}