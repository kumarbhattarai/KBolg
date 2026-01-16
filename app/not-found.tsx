import { Button } from '@/components/ui/button'
import Link from 'next/dist/client/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh] text-center px-4'>
      <h1 className="text-6xl font-extrabold mb-4 ">404</h1>
      <h1 className="text-2xl font-extrabold mb-4 ">Page not found</h1>
      <p className='mb-4'>The page you are looking for does not exist.</p>
      <Link href="/"><Button>Go Home</Button></Link>
    </div>
  )
}
