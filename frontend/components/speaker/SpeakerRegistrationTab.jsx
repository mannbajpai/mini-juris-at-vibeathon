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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { registeredSpeakers } from "@/lib/registered-speakers"

const registrationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  tshirtSize: z.string().min(1, "T-shirt size is required"),
  speaker2Name: z.string().optional(),
  speaker2Email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  speaker2TshirtSize: z.string().optional(),
  foodChoice: z.string().min(1, "Food choice is required"),
  bloodGroup: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactNumber: z.string().optional(),
  linkedinUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  sapCommunityUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
})

const tshirtSizes = ["XS", "S", "M", "L", "XL", "XXL"]
const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]

export default function SpeakerRegistrationTab({ onRegistrationUpdate }) {
  const [isRegistered, setIsRegistered] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      tshirtSize: "",
      speaker2Name: "",
      speaker2Email: "",
      speaker2TshirtSize: "",
      foodChoice: "",
      bloodGroup: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
      linkedinUrl: "",
      sapCommunityUrl: "",
    },
  })

  // Check if user is already registered on component mount
  useEffect(() => {
    // For now, we'll check if there's any registration (in a real app, you'd check by user ID)
    // This is a simplified check - you might want to store the current user's email in session
    const mockUserEmail = "speaker@example.com" // This would come from session in real app
    const existingRegistration = registeredSpeakers.find(speaker => speaker.email === mockUserEmail)
    
    if (existingRegistration) {
      setIsRegistered(true)
      // Pre-fill form with existing data
      Object.keys(existingRegistration).forEach(key => {
        if (form.getValues(key) !== undefined) {
          form.setValue(key, existingRegistration[key])
        }
      })
    }
  }, [form])

  const onSubmit = async (data) => {
    try {
      // Check if email already exists
      const emailExists = registeredSpeakers.some(speaker => speaker.email === data.email)
      
      if (emailExists && !isEditing) {
        toast({
          title: "Registration Failed",
          description: "A speaker with this email is already registered.",
          variant: "destructive",
        })
        return
      }

      // Create speaker object
      const speakerData = {
        ...data,
        registrationDate: new Date().toISOString(),
      }

      if (isEditing) {
        // Update existing registration
        const index = registeredSpeakers.findIndex(speaker => speaker.email === data.email)
        if (index !== -1) {
          registeredSpeakers[index] = speakerData
        }
      } else {
        // Add new registration
        registeredSpeakers.push(speakerData)
      }

      setIsRegistered(true)
      setIsEditing(false)

      toast({
        title: "Registration Successful",
        description: isEditing ? "Registration updated successfully!" : "You have been registered successfully!",
      })

      // Notify parent component about registration update
      if (onRegistrationUpdate) {
        onRegistrationUpdate()
      }

    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isRegistered && !isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Registration Complete</CardTitle>
          <CardDescription>
            Your registration has been completed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setIsEditing(true)}>
            Update Registration Details
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Update Registration" : "Speaker Registration"}</CardTitle>
        <CardDescription>
          {isEditing ? "Update your registration details below." : "Please fill in your details to register as a speaker."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Primary Speaker Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Primary Speaker Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  {...form.register("fullName")}
                  placeholder="Enter your full name"
                />
                {form.formState.errors.fullName && (
                  <p className="text-sm text-red-600">{form.formState.errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="Enter your email"
                  disabled={isEditing}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobileNumber">Mobile Number *</Label>
                <Input
                  id="mobileNumber"
                  {...form.register("mobileNumber")}
                  placeholder="Enter your mobile number"
                />
                {form.formState.errors.mobileNumber && (
                  <p className="text-sm text-red-600">{form.formState.errors.mobileNumber.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tshirtSize">T-shirt Size *</Label>
                <Select onValueChange={(value) => form.setValue("tshirtSize", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select t-shirt size" />
                  </SelectTrigger>
                  <SelectContent>
                    {tshirtSizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.tshirtSize && (
                  <p className="text-sm text-red-600">{form.formState.errors.tshirtSize.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Co-Speaker Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Co-Speaker Information (Optional)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="speaker2Name">Speaker 2 Name</Label>
                <Input
                  id="speaker2Name"
                  {...form.register("speaker2Name")}
                  placeholder="Enter co-speaker name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="speaker2Email">Speaker 2 Email</Label>
                <Input
                  id="speaker2Email"
                  type="email"
                  {...form.register("speaker2Email")}
                  placeholder="Enter co-speaker email"
                />
                {form.formState.errors.speaker2Email && (
                  <p className="text-sm text-red-600">{form.formState.errors.speaker2Email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="speaker2TshirtSize">Speaker 2 T-shirt Size</Label>
                <Select onValueChange={(value) => form.setValue("speaker2TshirtSize", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select t-shirt size" />
                  </SelectTrigger>
                  <SelectContent>
                    {tshirtSizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Food Choice *</Label>
                <RadioGroup
                  onValueChange={(value) => form.setValue("foodChoice", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="veg" id="veg" />
                    <Label htmlFor="veg">Vegetarian</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non-veg" id="non-veg" />
                    <Label htmlFor="non-veg">Non-Vegetarian</Label>
                  </div>
                </RadioGroup>
                {form.formState.errors.foodChoice && (
                  <p className="text-sm text-red-600">{form.formState.errors.foodChoice.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select onValueChange={(value) => form.setValue("bloodGroup", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                  <Input
                    id="emergencyContactName"
                    {...form.register("emergencyContactName")}
                    placeholder="Enter emergency contact name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContactNumber">Emergency Contact Number</Label>
                  <Input
                    id="emergencyContactNumber"
                    {...form.register("emergencyContactNumber")}
                    placeholder="Enter emergency contact number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
                  <Input
                    id="linkedinUrl"
                    {...form.register("linkedinUrl")}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                  {form.formState.errors.linkedinUrl && (
                    <p className="text-sm text-red-600">{form.formState.errors.linkedinUrl.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sapCommunityUrl">SAP Community URL</Label>
                  <Input
                    id="sapCommunityUrl"
                    {...form.register("sapCommunityUrl")}
                    placeholder="https://community.sap.com/..."
                  />
                  {form.formState.errors.sapCommunityUrl && (
                    <p className="text-sm text-red-600">{form.formState.errors.sapCommunityUrl.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Submitting..." : (isEditing ? "Update Registration" : "Register")}
            </Button>
            {isEditing && (
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}