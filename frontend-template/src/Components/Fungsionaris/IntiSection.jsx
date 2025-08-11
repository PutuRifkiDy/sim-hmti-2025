export default function IntiSection() {
  const ketua = {
    nama: "Rama Putra",
    jabatan: "Ketua",
    foto: "/Rama.jpg",
  };

  const wakilList = [
    {
      nama: "Arya Pramana",
      jabatan: "Wakil Ketua 1",
      foto: "/Arya.jpg",
    },
    {
      nama: "Damar Suputra",
      jabatan: "Wakil Ketua 2",
      foto: "/Damar.jpg",
    },
  ];

  const sekreBendaharaList = [
    {
      nama: "Dwi Putri",
      jabatan: "Sekretaris 2",
      foto: "/Putri.jpg",
    },
    {
      nama: "Gita Adnyani",
      jabatan: "Sekretaris 1",
      foto: "/Gita.jpg",
    },
    {
      nama: "Yurista Indani",
      jabatan: "Bendahara 1",
      foto: "/Yurista.jpg",
    },
    {
      nama: "Chandra Dimitri",
      jabatan: "Bendahara 2",
      foto: "/DC.jpg",
    },
  ];

  const ProfileCard = ({ foto, nama, jabatan }) => (
    <div className="flex flex-col items-center">
      <div className="relative w-[188px] h-[188px] mt-14">
        <div className="absolute inset-[12px] rounded-full overflow-hidden">
          <img src={foto} alt="Profil" className="w-full h-full object-cover" />
        </div>
        <svg
          className="absolute inset-0 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 188 188"
          fill="none"
        >
          <path
            d="M3 94a91 91 0 01182 0"
            stroke="#7B4B27"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
        <svg
          className="absolute inset-0 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 188 188"
          fill="none"
        >
          <path
            d="M3 94a91 91 0 00182 0"
            stroke="#7B4B27"
            strokeWidth="2"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="mt-4 flex justify-center w-[159.791px] h-[21.79px] text-[#785233] font-[Poppins] text-[25.421px] font-black leading-none tracking-[-1.017px] whitespace-nowrap text-center">
        {nama}
      </div>
      <div className="mt-2 flex flex-col justify-center w-[159.791px] h-[21.79px] text-[#785233] text-center font-[Poppins] text-[14.526px] font-semibold leading-none tracking-[-0.581px]">
        {jabatan}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center text-center pt-[5%] sm:pt-[6%] md:pt-[7%] lg:pt-[8%] w-full max-w-[95%] mx-auto px-4 mt-16">
      <h1
        className="
          text-[#ecc067]
          font-poppins font-black leading-[1.1]
          tracking-[-0.06em] uppercase
          whitespace-nowrap
          text-[clamp(2rem,6vw,5.5rem)]
          -mt-[0.5em]
        "
      >
        INTI
      </h1>

      {/* Ketua */}
      <div className="relative w-[188px] h-[188px] mt-14">
        <div className="absolute inset-[12px] rounded-full overflow-hidden">
          <img
            src={ketua.foto}
            alt="Profil"
            className="w-full h-full object-cover"
          />
        </div>
        <svg
          className="absolute inset-0 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 188 188"
          fill="none"
        >
          <path
            d="M3 94a91 91 0 01182 0"
            stroke="#7B4B27"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
        <svg
          className="absolute inset-0 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 188 188"
          fill="none"
        >
          <path
            d="M3 94a91 91 0 00182 0"
            stroke="#7B4B27"
            strokeWidth="2"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="mt-4 flex flex-col justify-center w-[159.791px] h-[21.79px] text-[#785233] text-center font-[Poppins] text-[25.421px] font-black leading-none tracking-[-1.017px]">
        {ketua.nama}
      </div>
      <div className="flex flex-col justify-center w-[159.791px] h-[21.79px] text-[#785233] text-center font-[Poppins] text-[14.526px] font-semibold leading-none tracking-[-0.581px]">
        {ketua.jabatan}
      </div>

      {/* Wakil */}
      <div className="flex justify-center gap-[130px] mt-10">
        {wakilList.map((item, i) => (
          <ProfileCard key={i} {...item} />
        ))}
      </div>

      {/* Sekre + Bendahara */}
      <div className="flex justify-center gap-[130px] mt-10">
        {sekreBendaharaList.map((item, i) => (
          <ProfileCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
