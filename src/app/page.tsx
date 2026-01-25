"use client";

import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Card } from "@/components/card";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  ListChecks,
  CalendarCheck,
  Trophy,
  ListXIcon,
  LayoutDashboard,
  Target,
} from "lucide-react";
import { useAuth } from "@/app/contexts/authContext";

export default function Home() {
  return (
    <div className="min-w-screen min-h-screen bg-black">
      <div className="absolute z-10 top-0 left-0 w-screen h-[500px] max-md:h-[300px] bg-linear-to-b from-black to-transparent"></div>
      <div className="absolute z-10 h-[250px]  left-0 bottom-0 w-screen bg-linear-to-b from-transparent to-black"></div>
      <motion.div
        className="absolute top-0 left-0 w-screen h-[90vh] bg-[linear-gradient(to_right,rgba(184,65,65,0.31)_1px,transparent_1px),linear-gradient(to_bottom,rgba(184,65,65,0.31)_1px,transparent_1px)] md:bg-[size:60px_60px] bg-[size:40px_40px]"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      ></motion.div>
      <div className="w-full relative z-40 h-[98vh]">
        <motion.div
          className="w-full h-[67%] md:h-[72%] flex flex-col justify-end  bg-transparent"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Hero />
        </motion.div>
      </div>
      <div className="w-full h-[1px] bg-linear-to-r from-neutral-400 via-red-600 to-neutral-400 "></div>
      <div className="w-full mt-8 flex justify-center">
        <div className="w-fit h-fit bg-linear-to-tr bg-clip-text from-0% from-gray-50 via-55% via-gray-500 to-85% to-gray-50">
          <h1 className="text-[40px] md:text-[50px] text-transparent text-center font-extrabold cursor-default">
            Features You Get
          </h1>
        </div>
      </div>
      <div className="max-md:p-7 max-md:pt-10 max-md:pb-10 p-30 pt-10 grid [@media(max-width:880px)]:grid-cols-1 [@media(max-width:1180px)]:grid-cols-2 grid-cols-3 gap-3 auto-rows-fr transform ease-in duration-150">
        <Card
          Children={ListChecks}
          Paragraph="Plan and manage daily tasks with progress tracking, notes, and subtasks. Logged-in users can add, update, delete, and analyze tasks , while guests can set one-day tasks and receive notifications"
          Heading="Manage Your Tasks , Set Deadlines"
        ></Card>
        <Card
          Children={CalendarCheck}
          Paragraph="Easily schedule your daily tasks and stay on track until completion with a simple, intuitive workflow. Organize tasks with notes and subtasks, track progress in real time, and receive timely reminders so nothing gets missed, helping you stay productive and focused throughout the day"
          Heading="Schedule Tasks , Complete them"
        ></Card>
        <Card
          Children={Trophy}
          Paragraph="Complete tasks consistently to earn points and level up your profile as a reward for your productivity. Showcase your progress, build a stronger profile over time, and stay motivated with a system that recognizes your efforts and encourages continuous improvement."
          Heading="Earn points , Improve your Profile"
        ></Card>
        <Card
          Children={ListXIcon}
          Paragraph="Stay ahead of your schedule by analyzing your pending tasks in one clear view. Identify priorities, track approaching deadlines, and take timely action to complete tasks efficiently before they expire, ensuring nothing important is left unfinished."
          Heading="Analyze Pending Tasks List , Complete them before deadline"
        ></Card>
        <Card
          Children={LayoutDashboard}
          Paragraph="Get a personalized dashboard that gives you a clear snapshot of your productivity and performance. Track completed tasks, pending work, points earned, and overall progress in one place, helping you make better decisions and continuously improve your efficiency."
          Heading="Personalized Dashboard reflecting Performance"
        ></Card>
        <Card
          Children={Target}
          Paragraph="Review your daily performance to understand what you've achieved and where you can improve. Use these insights to set meaningful goals, stay focused, and continuously refine your productivity with clear direction and measurable progress."
          Heading="Analyze each day performance , Set Goals"
        ></Card>
      </div>
      <div className="w-full h-[1px] bg-linear-to-r from-neutral-400 via-red-600 to-neutral-400 "></div>
      <div className="mt-6 md:mt-9 w-full flex justify-center">
        <div className="w-fit h-fit bg-linear-to-tr bg-clip-text from-0% from-gray-50 via-55% via-gray-500 to-85% to-gray-50">
          <h1 className="text-[26px] md:text-[50px] text-transparent text-center tracking-tighter font-extrabold cursor-default">Login to experience best features</h1>
        </div>
      </div>
      <p className="mt-[9px] text-center text-[15.7px] tracking-tighter md:text-[24px] font-serif text-neutral-400">Join Thousands who get their schedule organised and planned!</p>
      <div className="flex justify-center gap-5 md:gap-8 mt-5">
        <button className="px-12 md:px-25 py-1.5 md:py-4 outline-2 outline-white outline-offset-1 md:outline-offset-3 bg-red-500  md:bg-red-700 cursor-pointer text-black rounded-lg font-semibold text-[20px]">Signup</button>
        <button className="px-12 md:px-25 py-1.5 md:py-4 outline-2 outline-white outline-offset-1 md:outline-offset-3 bg-red-500 md:bg-red-700 cursor-pointer text-black rounded-lg font-semibold text-[20px]">Signin</button>
      </div>
      <div className="w-full h-[1px] bg-linear-to-r from-neutral-400 via-red-600 to-neutral-400 mt-12 md:mt-18 mb-3 md:mb-5"></div>
      <div className="w-full h-[1px] bg-linear-to-r from-neutral-400 via-red-600 to-neutral-400 mt-13 md:mt-20"></div>
    </div>
  );
}
