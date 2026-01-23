import {defineRelations} from 'drizzle-orm'
import * as schema from './schema'

export const postsRelations = defineRelations({users: schema.users, posts: schema.posts},(r)=>({
    posts:{
        author:r.one.users({
            from:r.posts.authorId,
            to:r.users.id,
        })
    }
}))
export const accountRelations= defineRelations(schema,(r)=>({
accounts:{
    user:r.one.users({
        from:r.accounts.userId,
        to:r.users.id,
    })
}
}))
export const sessionsRelations=defineRelations(schema,(r)=>({
    sessions:{
        user:r.one.users({
            from:r.sessions.userId,
            to:r.users.id,
        })
    }
}))
