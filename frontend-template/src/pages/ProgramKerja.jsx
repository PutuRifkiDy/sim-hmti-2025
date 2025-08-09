"use client";

import { useState } from "react";
import TitleProgramKerjaSection from "../Components/ProgramKerja/TitleProgramKerjaSection";
import ProgramKerjaSection from "../Components/ProgramKerja/ProgramKerjaSection";

export default function ProgramKerja() {
  const [selectedKabinet, setSelectedKabinet] = useState("Kabinet Harmoni");

  const kabinetOptions = [
    "Kabinet Harmoni",
    "Kabinet Kolaborasi",
    "Kabinet Revolusi",
    "Kabinet Sinergi",
  ];

  const programs = [
    { 
      title: "PILMAPRES-TI 2025", 
      image: "/pilmapresti.png", 
      kabinet: "Kabinet Harmoni",
      description: "PILMAPRES TI merupakan kegiatan yang bertujuan untuk mewadahi potensi mahasiswa dan memilih wakil Program Studi di Pemilihan Mahasiswa Berprestasi."
    },
    { 
      title: "PERMIKOMNAS", 
      image: "/permikomnas.png", 
      kabinet: "Kabinet Harmoni",
      description: "PERMIKOMNAS adalah komunitas nasional mahasiswa informatika dan komputer yang tersebar di seluruh Indonesia."
    },
    { 
      title: "TIRTA YATRA", 
      image: "/tirtayatra.png", 
      kabinet: "Kabinet Harmoni",
      description: "Kegiatan tahunan HMTI untuk sembahyang di pura-pura Bali, memohon restu demi kelancaran program kerja satu tahun ke depan."
    },
    { 
        title: "PILMAPRES-TI 2025", 
        image: "/pilmapresti.png", 
        kabinet: "Kabinet Harmoni",
        description: "PILMAPRES TI merupakan kegiatan yang bertujuan untuk mewadahi potensi mahasiswa dan memilih wakil Program Studi di Pemilihan Mahasiswa Berprestasi."
      },
      { 
        title: "PERMIKOMNAS", 
        image: "/permikomnas.png", 
        kabinet: "Kabinet Harmoni",
        description: "PERMIKOMNAS adalah komunitas nasional mahasiswa informatika dan komputer yang tersebar di seluruh Indonesia."
      },
      { 
        title: "TIRTA YATRA", 
        image: "/tirtayatra.png", 
        kabinet: "Kabinet Harmoni",
        description: "Kegiatan tahunan HMTI untuk sembahyang di pura-pura Bali, memohon restu demi kelancaran program kerja satu tahun ke depan."
      },
      { 
        title: "PILMAPRES-TI 2025", 
        image: "/pilmapresti.png", 
        kabinet: "Kabinet Harmoni",
        description: "PILMAPRES TI merupakan kegiatan yang bertujuan untuk mewadahi potensi mahasiswa dan memilih wakil Program Studi di Pemilihan Mahasiswa Berprestasi."
      },
      { 
        title: "PERMIKOMNAS", 
        image: "/permikomnas.png", 
        kabinet: "Kabinet Harmoni",
        description: "PERMIKOMNAS adalah komunitas nasional mahasiswa informatika dan komputer yang tersebar di seluruh Indonesia."
      },
      { 
        title: "TIRTA YATRA", 
        image: "/tirtayatra.png", 
        kabinet: "Kabinet Harmoni",
        description: "Kegiatan tahunan HMTI untuk sembahyang di pura-pura Bali, memohon restu demi kelancaran program kerja satu tahun ke depan."
      },
    { title: "PILMAPRES-TI 2025", image: "/pilmapresti.png", kabinet: "Kabinet Kolaborasi", description: "Versi Kolaborasi." },
    { title: "PERMIKOMNAS", image: "/permikomnas.png", kabinet: "Kabinet Kolaborasi", description: "Versi Kolaborasi." },
    { title: "TIRTA YATRA", image: "/tirtayatra.png", kabinet: "Kabinet Sinergi", description: "Versi Sinergi." },
  ];

  const filteredPrograms = programs.filter(
    (program) => program.kabinet === selectedKabinet
  );

  return (
    <div className="max-w-6xl mx-auto px-4">
      <TitleProgramKerjaSection />
      <div className="mb-6">
        <select
          value={selectedKabinet}
          onChange={(e) => setSelectedKabinet(e.target.value)}
          className="
            border border-[#acacac] text-black bg-white hover:bg-[#d9d9d9] 
            font-normal rounded-md mx-auto sm:mx-0 block
            w-[126px] h-[20px] text-[9px]      /* Mobile */
            sm:w-[240px] sm:h-[40px] sm:text-[18px]  /* Desktop */
            px-2 sm:px-3
          "
        >
          {kabinetOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredPrograms.map((program, index) => (
          <ProgramKerjaSection
            key={index}
            title={program.title}
            image={program.image}
            description={program.description}
          />
        ))}
      </div>
    </div>
  );
}
