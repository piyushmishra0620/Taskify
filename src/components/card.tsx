"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";
import {Satisfy} from "next/font/google";
interface Props {
  Children: LucideIcon;
  Paragraph: string;
  Heading: string;
}

const satisfy = Satisfy({
    weight:["400"],
    variable:"--font-satisfy"
})

export const Card = ({ Children, Paragraph, Heading }: Props) => {
  return (
    <div className="flex-1 group">
      <div className="h-full p-6 max-md:p-2 max-md:pt-4 rounded-lg border border-neutral-600 bg-neutral-800/50 md:bg-neutral-900/50 backdrop-blur-xs flex flex-col">
        <div className="w-full flex flex-col space-y-3 max-md:space-y-2 flex-1">
          <div className="w-full flex justify-center">
            <Children className="w-11 h-11 md:w-14 md:h-14 text-white group-hover:text-red-500/80 ease-out duration-100" />
          </div>
          <div className="w-full text-center text-white group-hover:text-red-500/80 ease-out duration-100 font-semibold text-[21px] max-md:text-[18px]">
            {Heading}
          </div>
          <div className={`w-full text-center text-neutral-300 font-${satisfy.variable} text-[16px] max-md:text-[14px]`}>
            {Paragraph}
          </div>
        </div>
      </div>
    </div>
  );
};
