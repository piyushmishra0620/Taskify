"use client";

import {useRouter} from "next/navigation";

export function Hero() {
  const router = useRouter();
  return (
    <>
      <div className="w-full  flex justify-center">
        <div className="h-fit w-fit bg-linear-to-tr from-0% from-gray-50 via-55% via-gray-500 to-85% to-gray-50 bg-clip-text">
          <h1 className="text-[70px] md:text-[100px] font-extrabold text-center text-transparent cursor-default">
            TASKIFY
          </h1>
        </div>
      </div>
      <div className="w-full flex justify-center h-fit">
        <p className="w-[330px] md:w-[380px] h-fit text-neutral-300/80 text-md md:text-xl cursor-default text-center">
          Set Tasks , Keep Track of your Progress , Complete them before
          deadline and Achieve your Goals through Taskify .
        </p>
      </div>
      <div className="mt-7 flex space-x-4.5 md:space-x-7 justify-center h-fit">
        <button className="px-4 md:px-5 py-3 md:py-4 bg-red-600 focus:bg-red-500 hover:bg-red-500 md:bg-[lab(44 76.83 71.8)] cursor-pointer text-gray-300 font-bold md:text-lg text-md border border-red-500 outline-2 outline-amber-50 outline-offset-3 rounded-lg hover:-translate-y-1 ease-in duration-100" onClick={()=>{router.replace("/login",{scroll:true});router.prefetch("/signup");}}>
          Get Started &gt;
        </button>
        <button className="px-4 py-3 md:px-5 md:py-4 bg-linear-to-br focus:bg-white hover:bg-gray-300/80 from-gray-300 via-gray-300/80 to-gray-300 cursor-pointer text-black font-bold text-md md:text-lg border border-amber-50 outline-2 outline-amber-50 outline-offset-3 rounded-lg hover:-translate-y-1 ease-in duration-100">
          Set Tasks For a Day
        </button>
      </div>
    </>
  );
}
