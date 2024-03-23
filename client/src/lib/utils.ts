import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import * as CryptoJS from 'crypto-js'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const convertBytes = (x:string) => {
  const units = ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let l = 0, n = parseInt(x, 10) || 0;
  while(n >= 1024 && ++l){
      n = n/1024;
  }
  return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

const encryptAES = (text:string, key:string) => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

export const dec2hex = (dec:number) => {
  return dec.toString(16).padStart(2, "0")
}
export const generateId = (len:number) => {
  var arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}