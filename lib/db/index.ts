import {drizzle} from 'drizzle-orm/node-postgres'
import {Pool} from 'pg'
import { users, sessions, accounts, posts } from './schema'
import { relations } from './relations'

const pool =new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:process.env.NODE_ENV==='production'?{
rejectUnauthorized:false,
    }:false,
    max:10,
})

export const db = drizzle({ 
    client: pool, 
    schema: {
        users,
        sessions,
        accounts,
        posts
    },
    relations
})

export async function getClient(){
    const client=await pool.connect()
    return client
}