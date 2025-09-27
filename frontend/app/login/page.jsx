"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const params = useSearchParams()
  const router = useRouter()
  const role = params.get("role") || "guest"
  const error = params.get("error")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState("")
  const [isSignupMode, setIsSignupMode] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setAuthError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setAuthError("Invalid credentials. Please check your email and password.")
      } else if (result?.ok) {
        // Get the session to check user role
        const session = await getSession()
        
        if (session?.user?.role === "admin" && role === "admin") {
          router.push("/dashboard/admin")
        } else if (session?.user?.role === "speaker" && role === "speaker") {
          router.push("/dashboard/speaker")
        } else if (session?.user?.role !== role) {
          setAuthError(`You don't have ${role} privileges. Please login with the correct role.`)
        } else {
          // Fallback redirect
          const callbackUrl = role === "admin" ? "/dashboard/admin" : "/dashboard/speaker"
          router.push(callbackUrl)
        }
      }
    } catch (error) {
      setAuthError("An error occurred during login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setAuthError("")

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await response.json()

      if (response.ok) {
        // Signup successful, now sign in automatically
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        })

        if (result?.ok) {
          router.push("/dashboard/speaker")
        } else {
          setAuthError("Registration successful but login failed. Please try logging in manually.")
        }
      } else {
        setAuthError(data.error || "Registration failed. Please try again.")
      }
    } catch (error) {
      setAuthError("An error occurred during registration. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setEmail("")
    setPassword("")
    setName("")
    setAuthError("")
  }

  const toggleMode = () => {
    setIsSignupMode(!isSignupMode)
    resetForm()
  }



  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <Card className="w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {role === "admin" 
              ? "Admin Login" 
              : isSignupMode 
                ? "Speaker Signup" 
                : "Speaker Login"
            }
          </CardTitle>
          <CardDescription className="text-center">
            {role === "admin" 
              ? "Enter your credentials to access the admin dashboard"
              : isSignupMode
                ? "Create a new speaker account"
                : "Enter your credentials to access the speaker dashboard"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={isSignupMode ? handleSignup : handleLogin} className="space-y-4">
            {(error || authError) && (
              <Alert variant="destructive">
                <AlertDescription>
                  {authError || "Authentication failed. Please try again."}
                </AlertDescription>
              </Alert>
            )}
            
            {isSignupMode && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder={isSignupMode ? "Create a password (min 6 characters)" : "Enter your password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !email || !password || (isSignupMode && !name)}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isSignupMode ? "Creating Account..." : "Signing In..."}
                </>
              ) : (
                isSignupMode ? "Create Account" : "Sign In"
              )}
            </Button>
          </form>

          {/* Only show signup/login toggle for speakers */}
          {role === "speaker" && (
            <div className="mt-4 text-center">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={toggleMode}
                disabled={isLoading}
                className="text-sm"
              >
                {isSignupMode 
                  ? "Already have an account? Sign In" 
                  : "New speaker? Create Account"
                }
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
