import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import { admins, speakers } from "@/lib/demoUsers"
import { addSpeaker, getDynamicSpeakers, emailExistsInDynamic } from "@/lib/dynamicUsers"

export async function POST(request) {
  try {
    const { email, password, name } = await request.json()

    // Basic validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Password strength validation
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      )
    }

    // Check if email already exists in static users
    const allStaticUsers = [...admins, ...speakers]
    const emailExistsInStatic = allStaticUsers.some(user => user.email === email)
    
    if (emailExistsInStatic || emailExistsInDynamic(email)) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      )
    }

    // Hash the password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Add new speaker to dynamic storage
    const newSpeaker = {
      email: email,
      passwordHash: hashedPassword,
      name: name
    }
    
    addSpeaker(newSpeaker)

    return NextResponse.json(
      { message: "Speaker registered successfully" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}