'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import {useForm } from 'react-hook-form'
import {z} from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

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

export default function RegisterForm() {
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
  return (
    <Form {...form}>
        <form className='space-y-5'>
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

            <Button>Submit</Button>
        </form>
    </Form>
  )
}
