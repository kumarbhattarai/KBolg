'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import {useForm } from 'react-hook-form'
import {z} from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { signUp } from '@/lib/auth-client'
import { toast } from 'sonner'

    const RegisterSchema=z.object({
        name:z.string().min(3,"Name must be atleast of 3 characters"),
        email: z.email("Enter your email"),
        password:z.string().min(6,"Password must be atleast of 6 characters"),
        conformPassword:z.string().min(6,"Password must be atleast of 6 characters")
    }).refine((data)=>data.password===data.conformPassword,{
        message:"Passwords do not match",
        path:["conformPassword"]
    })
    type RegisterFormValues=z.infer<typeof RegisterSchema>

    interface RegisterFormProps{
        onSuccess?:()=>void
    }

export default function RegisterForm({onSuccess}:RegisterFormProps) {
const [isLoading,setIsLoading]=React.useState(false)
const form= useForm<RegisterFormValues>({
    resolver:zodResolver(RegisterSchema),
    defaultValues:{
        name:"",
        email:"",
        password:"",
        conformPassword:""
    }
})
async function onRegisterSubmit(values:RegisterFormValues){
    setIsLoading(true)
    try{
        const {error}=await signUp.email({
            name:values.name,
            email:values.email,
            password:values.password,
        })
        if(error){
            toast("failed to register user. Please try again later.",{
                description: new Date().toLocaleString()
            })
            return
        }
        toast("User registered successfully. Login to continue.",{
            description: new Date().toLocaleString()
        })
        if(onSuccess){
            onSuccess()
        }
    }catch(e){
        console.log(e)
    }
    finally{
        setIsLoading(false)
    }
}
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onRegisterSubmit)} className='space-y-5'>
                      <FormField
            control={form.control}
            name="name"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder='Enter your Name' {...field}></Input>
                    </FormControl>
                    <FormDescription> </FormDescription>
                    <FormMessage></FormMessage>
                </FormItem>
            )}></FormField>
            <FormField
            control={form.control}
            name="email"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder='Enter your Email' {...field}></Input>
                    </FormControl>
                    <FormDescription></FormDescription>
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
                    <FormDescription> </FormDescription>
                    <FormMessage></FormMessage>
                </FormItem>
            )}></FormField>


                      <FormField
            control={form.control}
            name="conformPassword"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder='Confirm your Password' {...field}></Input>
                    </FormControl>
                    <FormDescription> </FormDescription>
                    <FormMessage></FormMessage>
                </FormItem>
            )}></FormField>

            <Button type ="submit" disabled={isLoading}>{isLoading ? "Signing up..." : "Sign Up"}</Button>
        </form>
    </Form>
  )
}
