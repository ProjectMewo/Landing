import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import { verifyAuth } from "@/lib/auth-utils"
import { serializeDocument } from "@/lib/mongodb-utils"

// GET a single blog by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("project-mewo")

    const blogDoc = await db.collection("blogs").findOne({ _id: new ObjectId(id) })

    if (!blogDoc) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    // Serialize the MongoDB document to a plain object
    const blog = serializeDocument(blogDoc)

    return NextResponse.json(blog)
  } catch (error) {
    console.error("Error fetching blog:", error)
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 })
  }
}

// PUT (update) a blog by ID (protected)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const isAuthenticated = await verifyAuth(request)
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 })
    }

    const { title, content } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("project-mewo")

    const result = await db.collection("blogs").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title,
          content,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating blog:", error)
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

// DELETE a blog by ID (protected)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const isAuthenticated = await verifyAuth(request)
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("project-mewo")

    const result = await db.collection("blogs").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting blog:", error)
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}

