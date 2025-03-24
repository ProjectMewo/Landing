import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { verifyAuth } from "@/lib/auth-utils"
import { serializeDocument } from "@/lib/mongodb-utils"

// GET all designs
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("project-mewo")

    const designsDoc = await db.collection("designs").find({}).sort({ createdAt: -1 }).toArray()

    // Serialize the MongoDB documents to plain objects
    const designs = designsDoc.map((doc) => serializeDocument(doc))

    return NextResponse.json(designs)
  } catch (error) {
    console.error("Error fetching designs:", error)
    return NextResponse.json({ error: "Failed to fetch designs" }, { status: 500 })
  }
}

// POST a new design (protected)
export async function POST(request: Request) {
  try {
    // Verify authentication
    const isAuthenticated = await verifyAuth(request)
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, description, year, imageUrl } = await request.json()

    if (!title || !description || !year || !imageUrl) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("project-mewo")

    const result = await db.collection("designs").insertOne({
      title,
      description,
      year,
      imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json({
      id: result.insertedId.toString(),
      success: true,
    })
  } catch (error) {
    console.error("Error creating design:", error)
    return NextResponse.json({ error: "Failed to create design" }, { status: 500 })
  }
}

