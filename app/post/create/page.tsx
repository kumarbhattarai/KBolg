import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import PostForm  from '@/components/Post/post-form'
export default function CreatePostPage() {
  return (
   <main className="py-10">
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Create Post Page</CardTitle>  
        </CardHeader>
        <CardContent>
          <PostForm/>
        </CardContent>
      </Card>
    </div>
   </main>
  )
}
