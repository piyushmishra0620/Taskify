"use client";

import Link from "next/link";
import { useState } from "react";
import { signupSchema } from "@/schemas/signupSchema";
import { motion, AnimatePresence } from "framer-motion";
import {useAuth} from "@/app/contexts/authContext";
import {TailSpin} from "react-loader-spinner";
import {useRouter} from "next/navigation"
import {toast} from "react-toastify";

export default function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading,setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [nameError, setNameError] = useState<boolean | string>("");
  const [nameErr, setNameErr] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean | string>("");
  const [emailErr, setEmailErr] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean | string>("");
  const [passwordErr, setPasswordErr] = useState<string>("");
  const {register} = useAuth();

  function nameValidation() {
    const res = signupSchema.shape.name.safeParse(name);
    if (!res.success) {
      setNameError(true);
      setNameErr(res.error.issues[0].message);
    } else {
      setNameError(false);
    }
  }
  
  function emailValidation() {
    const res = signupSchema.shape.email.safeParse(email);
    if (!res.success) {
      setEmailError(true);
      setEmailErr(res.error.issues[0].message);
    } else {
      setEmailError(false);
    }
  }

  function passwordValidation() {
    const res = signupSchema.shape.password.safeParse(password);
    if (!res.success) {
      setPasswordError(true);
      setPasswordErr(res.error.issues[0].message);
    } else {
      setPasswordError(false);
    }
  }

  async function signUpHandler() {
    const res = signupSchema.safeParse({ name, email, password });
    if (!res.success) {
      const nameInvalid = res.error.issues.find((issue)=>issue.path[0]=="name");
      const emailInvalid = res.error.issues.find((issue)=>issue.path[0]=="email");
      const passwordInvalid = res.error.issues.find((issue)=>issue.path[0]=="password");
      if(nameInvalid){
        setNameError(true);
        setNameErr(nameInvalid.message);
      } 
      if(emailInvalid){
        setEmailError(true);
        setEmailErr(emailInvalid.message);
      }
      if(passwordInvalid){
        setPasswordError(true);
        setPasswordErr(passwordInvalid.message);
      }
      return;
    }else{
      setNameError(false);
      setEmailError(false);
      setPasswordError(false);
    }
    setLoading(true);
    try {
      const res = await register({name,email,password});
      setLoading(false);
      if(res.message){
        if(res.message=="Bad request. All credentials required."){
          toast.warning("Fill in all the fields!",{style:{backgroundColor:"red",borderBlockColor:"white",color:"black"}});
        }else if(res.message=="Account already registered."){
          toast.error("Account exists with this email-id!",{style:{backgroundColor:"red",borderBlockColor:"white",color:"black"}});
        }else{
          toast.error("Server side error occurred.",{style:{backgroundColor:"red",borderBlockColor:"white",color:"black"}});
        }
      }else{
        toast.success("Registered Successfully!",{style:{backgroundColor:"green",borderBlockColor:"white",color:"black"}});
        setTimeout(()=>{
          router.push("/profile/dashboard",{scroll:true});
          router.prefetch("/profile/settings");
        },3000);
      }
    } catch (err: any) {
      setLoading(false);
      toast.error("Something went wrong , please try again!",{style:{backgroundColor:"red",borderBlockColor:"white",color:"black"}});
    }
  }
  return (
    <>
      <div className="min-h-screen min-w-screen flex justify-center items-center">
        <fieldset className="relative  md:p-[60px] max-md:p-[20px] md:pb-12 max-md:pb-10 md:pt-[1px] max-md:pt-[5px] md:mt-3  border-2 border-gray-500 rounded-xl flex flex-col">
          <legend className="text-center">
            <div className="w-fit h-fit bg-clip-text bg-linear-to-br from-gray-200 via-gray-400 to-gray-300">
              <p className="text-[60px] max-md:text-[40px] font-bold text-transparent cursor-default">
                SIGNUP
              </p>
            </div>
          </legend>
          <p className="text-center text-[35px] max-md:text-[26px] font-extrabold cursor-default">
            CREATE ACCOUNT
          </p>
          <p className="mt-[2px] text-center text-[18px] max-md:text-[12px] max-md:font-semibold font-medium cursor-default">
            Register and experience best features
          </p>
          <div className="mt-2 max-md:mt-3">
            <label
              htmlFor="name"
              className="text-md font-medium max-md:text-sm max-md:font-medium"
            >
              Name:
            </label>
            <br />
            <input
              id="name"
              className={`mt-2 px-5 py-[10px] max-md:py-[8px] max-md:px-3 w-[500px] max-md:w-[295px] border rounded-lg bg-black placeholder:font-serif font-serif ${nameError === true? "border-red-600": nameError === false? "border-green-500": "border-gray-400"}`}
              placeholder="Name*"
              onBlur={nameValidation}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <AnimatePresence>
              {nameError && nameErr && (
                <motion.p
                  initial={{ y: -15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  className="text-red-700 font-serif mt-2"
                >
                  {nameErr}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-3 max-md:mt-2.5">
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
              className={`mt-2 px-5 py-[10px] max-md:py-[8px] max-md:px-3 w-[500px] max-md:w-[295px] border ${
                emailError === true
                  ? "border-red-600"
                  : emailError === false
                  ? "border-green-500"
                  : "border-gray-400"
              } focus:border-white rounded-lg bg-black placeholder:font-serif font-serif`}
              placeholder="Email*"
              onBlur={emailValidation}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <AnimatePresence>
              {emailError && emailErr && (
                <motion.p
                  initial={{ y: -15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  className="text-red-700 font-serif mt-2"
                >
                  {emailErr}
                </motion.p>
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
                type="password"
                className={`mt-2 px-5 py-[10px] max-md:py-[8px] max-md:px-3 w-[500px] max-md:w-[295px] border ${
                  passwordError === true
                    ? "border-red-600"
                    : passwordError === false
                    ? "border-green-500"
                    : "border-gray-400"
                } rounded-lg bg-black placeholder:font-serif font-serif`}
                placeholder="Password*"
                onBlur={passwordValidation}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <AnimatePresence>
                {passwordError && passwordErr && (
                  <motion.p
                    initial={{ y: -15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    className="text-red-700 font-serif mt-2"
                  >
                    {passwordErr}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex justify-start space-x-10 mt-[16px]">
            <p className="text-[14px] max-md:text-[13px] font-serif cursor-default">
              Already Registered?{"  "}
              <Link href="/login">
                <span className="underline text-red-500 font-serif ps-[2px] text-[14px] max-md:text-[13px]">
                  Login
                </span>
              </Link>
            </p>
          </div>
          <div className="w-full h-fit flex justify-center md:mt-6 max-md:mt-8">
            <button
              className="cursor-pointer relative w-[100%] max-md:w-[100%] py-[14px] px-25 max-md:px-14 max-md:py-[9px] font-bold max-md:font-semibold text-lg rounded-xl bg-red-600 focus:bg-red-500 hover:bg-red-500 outline-offset-2 outline-1 max-md:outline-2 outline-gray-100 text-black"
              onMouseDown={signUpHandler}
            >
              {loading?(<div className="w-full h-full absolute bg-transparent flex justify-center items-center"><TailSpin height={19} width={19} strokeWidth={6} color="#ffffff"/></div>):"Signup"}
            </button>
          </div>
        </fieldset>
      </div>
    </>
  );
}
