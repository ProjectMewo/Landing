import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import { serializeDocument } from "@/lib/mongodb-utils"

export interface DesignWork {
  _id: string
  title: string
  description: string
  year: string
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export async function getDesignWorks(): Promise<DesignWork[]> {
  const client = await clientPromise
  const db = client.db("project-mewo")

  const designsDoc = await db.collection("designs").find({}).sort({ createdAt: -1 }).toArray()

  // Serialize the MongoDB documents to plain objects
  return designsDoc.map((doc) => serializeDocument<DesignWork>(doc))
}

export async function getDesignWork(id: string): Promise<DesignWork | null> {
  if (!ObjectId.isValid(id)) {
    return null
  }

  const client = await clientPromise
  const db = client.db("project-mewo")

  const designDoc = await db.collection("designs").findOne({ _id: new ObjectId(id) })

  if (!designDoc) {
    return null
  }

  // Serialize the MongoDB document to a plain object
  return serializeDocument<DesignWork>(designDoc)
}

