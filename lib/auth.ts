import { betterAuth } from "better-auth";
import {drizzleAdapter} from "better-auth/adapters/drizzle"
import { db } from "./db/index";
import * as schema from "./db/schema";
import * as relations from "./db/relations";
export const auth = betterAuth({
    appName: "Kblog",
      secret:process.env.BETTER_AUTH_SECRET||"anysecretkey",
  baseURL:process.env.BASE_URL||"http://localhost:3000",
  database:drizzleAdapter(db,{
    provider:'pg',
    schema:{
      relations:relations,
      ...schema,
      user:schema.users,
      account:schema.accounts,
      session:schema.sessions,
      
    }
  }),
  emailAndPassword: { 
    enabled: true, 
    requireEmailVerification: false,
    minPasswordLength:6,
    maxPasswordLength:128,
    autoSignIn:false,
  }, 
  session:{
expiresIn:60*60*24*7,
updateAge:60*60*24,
cookieCache:{
    enabled:true,
    maxAge :60*5,
}
  },
  disableSessionRefresh:true,
  advanced:{
    useSecureCookies: process.env.NODE_ENV==="production",
    	defaultCookieAttributes: {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		},
  },

});