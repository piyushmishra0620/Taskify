"use client";

import Link from "next/link";
import { useState } from "react";
import {Eye,EyeOff} from "lucide-react";
import {loginSchema} from "@/schemas/loginSchema";
import {motion,AnimatePresence} from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [emailError,setEmailError]=useState<boolean | string>("");
  const [emailErr,setEmailErr] = useState<string>("");
  const [passwordError,setPasswordError]= useState<boolean | string>("");
  const [passwordErr,setPasswordErr] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [notview ,setNotView] = useState<boolean>(true);

  function emailValidation() {
    const res = loginSchema.shape.email.safeParse(email);
    if(!res.success){
      setEmailError(true);
      setEmailErr(res.error.issues[0].message);
    }else{
      setEmailError(false);
    }
  }

  function passwordValidation() {
    const res = loginSchema.shape.password.safeParse(password);
    if(!res.success){
      setPasswordError(true);
      setPasswordErr(res.error.issues[0].message);
    }else{
      setPasswordError(false);
    }
  }

  function loginHandler() {
    const res = loginSchema.safeParse({email,password});
    if(!res.success){
    }
    try{
    }catch(err:any){
    }
  }
  return (
    <>
      <div className="min-h-screen min-w-screen flex justify-center items-center">
        <fieldset className="relative  md:p-[60px] max-md:p-[20px] md:pb-12 max-md:pb-10 md:pt-[1px] max-md:pt-[5px] md:mt-3  border-2 border-gray-500 rounded-xl flex flex-col">
          <legend className="text-center">
            <div className="w-fit h-fit bg-clip-text bg-linear-to-br from-gray-200 via-gray-400 to-gray-300">
              <p className="text-[60px] max-md:text-[40px] font-bold text-transparent cursor-default">
                LOGIN
              </p>
            </div>
          </legend>
          <p className="text-center text-[35px] max-md:text-[26px] font-extrabold cursor-default">
            WELCOME BACK!
          </p>
          <p className="mt-[2px] text-center text-[18px] max-md:text-[12px] max-md:font-semibold font-medium cursor-default">
            Sign in to experience best features
          </p>
          <div className="mt-2 max-md:mt-4">
            <label
              htmlFor="email"
              className="text-md font-medium max-md:text-sm max-md:font-medium"
            >
              Email:
            </label>
            <br />
            <input
              id="email"
              type="email"
              className={`mt-2 px-5 py-[10px] max-md:py-[8px] max-md:px-3 w-[500px] max-md:w-[295px] border ${emailError===true?"border-red-600":emailError===false?"border-green-500":"border-gray-400"} rounded-lg bg-black placeholder:font-serif font-serif`}
              placeholder="Email*"
              onBlur={emailValidation}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            <AnimatePresence>
              {(emailError && emailErr) && (
                <motion.p initial={{y:-15,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-15,opacity:0}} className="text-red-700 font-serif mt-2">{emailErr}</motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-3 max-md:mt-2.5">
            <label
              htmlFor="password"
              className="text-md font-medium max-md:text-sm max-md:font-medium"
            >
              Password:
            </label>
            <br />
            <div className="relative w-fit h-fit">
              <input
                id="password"
                type={notview?"password":"text"}
                className={`mt-2 px-5 py-[10px] max-md:py-[8px] max-md:px-3 w-[500px] max-md:w-[295px] border ${passwordError===true?"border-red-600":passwordError===false?"border-green-500":"border-gray-400"} rounded-lg bg-black placeholder:font-serif font-serif`}
                placeholder="Password*"
                onBlur={passwordValidation}
                value={notView?:password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
              <div className="absolute inset-y-[17px] md:inset-y-[19px] right-2 z-10 cursor-pointer" onClick={()=>setNotView(!notview)}>
                {notview?<Eye/>:<EyeOff/>}
              </div>
            </div>
            <AnimatePresence>
              {(passwordError && passwordErr) && (
                <motion.p initial={{y:-15,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-15,opacity:0}} className="text-red-700 font-serif mt-2">{passwordErr}</motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="flex justify-between space-x-10 mt-[16px]">
            <p className="text-[14px] max-md:text-[13px] font-serif cursor-default">
              Didn&apos;t Register?{"  "}
              <Link href="/signup">
                <span className="underline text-red-500 font-serif ps-[2px] text-[13px] max-md:text-[14px]">
                  Sign Up
                </span>
              </Link>
            </p>
            <p className="underline text-[14px] max-md:text-[13px] cursor-pointer text-red-500 font-serif">
              Forgot Password?
            </p>
          </div>
          <div className="w-full h-fit flex justify-center md:mt-6 max-md:mt-8">
            <button
              className="cursor-pointer w-[100%] max-md:w-[100%] py-[14px] px-25 max-md:px-14 max-md:py-[9px] font-bold max-md:font-semibold text-lg rounded-xl bg-red-600 focus:bg-red-500 hover:bg-red-500 outline-offset-2 outline-1 max-md:outline-2 outline-gray-100 text-black"
              onMouseDown={loginHandler}
            >
              Login
            </button>
          </div>
        </fieldset>
      </div>
    </>
  );
}
