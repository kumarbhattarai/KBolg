import {createAuthClient} from "better-auth/react"

export const authclient= createAuthClient({
    baseURL:process.env.BASE_URL
})
export const {
    signUp,
     signIn,
      signOut,
       useSession
    } =authclient