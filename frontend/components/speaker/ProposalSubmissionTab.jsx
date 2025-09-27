"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { registeredSpeakers } from "@/lib/registered-speakers"
import { proposals } from "@/lib/proposals"
import { Trash2, Edit } from "lucide-react"

const proposalSchema = z.object({
  track: z.string().min(1, "Track is required"),
  sessionCategory: z.string().min(1, "Session category is required"),
  title: z.string().min(1, "Title is required").max(100, "Title must be 100 characters or less"),
  abstract: z.string().min(1, "Abstract is required"),
  coSpeakers: z.string().optional(),
})

const tracks = ["Development", "Business", "Infrastructure", "Data Science"]
const sessionCategories = ["Master Class", "Demo Pod", "Talk", "Workshop"]

export default function ProposalSubmissionTab() {
  const [isRegistered, setIsRegistered] = useState(false)
  const [speakerData, setSpeakerData] = useState(null)
  const [editingProposal, setEditingProposal] = useState(null)
  const [speakerProposals, setSpeakerProposals] = useState([])
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      track: "",
      sessionCategory: "",
      title: "",
      abstract: "",
      coSpeakers: "",
    },
  })

  // Check if user is registered on component mount
  useEffect(() => {
    // Mock user email - in real app this would come from session
    const mockUserEmail = "speaker@example.com"
    const speaker = registeredSpeakers.find(speaker => speaker.email === mockUserEmail)
    
    if (speaker) {
      setIsRegistered(true)
      setSpeakerData(speaker)
      
      // Load speaker's proposals
      const userProposals = proposals.filter(proposal => proposal.speakerEmail === mockUserEmail)
      setSpeakerProposals(userProposals)
    } else {
      setIsRegistered(false)
    }
  }, [])

  const onSubmit = async (data) => {
    try {
      const proposalData = {
        id: editingProposal ? editingProposal.id : Date.now().toString(),
        ...data,
        coSpeakers: data.coSpeakers ? data.coSpeakers.split(",").map(s => s.trim()).filter(s => s) : [],
        speakerEmail: speakerData.email,
        speakerName: speakerData.fullName,
        status: "Pending",
        submissionDate: new Date().toISOString(),
      }

      if (editingProposal) {
        // Update existing proposal
        const index = proposals.findIndex(p => p.id === editingProposal.id)
        if (index !== -1) {
          proposals[index] = proposalData
        }
        setEditingProposal(null)
        toast({
          title: "Proposal Updated",
          description: "Your proposal has been updated successfully!",
        })
      } else {
        // Add new proposal
        proposals.push(proposalData)
        toast({
          title: "Proposal Submitted",
          description: "Your proposal has been submitted successfully!",
        })
      }

      // Update local state
      const userProposals = proposals.filter(proposal => proposal.speakerEmail === speakerData.email)
      setSpeakerProposals(userProposals)

      // Reset form
      form.reset()

    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "An error occurred while submitting your proposal. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (proposal) => {
    setEditingProposal(proposal)
    form.setValue("track", proposal.track)
    form.setValue("sessionCategory", proposal.sessionCategory)
    form.setValue("title", proposal.title)
    form.setValue("abstract", proposal.abstract)
    form.setValue("coSpeakers", proposal.coSpeakers.join(", "))
  }

  const handleDelete = (proposalId) => {
    const index = proposals.findIndex(p => p.id === proposalId)
    if (index !== -1) {
      proposals.splice(index, 1)
      const userProposals = proposals.filter(proposal => proposal.speakerEmail === speakerData.email)
      setSpeakerProposals(userProposals)
      
      toast({
        title: "Proposal Deleted",
        description: "Your proposal has been deleted successfully!",
      })
    }
  }

  const cancelEdit = () => {
    setEditingProposal(null)
    form.reset()
  }

  if (!isRegistered) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Registration Required</CardTitle>
          <CardDescription>
            Please complete your registration first before submitting proposals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You need to register as a speaker before you can submit proposals.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="create-proposal" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create-proposal">
            {editingProposal ? "Edit Proposal" : "Create Proposal"}
          </TabsTrigger>
          <TabsTrigger value="submitted-proposals">Submitted Proposals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create-proposal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {editingProposal ? "Edit Proposal" : "Create New Proposal"}
              </CardTitle>
              <CardDescription>
                {editingProposal 
                  ? "Update your proposal details below." 
                  : "Fill in the details for your speaking proposal."
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="track">Track *</Label>
                    <Select onValueChange={(value) => form.setValue("track", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select track" />
                      </SelectTrigger>
                      <SelectContent>
                        {tracks.map((track) => (
                          <SelectItem key={track} value={track}>
                            {track}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.track && (
                      <p className="text-sm text-red-600">{form.formState.errors.track.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sessionCategory">Session Category *</Label>
                    <Select onValueChange={(value) => form.setValue("sessionCategory", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select session category" />
                      </SelectTrigger>
                      <SelectContent>
                        {sessionCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.sessionCategory && (
                      <p className="text-sm text-red-600">{form.formState.errors.sessionCategory.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title * (Max 100 characters)</Label>
                  <Input
                    id="title"
                    {...form.register("title")}
                    placeholder="Enter your session title"
                    maxLength={100}
                  />
                  <div className="flex justify-between">
                    {form.formState.errors.title && (
                      <p className="text-sm text-red-600">{form.formState.errors.title.message}</p>
                    )}
                    <p className="text-sm text-muted-foreground ml-auto">
                      {form.watch("title")?.length || 0}/100
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="abstract">Abstract *</Label>
                  <Textarea
                    id="abstract"
                    {...form.register("abstract")}
                    placeholder="Provide a detailed description of your proposal..."
                    rows={6}
                  />
                  {form.formState.errors.abstract && (
                    <p className="text-sm text-red-600">{form.formState.errors.abstract.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coSpeakers">Co-speakers (Optional)</Label>
                  <Input
                    id="coSpeakers"
                    {...form.register("coSpeakers")}
                    placeholder="Enter co-speaker names separated by commas"
                  />
                  <p className="text-sm text-muted-foreground">
                    Separate multiple co-speakers with commas
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting 
                      ? "Submitting..." 
                      : (editingProposal ? "Update Proposal" : "Submit Proposal")
                    }
                  </Button>
                  {editingProposal && (
                    <Button type="button" variant="outline" onClick={cancelEdit}>
                      Cancel Edit
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="submitted-proposals" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Submitted Proposals</CardTitle>
              <CardDescription>
                View and manage your submitted proposals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {speakerProposals.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  You haven't submitted any proposals yet.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Track</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {speakerProposals.map((proposal) => (
                      <TableRow key={proposal.id}>
                        <TableCell className="font-medium">{proposal.title}</TableCell>
                        <TableCell>{proposal.track}</TableCell>
                        <TableCell>{proposal.sessionCategory}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                            {proposal.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {new Date(proposal.submissionDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(proposal)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(proposal.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}