import {defineRelations} from 'drizzle-orm'
import * as schema from './schema'

export const relations = defineRelations(schema,(r)=>({
    posts:{
        author:r.one.users({
            from:r.posts.authorId,
            to:r.users.id,
        })
    },
    accounts:{
        user:r.one.users({
            from:r.accounts.userId,
            to:r.users.id,
        })
    },
    sessions:{
        user:r.one.users({
            from:r.sessions.userId,
            to:r.users.id,
        })
    }
}))
