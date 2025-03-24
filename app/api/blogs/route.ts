import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { verifyAuth } from "@/lib/auth-utils"
import { serializeDocument } from "@/lib/mongodb-utils"

// GET all blogs
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("project-mewo")

    const blogsDoc = await db.collection("blogs").find({}).sort({ createdAt: -1 }).toArray()

    // Serialize the MongoDB documents to plain objects
    const blogs = blogsDoc.map((doc) => serializeDocument(doc))

    return NextResponse.json(blogs)
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

// POST a new blog (protected)
export async function POST(request: Request) {
  try {
    // Verify authentication
    const isAuthenticated = await verifyAuth(request)
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("project-mewo")

    const result = await db.collection("blogs").insertOne({
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json({
      id: result.insertedId.toString(),
      success: true,
    })
  } catch (error) {
    console.error("Error creating blog:", error)
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}

