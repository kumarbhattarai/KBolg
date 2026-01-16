'use client'
import Link from 'next/dist/client/link'
import React from 'react'
import {cn} from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Header() {
  const navItems=[{
    label:'Home',
    href:'/'
  },
  {
    label:'create',
    href:'/post/create'
  },
  {
    label:'edit',
    href:'/post/edit'
  },
]
const router=useRouter()
  return (
    <header className='border-b bg-background sticky top-0 z-10'>
      <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <div className="flex items-center gap-6 ">
<Link href="/" className="text-lg font-bold">KBolg</Link>
<nav className='hidden md:flex items-center gap-6 cursor-pointer'>
{
  navItems.map(item=>(
    <Link key={item.href} href={item.href} className={cn('text-md font-medium transition-colors hover:text-primary')}>{item.label}</Link>
  ))
}
</nav>
</div>
<div className='flex items-center gap-4'>
<div className='hidden md:block'> {/* search */} </div>
<div className="flex items-center gap-2">
  <Button className='cursor-pointer' onClick={()=>router.push("/auth")}>Login</Button>

</div>

        </div>
      </div>
    </header>
  )
}
