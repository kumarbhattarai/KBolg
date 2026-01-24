import { headers } from "next/headers";
import { NextRequest,NextResponse } from "next/server";
    import { auth } from "./lib/auth";

//define protected routes : /profile,/post/create/,/edit/:id
const protectedRoutes=['/profile','/post/create','/post/edit'];
export async function middleware(request:NextRequest){
    const pathname=request.nextUrl.pathname
    const session = await auth.api.getSession({
        headers:await headers()
    })
    const isProtectedRoute=protectedRoutes.some(route=>pathname.startsWith(route))
    if(isProtectedRoute&&!session){
        return NextResponse.redirect(new URL('/auth',request.url))
    }
    //if user is logged in and trying to access auth page redirect to home
    if(pathname.startsWith('/auth')&&session){
        return NextResponse.redirect(new URL('/',request.url))
    }
    return NextResponse.next()
}
export const config={
    matcher:['/profile/:path*','/post/create/:path*','/post/edit/:path*','/auth/:path* ']
}