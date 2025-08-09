import AboutSection from "../Components/Landing/AboutSection";
import FungsionarisSection from "../Components/Landing/FungsionarisSection";
import HomeSection from "../Components/Landing/HomeSection";
import OpenRekruitmenSection from "../Components/Landing/OpenRekruitmenSection";
import ProgramKerjaSection from "../Components/Landing/ProgramKerjaSection";

export default function Landing() {
  return (
    <>
      <div className="flex flex-col space-y-24">
        <HomeSection />
        <AboutSection />
        <ProgramKerjaSection />
        <FungsionarisSection />
        <OpenRekruitmenSection />
      </div>
    </>
  );
}
