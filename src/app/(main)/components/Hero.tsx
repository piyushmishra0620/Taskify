"use client";

import {useRef} from "react";
import {useRouter} from "next/navigation";
import {motion,AnimatePresence} from "framer-motion";
import {gsap} from "gsap";
import {SplitText} from "gsap/SplitText";
import {useGSAP} from "@gsap/react";
import {useAuth} from "@/app/contexts/authContext";

gsap.registerPlugin(SplitText);

export function Hero() {
  const {context} = useAuth();
  const router = useRouter();
  const paragraphContainer = useRef(null);
  const paragraphRef = useRef(null);
  const containerVariants = {
    hidden: {},
    show: {
      transition: { when: "beforeChildren", delayChildren: 0.8, staggerChildren: 0.4 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  useGSAP(()=>{
    const tl = gsap.timeline();
    const split = SplitText.create(paragraphRef.current,{
      type:"words,chars,lines"
    });
    tl.fromTo(paragraphContainer.current,{opacity:0},{opacity:1,delay:1.2}).fromTo(split.lines,{y:20,opacity:0},{y:0,opacity:1,stagger:0.15,ease:"power4.out",duration:0.15});
  },{scope:paragraphContainer});

  return (
    <>
      <motion.div className="w-full  flex justify-center" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.35,duration:0.35,ease:[0.2,1.4,0.5,1]}}>
        <div className="h-fit w-fit bg-linear-to-tr from-0% from-gray-50 via-55% via-gray-500 to-85% to-gray-50 bg-clip-text">
          <h1 className="text-[70px] md:text-[100px] font-extrabold text-center text-transparent cursor-default" >
            TASKIFY
          </h1>
        </div>
      </motion.div>
      <div ref={paragraphContainer} className="w-full flex justify-center h-fit">
        <p ref={paragraphRef} className="w-[330px] md:w-[380px] h-fit text-neutral-300/80 text-md md:text-xl cursor-default text-center">
          Set Tasks , Keep Track of your Progress , Complete them before
          deadline and Achieve your Goals through Taskify
        </p>
      </div>
      <motion.div
        className="mt-7 flex space-x-4.5 md:space-x-7 justify-center h-fit"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.button
          variants={childVariants}
          className="px-4 md:px-5 py-3 md:py-4 bg-red-600 focus:bg-red-500 hover:bg-red-500 md:bg-[lab(44 76.83 71.8)] cursor-pointer text-gray-300 font-bold md:text-lg text-md border border-red-500 outline-2 outline-amber-50 outline-offset-3 rounded-lg hover:-translate-y-1 ease-in duration-100"
          onClick={() => {
            if(context.User){
              router.push("/tasks");
              router.prefetch("/tasks/:id");
              router.prefetch("/tasks/list");
            }else{
              router.push("/login", { scroll: true });
              router.prefetch("/signup");
            }
          }}
          transition={{ duration: 0.08, ease: [0.15, 1.2, 0.4, 1] }}
        >
          {context.User?"Manage Tasks":"Get Started >"}
        </motion.button>
        <motion.button
          variants={childVariants}
          className="px-4 py-3 md:px-5 md:py-4 bg-linear-to-br focus:bg-white hover:bg-gray-300/80 from-gray-300 via-gray-300/80 to-gray-300 cursor-pointer text-black font-bold text-md md:text-lg border border-amber-50 outline-2 outline-amber-50 outline-offset-3 rounded-lg hover:-translate-y-1 ease-in duration-100"
          transition={{ duration: 0.07, ease: [0.2, 1.35, 0.35, 1.1] }}
          onClick={()=>{
            if(context.User){
              router.push("/tasks/list");
              router.prefetch("/tasks/:id");
              router.prefetch("/tasks");
            }else{
              router.push("/tasks/:id");
            }
          }}
        >
          {context.User?"View Pending Tasks":"Set Tasks For a Day"}
        </motion.button>
      </motion.div>
    </>
  );
}
