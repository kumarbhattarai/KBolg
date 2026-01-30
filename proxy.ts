import {getSessionCookie} from "better-auth/cookies"
import { NextRequest,NextResponse } from "next/server";


//define protected routes : /profile,/post/create/,/edit/:id
const protectedRoutes=['/profile','/post/create','/post/edit'];
export async function proxy(request:NextRequest){
    const pathname=request.nextUrl.pathname

    const sessionCookie = getSessionCookie(request)

        if(pathname.startsWith('/auth')&& sessionCookie){
             console.log('redirecting to home from auth page')
        return NextResponse.redirect(new URL('/',request.url))
       
    }

    const isProtectedRoute=protectedRoutes.some(route=>pathname.startsWith(route))
    if(isProtectedRoute&&!sessionCookie){
         console.log('redirecting to auth from protected page')
        return NextResponse.redirect(new URL('/auth',request.url))
    }
    //if user is logged in and trying to access auth page redirect to home

    return NextResponse.next()
}
export const config={
    matcher:['/profile/:path*','/post/create','/post/edit/:path*','/auth']
}