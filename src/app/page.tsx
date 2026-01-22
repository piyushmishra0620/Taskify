'use client';

import Image from "next/image";
import {Hero} from "@/components/Hero";
import {Card} from "@/components/card";
import Footer from "@/components/Footer";
import {motion,AnimatePresence} from "framer-motion";

export default function Home() {
  return (
    <div className="min-w-screen min-h-screen bg-black">
      <div className="absolute z-10 top-0 left-0 w-screen h-[500px] max-md:h-[300px] bg-linear-to-b from-black to-transparent"></div>
      <div className="absolute z-10 max-md:top-[57%] top-[52%] h-[370px] max-md:h-[380px] left-0 w-screen bg-linear-to-b from-transparent to-black"></div>
      <motion.div className="absolute z-0 w-screen h-[100vh] bg-[linear-gradient(to_right,rgba(184,65,65,0.31)_1px,transparent_1px),linear-gradient(to_bottom,rgba(184,65,65,0.31)_1px,transparent_1px)] md:bg-[size:60px_60px] bg-[size:40px_40px]" initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5,ease:"easeInOut"}}></motion.div>
      <motion.div className="absolute z-40 top-0 left-0 w-full h-[67%] md:h-[72%] flex flex-col justify-end md:justify-center bg-transparent" initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5,ease:"easeInOut"}}>
        <Hero />
      </motion.div>
      <div className="m-auto p-4 flex flex-col md:flex-row justify-between">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  );
}

