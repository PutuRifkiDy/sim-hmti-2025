// components/Loading.tsx
import React from 'react';
import animationData from "./Load.json";
import Lottie from 'lottie-react';
const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-[#1e1e1e]/70 z-50">
      <div className="flex flex-col items-center justify-center">
        <Lottie animationData={animationData} loop={true} className='w-60 h-60 animate-spin-slow relative'/>
        <img src='assets/icon/logo_hmti.png' alt='Logo HMTI' className='w-16 h-16 absolute' />
      </div>
    </div>
  );
};

export default Loading;
