"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { VaultLinks } from '@/lib/links'
import { usePathname } from 'next/navigation'
import DarkModeSwitcher from './DarkModeSwitch'

const HamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  let path = usePathname()
  path='/'+path.split('/').splice(1,2).join('/')
  if(path==='/Vault/file'){
    path='/Vault'
  }

  return (
    <>
      <Button variant='ghost' className='p-1 scale-x-125' onClick={(e) => setIsMenuOpen((prev) => !prev)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </Button>

      <div className={`menu transition-all fixed top-[65.2px] sm:top-[77.2px] w-screen h-screen bg-white dark:bg-[#0e0e10] z-50 px-6 pt-5 ease-out duration-300 grid grid-cols-[auto_38px] ${isMenuOpen?'left-0':'left-[100vw]'}`}>
        <div className="links">
          <Link href='CaseDetails'onClick={(e) => setIsMenuOpen((prev) => !prev)}>Case Details</Link>
          <div className="pl-5 grid mb-3">

          </div>

          <Link href='Vault'onClick={(e) => setIsMenuOpen((prev) => !prev)}>Vault</Link>
          <div className="pl-5 grid mb-3">
            {
              VaultLinks.map((item,index) => (
                <Link key={index} href={item.href} className={`pl-[10px] border-l-2  text-[14px] py-1 hover:text-slate-800 hover:border-slate-500  ${(path===item.href)?'text-black dark:text-white font-semibold border-blue-600 hover:border-blue-600 dark:hover:border-blue-600':'border-slate-300 font-normal text-slate-600 dark:text-gray-400 dark:hover:text-white dark:border-gray-600 dark:hover:border-white'}`} onClick={(e) => setIsMenuOpen((prev) => !prev)}>
                  {item.title}
                </Link>
              ))
            }
          </div>

          <Link href='SearchAdvocate'onClick={(e) => setIsMenuOpen((prev) => !prev)}>Search Advocate</Link>
        </div>
        <div className="" onClick={(e) => setIsMenuOpen((prev) => !prev)}>
          <DarkModeSwitcher/>
        </div>
      </div>
    </>
  )
}

export default HamburgerMenu