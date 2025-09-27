"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

// Mock proposal data
const mockProposals = [
  {
    id: 1,
    title: "The Future of Next.js",
    speakerName: "Sarah Connor",
    abstract: "Exploring the latest developments in Next.js framework, including App Router, Server Components, and performance optimizations. This session will dive deep into the architectural changes that make Next.js 14 a game-changer for modern web development. We'll cover real-world examples, migration strategies, and best practices for building scalable applications.",
    category: "Frontend Development",
    track: "Technical",
    coSpeaker: null
  },
  {
    id: 2, 
    title: "AI Ethics in Modern Development",
    speakerName: "Dr. Marcus Webb",
    abstract: "As artificial intelligence becomes increasingly integrated into our daily development workflows, understanding the ethical implications becomes crucial. This presentation examines the responsible use of AI tools, bias detection, privacy concerns, and the importance of maintaining human oversight in automated decision-making processes.",
    category: "AI/Ethics",
    track: "Keynote",
    coSpeaker: "Prof. Elena Rodriguez"
  },
  {
    id: 3,
    title: "Sustainable Web Architecture",
    speakerName: "Kim Chen",
    abstract: "Building environmentally conscious applications through efficient coding practices, optimized resource usage, and green hosting solutions. Learn how to measure and reduce your application's carbon footprint while maintaining excellent user experience and performance standards.",
    category: "Sustainability",
    track: "Technical",
    coSpeaker: null
  }
]

export default function ReviewProposalTab() {
  const [proposals, setProposals] = useState(mockProposals)
  const [selectedProposal, setSelectedProposal] = useState(null)
  const { toast } = useToast()

  const handleAccept = (proposalId) => {
    setProposals(prev => prev.map(proposal => 
      proposal.id === proposalId 
        ? { ...proposal, status: 'accepted' }
        : proposal
    ))
    
    toast({
      title: "Proposal Accepted",
      description: "The proposal has been accepted successfully!"
    })
  }

  const handleReject = (proposalId) => {
    setProposals(prev => prev.map(proposal => 
      proposal.id === proposalId 
        ? { ...proposal, status: 'rejected' }
        : proposal
    ))
    
    toast({
      title: "Proposal Rejected", 
      description: "The proposal has been rejected.",
      variant: "destructive"
    })
  }

  const getStatusBadge = (status) => {
    if (!status) return null
    
    const statusClasses = {
      accepted: "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs",
      rejected: "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs"
    }
    
    return (
      <span className={statusClasses[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review Proposals</CardTitle>
          <CardDescription>
            Review submitted proposals and make acceptance decisions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proposal Title</TableHead>
                <TableHead>Speaker Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proposals.map((proposal) => (
                <TableRow 
                  key={proposal.id}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button 
                          className="text-left font-medium hover:underline"
                          onClick={() => setSelectedProposal(proposal)}
                        >
                          {proposal.title}
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{proposal.title}</DialogTitle>
                          <DialogDescription>
                            Proposal Details
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold">Speaker:</h3>
                            <p>{proposal.speakerName}</p>
                          </div>
                          {proposal.coSpeaker && (
                            <div>
                              <h3 className="font-semibold">Co-Speaker:</h3>
                              <p>{proposal.coSpeaker}</p>
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold">Category:</h3>
                            <p>{proposal.category}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Track:</h3>
                            <p>{proposal.track}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Abstract:</h3>
                            <p className="text-sm leading-relaxed">{proposal.abstract}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>{proposal.speakerName}</TableCell>
                  <TableCell>{getStatusBadge(proposal.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="default"
                        onClick={() => handleAccept(proposal.id)}
                        disabled={proposal.status === 'accepted'}
                      >
                        Accept
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleReject(proposal.id)}
                        disabled={proposal.status === 'rejected'}
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}