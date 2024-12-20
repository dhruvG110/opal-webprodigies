import React from "react";
import { MenuIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const LandingPageNavbar = () => {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="text-3xl font-semibold items-center flex gap-x-3">
        <MenuIcon className="w-6 h-6"/>
        <Image src="/favicon.ico" alt="logo" width={40} height={40}/>
      </div>
      <div className="hidden gap-x-10 items-center lg:flex text-md">
        <Link  href="/" className="bg-[#7320DD] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#7320DD]/80 transition-all duration-300">Home</Link>
        <Link href="/">About</Link>
        <Link href="/">Contact</Link>
      </div>
      <Link href="/auth/sign-in" ><Button variant='secondary'> <User className="w-6 h-6"/>Login</Button></Link>
      LandingPageNavbar
    </div>
  );
};

export default LandingPageNavbar;
