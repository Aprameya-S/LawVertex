"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import WalletConnect from '@/components/WalletConnect';
import { AdminCaseDetailsLinks, CaseDetailsLinks, CourtsCaseDetailsLinks } from '@/lib/links';
import { getRole } from '@/hooks/useLegalDataContract';


const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [role, setRole] = useState<any>("user")

  const getData = async() => {
    var data = await getRole()
    setRole(data)
  }
  useEffect(() => {
    getData()
  },[])

  return (
    <>
    <WalletConnect>
      <nav className='hidden lg:grid px-5 pt-5 min-h-[calc(100svh-87.2px)] flex-1 w-[260px] content-start fixed border-slate-200 dark:border-zinc-800'>
        {
          role==="court" &&
          <div className='mb-4 grid'>
          <div className="text-sm bg-blue-200 dark:bg-[#18316b] border border-blue-600  flex items-center px-3 rounded-full gap-1 font-medium py-1 w-fit mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-landmark"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
            Court
          </div>
          {
            CourtsCaseDetailsLinks.map((item,index) => (
              <Link href={item.href} key={index} className='pl-[10px] border-l-2 border-slate-300 font-normal text-slate-600 text-[14px] py-1 hover:text-slate-800 hover:border-slate-500 dark:text-gray-400 dark:hover:text-white dark:border-gray-600 dark:hover:border-white'>{item.title}</Link>
            ))
          }
          </div>
        }
        {
          role==="admin" &&
          <div className='mb-4 grid'>
          <div className="text-sm bg-blue-200 dark:bg-[#18316b] border border-blue-600  flex items-center px-3 rounded-full gap-1 font-medium py-1 w-fit mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            Admin
          </div>
          {
            AdminCaseDetailsLinks.map((item,index) => (
              <Link href={item.href} key={index} className='pl-[10px] border-l-2 border-slate-300 font-normal text-slate-600 text-[14px] py-1 hover:text-slate-800 hover:border-slate-500 dark:text-gray-400 dark:hover:text-white dark:border-gray-600 dark:hover:border-white'>{item.title}</Link>
            ))
          }
          </div>
        }
        {
          CaseDetailsLinks.map((item,index) => (
            <Link href={item.href} key={index} className='pl-[10px] border-l-2 border-slate-300 font-normal text-slate-600 text-[14px] py-1 hover:text-slate-800 hover:border-slate-500 dark:text-gray-400 dark:hover:text-white dark:border-gray-600 dark:hover:border-white'>{item.title}</Link>
          ))
        }
        
      </nav>
      <main className="lg:ml-[260px] mt-4">
        {children}
      </main>
    </WalletConnect>
    </>
  )
}

export default Layout