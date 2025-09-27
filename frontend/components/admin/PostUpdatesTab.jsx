"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { addPost, getAllPosts, deletePost } from "@/lib/form-data-post-updates"
import { Trash2 } from "lucide-react"

// Form validation schema
const postSchema = z.object({
  content: z.string().min(1, "Post content is required")
})

export default function PostUpdatesTab() {
  const [posts, setPosts] = useState([])
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(postSchema)
  })

  useEffect(() => {
    // Load posts on component mount
    setPosts(getAllPosts())
  }, [])

  const onSubmit = (data) => {
    try {
      const newPost = addPost(data.content)
      setPosts(getAllPosts()) // Refresh posts
      reset() // Clear form
      
      toast({
        title: "Success",
        description: "Post created successfully!"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleDeletePost = (postId) => {
    try {
      deletePost(postId)
      setPosts(getAllPosts()) // Refresh posts
      
      toast({
        title: "Success",
        description: "Post deleted successfully!"
      })
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to delete post. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Post Updates</CardTitle>
          <CardDescription>
            Manage broadcast posts and announcements for your event.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="create-post" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create-post">Create New Post</TabsTrigger>
              <TabsTrigger value="all-posts">Show All Posts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create-post" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Post</CardTitle>
                  <CardDescription>
                    Write a new broadcast post for your event attendees.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="content">Post Content *</Label>
                      <Textarea
                        id="content"
                        placeholder="Enter your post content here..."
                        rows={6}
                        {...register("content")}
                      />
                      {errors.content && (
                        <p className="text-sm text-red-500">{errors.content.message}</p>
                      )}
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Publish Post
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="all-posts" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">All Posts ({posts.length})</h3>
                </div>
                
                {posts.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center text-muted-foreground">
                        No posts created yet. Create your first post to get started!
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <Card key={post.id}>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardDescription className="text-xs text-muted-foreground">
                                Posted on {post.timestamp}
                              </CardDescription>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeletePost(post.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {post.content}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}