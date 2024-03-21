"use client"
import { Button } from './ui/button';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { useTheme } from "next-themes";
import { useEffect, useState } from 'react';

const DarkModeSwitcher = () => {
  const { resolvedTheme, theme, setTheme } = useTheme();
  // const currentTheme = theme === 'system' ? systemTheme : theme;
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true))

  if(mounted)
  return (
      <Button
        variant='ghost'
        className='h-[40px] px-2 cursor-pointer'
        onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")}
      >
        {
          resolvedTheme === 'dark' ? (
            <SunIcon className='h-6 w-6'/>
          ):(
            <MoonIcon className='h-6 w-6'/>
          )
        }
      </Button>
  );
};

export default DarkModeSwitcher;