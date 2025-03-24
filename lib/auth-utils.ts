import { verify } from "jsonwebtoken"
import { headers } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"

export async function verifyAuth(request: Request): Promise<boolean> {
  try {
    // For API routes
    const authHeader = request.headers.get("Authorization")
    let token: string | null = null

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7)
    }

    // If no token in request headers, try from the headers() function (for Server Components)
    if (!token) {
      const headersList = headers()
      const authHeader = headersList.get("Authorization")
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7)
      }
    }

    if (!token) {
      return false
    }

    verify(token, JWT_SECRET)
    return true
  } catch (error) {
    console.error("Auth verification error:", error)
    return false
  }
}

