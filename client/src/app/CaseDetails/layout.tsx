import React from 'react'
import Link from "next/link";
import WalletConnect from '@/components/WalletConnect';
import { AdminCaseDetailsLinks, CaseDetailsLinks } from '@/lib/links';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  
  return (
    <>
    <WalletConnect>
      <nav className='grid px-5 pt-5 min-h-[calc(100svh-87.2px)] flex-1 w-[260px] content-start fixed border-slate-200 dark:border-zinc-800 '>
        {
          AdminCaseDetailsLinks.map((item,index) => (
            <Link href={item.href} key={index} className='pl-[10px] border-l-2 border-slate-300 font-normal text-slate-600 text-[14px] py-1 hover:text-slate-800 hover:border-slate-500 dark:text-gray-400 dark:hover:text-white dark:border-gray-600 dark:hover:border-white'>{item.title}</Link>
          ))
        }
        {
          CaseDetailsLinks.map((item,index) => (
            <Link href={item.href} key={index} className='pl-[10px] border-l-2 border-slate-300 font-normal text-slate-600 text-[14px] py-1 hover:text-slate-800 hover:border-slate-500 dark:text-gray-400 dark:hover:text-white dark:border-gray-600 dark:hover:border-white'>{item.title}</Link>
          ))
        }
        <Link href='/addNewCase' className='pl-[10px] border-l-2 border-slate-300 font-normal text-slate-600 text-[14px] py-1 hover:text-slate-800 hover:border-slate-500 dark:text-gray-400 dark:hover:text-white dark:border-gray-600 dark:hover:border-white'>Add New Case</Link>

       
        <Link href='/uploadPublicDocs' className='pl-[10px] border-l-2 border-slate-300 font-normal text-slate-600 text-[14px] py-1 hover:text-slate-800 hover:border-slate-500 dark:text-gray-400 dark:hover:text-white dark:border-gray-600 dark:hover:border-white'>Upload Public Doc</Link>

        <Link href='/viewPublicDocs' className='pl-[10px] border-l-2 border-slate-300 font-normal text-slate-600 text-[14px] py-1 hover:text-slate-800 hover:border-slate-500 dark:text-gray-400 dark:hover:text-white dark:border-gray-600 dark:hover:border-white'>View Public Docs</Link>

        <Link href='' className='pl-[10px] border-l-2 border-slate-300 font-normal text-slate-600 text-[14px] py-1 hover:text-slate-800 hover:border-slate-500 dark:text-gray-400 dark:hover:text-white dark:border-gray-600 dark:hover:border-white'>Court Orders</Link>
      </nav>
      <main className="ml-[260px] mt-4">
        {children}
      </main>
    </WalletConnect>
    </>
  )
}

export default Layout