'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import {useForm } from 'react-hook-form'
import {z} from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { signIn } from '@/lib/auth-client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

    const loginSchema=z.object({
        email: z.email("Enter your email"),
        password:z.string().min(6,"Password must be atleast of 6 characters")
    })
    type LoginFormValues=z.infer<typeof loginSchema>

export default function LoginForm() {
const [isLoading,setIsLoading]=React.useState(false)
const router= useRouter()
const form= useForm<LoginFormValues>({
    resolver:zodResolver(loginSchema),
    defaultValues:{
        email:"",
        password:""
    }
})
async function onLoginSubmit(values:LoginFormValues){
    setIsLoading(true)
    try{
        const{error}=await signIn.email({
            email:values.email,
            password:values.password,
            rememberMe:true,
        })
        if(error){
            toast("Failed to login. Please check your credentials and try again.",{
                description: new Date().toLocaleString()
            })
            return
        }
        toast("Logged in successfully.",{
            description: new Date().toLocaleString()
        })
        router.push("/")
        

    }catch(e){
        toast("An unexpected error occurred. Please try again later.",{
            description: new Date().toLocaleString()
        })
        console.log(e)
    }
    finally{
        setIsLoading(false)
    }
}
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onLoginSubmit)} className='space-y-5'>
            <FormField
            control={form.control}
            name="email"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder='Enter your Email' {...field}></Input>
                    </FormControl>
                    <FormDescription> </FormDescription>
                    <FormMessage></FormMessage>
                </FormItem>
            )}></FormField>

                        <FormField
            control={form.control}
            name="password"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type='password' placeholder='Enter your Password' {...field}></Input>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage></FormMessage>
                </FormItem>
            )}></FormField>
            <Button type ="submit" disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</Button>
        </form>
    </Form>
  )
}
