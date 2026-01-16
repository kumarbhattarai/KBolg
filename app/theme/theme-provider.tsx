'use client'
import React from 'react'
import {ThemeProvider as NextThemeProvider, ThemeProviderProps} from "next-themes"
import { cn } from '@/lib/utils'
import Header from '../layout/header'
interface Themes extends ThemeProviderProps{
    children:React.ReactNode
    containerClassName?:string
}

export default function ThemeProvider({children,containerClassName,...props}:Themes) {
  return (
    <NextThemeProvider {...props}>
        <Header></Header>
        <main className={cn("container mx-auto px-4", containerClassName)}>
            {children}
        </main>
        <footer>footer  </footer>
    </NextThemeProvider>
  )
}
