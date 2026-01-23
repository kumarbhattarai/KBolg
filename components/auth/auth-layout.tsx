'use client'
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import LoginForm from "./login-form"
import RegisterForm from "./register-form"

export default function AuthLayout() {
  const [activeTab,setActiveTab]=useState("Login")
  return (
    <div className='flex justify-center items-center min-h-[80vh]'>
      <div className="w-full max-w-md p-5 bg-card rounded-lg shadow-sm border">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome</h1>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-100">
  <TabsList>
    <TabsTrigger value="Login">Login</TabsTrigger>
    <TabsTrigger value="Register">Register</TabsTrigger>
  </TabsList>
  <TabsContent value="Login"><LoginForm/></TabsContent>
  <TabsContent value="Register"><RegisterForm onSuccess={()=>setActiveTab("Login")}/></TabsContent>
</Tabs>
      </div>
    </div>
  )
}
