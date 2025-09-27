"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SpeakerRegistrationTab from "@/components/speaker/SpeakerRegistrationTab"
import ProposalSubmissionTab from "@/components/speaker/ProposalSubmissionTab"
import SpeakerUpdatesTab from "@/components/speaker/SpeakerUpdatesTab"
import { Toaster } from "@/components/ui/toaster"
import { findSpeakerByEmail } from "@/lib/registered-speakers"

export default function SpeakerDashboard() {
  const [isRegistered, setIsRegistered] = useState(false)
  const [speakerName, setSpeakerName] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  // Get current user email (same logic as components)
  const getCurrentUserEmail = () => {
    return (typeof window !== 'undefined' && localStorage.getItem('currentUserEmail')) || 'speaker@example.com'
  }

  // Check registration status
  const checkRegistrationStatus = () => {
    const currentUserEmail = getCurrentUserEmail()
    const speaker = findSpeakerByEmail(currentUserEmail)
    
    if (speaker) {
      setIsRegistered(true)
      setSpeakerName(speaker.fullName)
    } else {
      setIsRegistered(false)
      setSpeakerName("")
    }
  }

  useEffect(() => {
    checkRegistrationStatus()
  }, [refreshKey])

  const handleRegistrationUpdate = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="p-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Speaker Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome{speakerName ? `, ${speakerName}` : ""}
        </p>
      </div>

      <Tabs defaultValue="registration" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger 
            value="submit-proposal" 
            disabled={!isRegistered}
            className={!isRegistered ? "opacity-50 cursor-not-allowed" : ""}
          >
            Submit Proposal
            {!isRegistered && <span className="ml-2 text-xs">(Complete registration first)</span>}
          </TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="registration" className="mt-6">
          <SpeakerRegistrationTab onRegistrationUpdate={handleRegistrationUpdate} />
        </TabsContent>
        
        <TabsContent value="submit-proposal" className="mt-6">
          <ProposalSubmissionTab />
        </TabsContent>
        
        <TabsContent value="updates" className="mt-6">
          <SpeakerUpdatesTab />
        </TabsContent>
      </Tabs>
      
      <Toaster />
    </div>
  )
}
