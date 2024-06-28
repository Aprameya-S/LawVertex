"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RegisterLawyerLinks, SearchLawyersLinks } from "@/lib/links"
import { useState } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  

  const pathname = usePathname().split("/")
  const path = pathname[pathname.length-1]
  let navRouter
  if(path === "Lawyers"){
    navRouter = SearchLawyersLinks.map((item,index) => (
      <Link key={index} href={item.href} className={`text-[14px] py-1 hover:text-slate-800 flex gap-2  items-center ${(item.href)?'text-black dark:text-white font-semibold':'font-normal text-slate-600 dark:text-gray-400 dark:hover:text-white '}`}>
      {item.icon}
      {item.title}
      </Link>
    ))
  }else if(path === "register"){
    navRouter = RegisterLawyerLinks.map((item,index) => (
      <Link key={index} href={item.href} className={`text-[14px] py-1 hover:text-slate-800 flex gap-2  items-center ${(item.href)?'text-black dark:text-white font-semibold':'font-normal text-slate-600 dark:text-gray-400 dark:hover:text-white '}`}>
        {item.icon}
        {item.title}
      </Link>
    ))
  }else{
    navRouter = SearchLawyersLinks.map((item,index) => (
      <Link key={index} href={`${item.href}`} className={`text-[14px] py-1 hover:text-slate-800 flex gap-2  items-center ${(item.href)?'text-black dark:text-white font-semibold':'font-normal text-slate-600 dark:text-gray-400 dark:hover:text-white '}`}>
        {item.icon}
        {item.title}
      </Link>
    ))
  }


  return (
    <>
      <nav className='hidden lg:grid pr-5 pt-5 min-h-[calc(100svh-87.2px)] flex-1 w-[230px] content-start fixed border-slate-200 dark:border-zinc-800 '>
        {navRouter}
      </nav>
      <main className="lg:ml-[270px] mt-[18px] min-h-[calc(100vh-150px)]">

          {children}
      </main>

    </>
  )
}

export default Layout