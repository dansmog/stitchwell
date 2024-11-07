"use client";

import Image from "next/image";

import Logo from "@/app/images/logo.svg";

const AuthWrapper = ({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="w-full bg-zinc-100 px-4 md:px-0 h-screen  flex justify-center items-center relative overflow-hidden">
      <div className="w-full md:w-[469px] bg-white shadow-md rounded-2xl p-5 flex flex-col justify-center items-center gap-10">
        <header className="flex items-center justify-center flex-col">
          <Image
            src={Logo}
            height={40} // Desired size with correct aspect ratio
            width={120}
            alt="stitchwell logo"
          />
          <h1 className="mt-5 text-xl md:text-xl font-medium text-center tracking-tight text-black">
            {title}
          </h1>
          <span className="text-center text-black text-base mt-0">
            {subtitle}
          </span>
        </header>
        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;
