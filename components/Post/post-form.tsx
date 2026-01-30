'use client'
import {z} from 'zod'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

const postSchema=z.object({
title:z.string().min(3,'Title must be at least 3 characters long').max(100,'Title must be at most 100 characters long'),
description:z.string().min(10,'Description must be at least of 10 characters long').max(100,'Description must not exceed 100 characters'),
content:z.string().min(10,'Description must be at least of 10 characters long')
})
type PostFormValues=z.infer<typeof postSchema>

export default function PostForm() {
  return (
    <form action="" className='space-y-5'>
      <div className='space-y-2'>
    <Label htmlFor='title'>Title</Label>
    <Input id='title' placeholder='Enter your Title'></Input>
      </div>
      <div className='space-y-2'>
    <Label htmlFor='description'>Description</Label>
    <Textarea id='description' placeholder='Enter a short description'></Textarea>
      </div>
      <div className='space-y-2'>
    <Label htmlFor='content'>Content</Label>
    <Textarea id='content' placeholder='Enter your content' className='min-h-45 resize-none'></Textarea>
      </div>
      <Button className='mt-5'>Create Post</Button>
    </form>
  )
}
