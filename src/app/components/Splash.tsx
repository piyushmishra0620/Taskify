"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {useState, useEffect} from "react";
import GradientSpinner from "./GradientSpinner";

export default function SplashScreen() {
  const [image, setImage] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setImage(false), 3000);
    return () => clearTimeout(t);
  }, []);
  return (
    <>
      <AnimatePresence>
        <motion.div
          className="w-screen h-screen bg-black flex justify-center items-center"
          initial={{ opacity: 0, y: 1000 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -1000 }}
          transition={{ ease: [0.2, 1.4, 0.5, 1] }}
        >
          <div className="relative w-50 h-50 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {image ? (
                <motion.div
                  key="image"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image src="/Icon.png" alt="Icon" width={160} height={160} priority />
                </motion.div>
              ) : (
                <motion.div
                  key="spinner"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.25 }}
                >
                  <GradientSpinner size={80} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
