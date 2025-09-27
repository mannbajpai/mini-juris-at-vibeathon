"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { 
  getAgendaData, 
  addAgendaData, 
  updateAgendaData, 
  hasAgendaData 
} from "@/lib/form-data-agenda-builder"

// Form validation schema
const agendaSchema = z.object({
  eventTheme: z.string().min(1, "Event theme is required"),
  organization: z.string().min(1, "Organization is required"),
  eventDetails: z.string().optional(),
  domains: z.array(z.string()).optional(),
  expectedFootfall: z.number().optional()
})

const domainOptions = [
  "Computer Science",
  "Renewable Energy", 
  "Education",
  "Health Tech",
  "FinTech",
  "AI/ML",
  "Robotics"
]

export default function AgendaBuilderTab() {
  const [showForm, setShowForm] = useState(true)
  const [existingData, setExistingData] = useState(null)
  const [selectedDomains, setSelectedDomains] = useState([])
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues
  } = useForm({
    resolver: zodResolver(agendaSchema)
  })

  useEffect(() => {
    // Check if agenda data exists on component mount
    if (hasAgendaData()) {
      const data = getAgendaData()
      if (data && data.length > 0) {
        setExistingData(data[0])
        setShowForm(false)
        setSelectedDomains(data[0].domains || [])
      }
    }
  }, [])

  const onSubmit = (data) => {
    try {
      const formData = {
        ...data,
        domains: selectedDomains,
        createdAt: new Date().toISOString()
      }

      if (existingData) {
        updateAgendaData(formData)
        toast({
          title: "Success",
          description: "Event details updated successfully!"
        })
      } else {
        addAgendaData(formData)
        toast({
          title: "Success", 
          description: "Event details saved successfully!"
        })
      }

      setExistingData(formData)
      setShowForm(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save event details. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleUpdateDetails = () => {
    if (existingData) {
      // Pre-fill form with existing data
      reset({
        eventTheme: existingData.eventTheme,
        organization: existingData.organization,
        eventDetails: existingData.eventDetails || "",
        expectedFootfall: existingData.expectedFootfall
      })
      setSelectedDomains(existingData.domains || [])
    }
    setShowForm(true)
  }

  const handleDomainChange = (domain, checked) => {
    if (checked) {
      setSelectedDomains(prev => [...prev, domain])
    } else {
      setSelectedDomains(prev => prev.filter(d => d !== domain))
    }
  }

  if (!showForm && existingData) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Event Details Filled Successfully</CardTitle>
            <CardDescription>
              Your event details have been saved. You can update them if needed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Event Theme:</h3>
              <p>{existingData.eventTheme}</p>
            </div>
            <div>
              <h3 className="font-semibold">Organization:</h3>
              <p>{existingData.organization}</p>
            </div>
            {existingData.eventDetails && (
              <div>
                <h3 className="font-semibold">Event Details:</h3>
                <p>{existingData.eventDetails}</p>
              </div>
            )}
            {existingData.domains && existingData.domains.length > 0 && (
              <div>
                <h3 className="font-semibold">Domains:</h3>
                <p>{existingData.domains.join(", ")}</p>
              </div>
            )}
            {existingData.expectedFootfall && (
              <div>
                <h3 className="font-semibold">Expected Footfall:</h3>
                <p>{existingData.expectedFootfall}</p>
              </div>
            )}
            <Button onClick={handleUpdateDetails} className="mt-4">
              Update Details
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Event Agenda Builder</CardTitle>
          <CardDescription>
            Configure your event details and agenda settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="eventTheme">Event Theme *</Label>
              <Input
                id="eventTheme"
                placeholder="Enter event theme or collection of ideas"
                {...register("eventTheme")}
              />
              {errors.eventTheme && (
                <p className="text-sm text-red-500">{errors.eventTheme.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">Organization *</Label>
              <Input
                id="organization"
                placeholder="Enter conducting organization"
                {...register("organization")}
              />
              {errors.organization && (
                <p className="text-sm text-red-500">{errors.organization.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventDetails">Event Details</Label>
              <Textarea
                id="eventDetails"
                placeholder="Enter specific details about the event"
                {...register("eventDetails")}
              />
            </div>

            <div className="space-y-2">
              <Label>Domains (Optional)</Label>
              <div className="grid grid-cols-2 gap-3">
                {domainOptions.map((domain) => (
                  <div key={domain} className="flex items-center space-x-2">
                    <Checkbox
                      id={domain}
                      checked={selectedDomains.includes(domain)}
                      onCheckedChange={(checked) => handleDomainChange(domain, checked)}
                    />
                    <Label htmlFor={domain} className="text-sm font-normal">
                      {domain}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedFootfall">Expected Footfall</Label>
              <Input
                id="expectedFootfall"
                type="number"
                placeholder="Expected number of participants and speakers"
                {...register("expectedFootfall", { valueAsNumber: true })}
              />
            </div>

            <Button type="submit" className="w-full">
              {existingData ? "Update Event Details" : "Save Event Details"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}