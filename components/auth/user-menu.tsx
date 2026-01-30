'use client'
import {useState} from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {User} from 'better-auth'
import { LogOut, PenBox, UserIcon } from 'lucide-react'
import { signOut } from '@/lib/auth-client'
import { toast } from 'sonner'

interface UserMenuProps {
user:User
}

export default function UserMenu(user:UserMenuProps) {
const [isLoading, setIsLoading]=useState(false)
const router=useRouter()

async function handleLogout(){
  setIsLoading(true)
  try{
    await signOut({
      fetchOptions:{
        onSuccess:()=>{
          toast("Logout Successful.",{
            description: new Date().toLocaleString()
          })
          router.refresh()
        }
      }
    })
  }catch(e){
    console.error('logout failed',e)
    toast("failed to logout. Please try again.",{
      description: new Date().toLocaleString()
    })
  }
  finally{
    setIsLoading(false)
  }

}

function getInitials(name?:string){
  if(!name) return 'U'
  const names=name.split(' ').map(n=>n[0]).join('').toUpperCase()
  return names
}

  return (
    <div className="flex items-center gap-4">
      <div>
        <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant={'ghost'} className='relative h-8 w-8 rounded-full '>
            
        <Avatar  >
  <AvatarImage src="https://github.com/shadcn.png"/>
  <AvatarFallback>{ getInitials(user?.user.name)}</AvatarFallback>
</Avatar>
     
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent align='end' className='w-56'>
    <DropdownMenuGroup>
      <DropdownMenuLabel><div className='flex flex-col leading-tight'>
        <p className='font-bold'>{user?.user.name}</p>
        <p className='text-sm text-muted-foreground ml-2'>{user?.user.email}</p>
        </div></DropdownMenuLabel>
        <DropdownMenuSeparator />
      <DropdownMenuItem asChild className='cursor-pointer'>
        <Link href="/profile">
        <UserIcon className='mr-1 h-4 w-4'> </UserIcon>
        <span>Profile</span>
        </Link>
      </DropdownMenuItem >
            <DropdownMenuItem asChild className='cursor-pointer'>
        <Link href="/post/create">
         <PenBox className='mr-1 h-4 w-4'> </PenBox>
        <span>Create Post</span>
        </Link>
      </DropdownMenuItem>
      
    <DropdownMenuSeparator />

      <DropdownMenuItem className='cursor-pointer' onClick={handleLogout} disabled={isLoading}>
        <LogOut className='mr-1 h-4 w-4'> </LogOut>
        <span>{isLoading?'logging out...':'Log Out'}</span>
           </DropdownMenuItem>
    
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
      </div>
     
    </div>
  )
}
