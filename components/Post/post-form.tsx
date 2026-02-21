"use client";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { createPost } from "@/app/actions/post-action";
import { toast } from "sonner";
import { useRouter } from "next/dist/client/components/navigation";

const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be at most 100 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least of 10 characters long")
    .max(100, "Description must not exceed 100 characters"),
  content: z
    .string()
    .min(10, "Description must be at least of 10 characters long"),
});
type PostFormValues = z.infer<typeof postSchema>;

export default function PostForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  async function onFormSubmit(data: PostFormValues) {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("content", data.content);

        const res = await createPost(formData);
        console.log("res:", res);
        if (res.success) {
          toast("Post created successfully!", {
            description: new Date().toLocaleString(),
          });
          router.refresh();
          router.push("/");
        } else {
          toast(res.message, {
            description: new Date().toLocaleString(),
          });
        }
      } catch (error) {
        toast("Post created successfully!", {
          description: new Date().toLocaleString(),
        });
      }
    });
  }

  return (
    <form action="" onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter your Title"
          {...register("title")}
          disabled={isPending}
        ></Input>
        {errors?.title && (
          <p className="text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter a short description"
          {...register("description")}
          disabled={isPending}
        ></Textarea>
        {errors?.description && (
          <p className="text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Enter your content"
          className="min-h-45 resize-none"
          {...register("content")}
          disabled={isPending}
        ></Textarea>
        {errors?.content && (
          <p className="text-red-600">{errors.content.message}</p>
        )}
      </div>
      <Button type="submit" className="mt-5 w-full" disabled={isPending}>
        {isPending ? "Saving Post" : "Create Post"}
      </Button>
    </form>
  );
}
