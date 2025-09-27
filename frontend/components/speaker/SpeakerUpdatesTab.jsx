"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllPosts } from "@/lib/form-data-post-updates"

export default function SpeakerUpdatesTab() {
  const [updates, setUpdates] = useState([])

  useEffect(() => {
    // Load all posts from the updates file
    const posts = getAllPosts()
    setUpdates(posts)
  }, [])

  const formatTimestamp = (timestamp) => {
    // If timestamp is a string, return as is (already formatted)
    if (typeof timestamp === 'string') {
      return timestamp
    }
    
    // If timestamp is a number, convert to date
    if (typeof timestamp === 'number') {
      return new Date(timestamp).toLocaleString()
    }
    
    // Fallback
    return new Date(timestamp).toLocaleString()
  }

  if (updates.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Speaker Updates</CardTitle>
          <CardDescription>
            Latest updates and announcements from the event organizers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No updates available at the moment.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Check back later for announcements and important information.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Speaker Updates</h2>
        <p className="text-muted-foreground">
          Latest updates and announcements from the event organizers.
        </p>
      </div>

      <div className="space-y-4">
        {updates.map((update) => (
          <Card key={update.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Update</CardTitle>
                <span className="text-sm text-muted-foreground">
                  {formatTimestamp(update.timestamp)}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap">{update.content}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {updates.length > 0 && (
        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground">
            Showing all {updates.length} update{updates.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  )
}