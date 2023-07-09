import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isDev () {
  // @ts-ignore
  return process.env.NODE_ENV === 'dev' || process.env.NODE_ENV ==='development'
}
