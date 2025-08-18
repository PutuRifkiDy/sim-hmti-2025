import React, { useState, useEffect } from "react";

export default function ProgramKerjaSection({ title, img_path, description }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const hoverSupport = window.matchMedia("(hover: hover)").matches;
    setIsMobile(!hoverSupport);
  }, []);

  const handleToggle = () => {
    if (isMobile) {
      setIsHovered((prev) => !prev);
    }
  };

  return (
    <div
      className={`relative aspect-[414/233] rounded-lg overflow-hidden cursor-pointer shadow-md w-full max-w-[414px] border-2 border-[#E4B45C] group transition-all duration-300 ease-in-out hover:-translate-y-2`}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleToggle}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${img_path}')` }}
      />
      <div
        className={`absolute inset-0 flex items-end p-4 transition-opacity duration-300 ${
          isHovered ? "opacity-0" : "md:group-hover:opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.8))",
        }}
      >
        <h3 className="text-white text-base sm:text-lg md:text-xl font-bold text-center w-full tracking-wide">
          {title}
        </h3>
      </div>
      <div
        className={`absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-center px-4 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
        }`}
      >
        <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-2">
          {title}
        </h3>
        <p className="text-white text-xs sm:text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
