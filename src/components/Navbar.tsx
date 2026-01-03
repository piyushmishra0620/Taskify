'use client';

import Link from "next/link";
import {User} from "lucide-react";
import {useState} from "react";
import {motion,AnimatePresence} from "framer-motion";

export default function Navbar(){
    return(
        <motion.div className="fixed top-0 left-0 z-50 flex items-center justify-between p-2 pb-3 min-w-screen bg-neutral-900" initial={{y:-15,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.2,ease:"easeInOut"}}>
            <Link href="/"><div className="max-md:hidden w-fit h-fit bg-clip-text bg-linear-to-br from-10% from-gray-200 via-40% via-gray-500 to-80% to-gray-300"><p className="font-extrabold ml-4 text-transparent text-[30px] cursor-pointer">Taskify</p></div>
            <div className="md:hidden w-fit h-fit bg-clip-text bg-linear-to-br from-10% from-gray-300 via-40% via-gray-500 to-80% to-gray-300"><p className="font-extrabold ml-2 text-transparent text-[26px] cursor-pointer">Taskify</p></div>
            </Link>
            <div className="p-[6px] md:p-[4px] border-[1px] bg-neutral-900 border-white ring-[1px] md:ring-offset-1 ring-gray-700 mr-2 md:mr-6 rounded-full cursor-pointer">
                <User className="md:w-[30px] md:h-[30px] w-[24px] h-[24px] text-gray-300" strokeWidth={2}/>
            </div>
            <div className="absolute w-full h-[1px] md:h-[2px] bottom-0 shadow-md shadow-red-500 bg-linear-to-r from-transparent via-red-600 to-transparent"></div>
        </motion.div>
    )
}
