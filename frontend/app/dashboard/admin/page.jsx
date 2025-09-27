import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AgendaBuilderTab from "@/components/admin/AgendaBuilderTab"
import ReviewProposalTab from "@/components/admin/ReviewProposalTab"
import PostUpdatesTab from "@/components/admin/PostUpdatesTab"
import { Toaster } from "@/components/ui/toaster"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "admin") {
    redirect("/login?role=admin")
  }

  return (
    <div className="p-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome, {session.user?.name}</p>
      </div>

      <Tabs defaultValue="agenda-builder" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="agenda-builder">Agenda Builder</TabsTrigger>
          <TabsTrigger value="review-proposals">Review Proposals</TabsTrigger>
          <TabsTrigger value="post-updates">Post Updates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="agenda-builder" className="mt-6">
          <AgendaBuilderTab />
        </TabsContent>
        
        <TabsContent value="review-proposals" className="mt-6">
          <ReviewProposalTab />
        </TabsContent>
        
        <TabsContent value="post-updates" className="mt-6">
          <PostUpdatesTab />
        </TabsContent>
      </Tabs>
      
      <Toaster />
    </div>
  )
}
