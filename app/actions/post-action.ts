'use server'

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { slugify } from "@/lib/utils"
import { headers } from "next/headers"
import {posts} from "@/lib/db/schema"

import * as relations from "@/lib/db/relations"
import { revalidatePath } from "next/cache"

export async function createPost(formData:FormData){
    try{
        const session=await auth.api.getSession({
            headers: await headers()
        })
        if(!session||!session.user){
            return{
                success:false,
                message:'Log in to create a post.'
            }
        }

        //get form data
        const title=formData.get('title') as string
        const description=formData.get('description') as string
        const content=formData.get('content') as string
        if(!title||!description||!content){
            return{
                success:false,
                message:'All fields are required.'
            }
        }

        //creating slug
        const slug=slugify(title)
        
        //checking duplicacy 
        
        const existingPost=await db.query.posts.findFirst({
            where: { slug: slug }
        })
        if(existingPost){
            return{
                success:false,
                message:'A post with the same title already exists. Please choose a different title.'
            }
        }
        
        const [newPost]= await db.insert(posts).values({
            title, description, content, slug, authorId:session.user.id
        }).returning()
        revalidatePath('/')
        revalidatePath(`/post/${slug}`)
        revalidatePath('/profile')
        return{
            success:true,
            message:'Post created successfully.',
            slug
        }
        //revalidate to home page to show the new post
        
    }catch(error){
        return{
            success:false,
            message:'Failed to create post.'
        }
    }
}