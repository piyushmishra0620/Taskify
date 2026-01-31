import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/app/contexts/authContext";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer,Bounce} from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taskify",
  description:
    "Personal and Professional task management platform : Set tasks, map productivity and achieve goals.",
  icons:{
    icon:"./favicon.ico",
    shortcut:"./favicon.ico",
    apple:"/todo/public/apple-touch-icon.png"
  } 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <ToastContainer position="top-center" autoClose={3000} transition={Bounce}/>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
