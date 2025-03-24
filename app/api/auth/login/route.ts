import { NextResponse } from "next/server"
import { sign } from "jsonwebtoken"

// This would normally be stored securely, not hardcoded
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin_password"
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    // Create a JWT token
    const token = sign({ role: "admin" }, JWT_SECRET, { expiresIn: "7d" })

    return NextResponse.json({ token })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

