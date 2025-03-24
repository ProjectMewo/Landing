import type { Metadata } from "next"
import { notFound } from "next/navigation"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import BlogEditor from "@/components/blog/blog-editor"
import SiteLayout from "@/components/shared/site-layout"
import { serializeDocument } from "@/lib/mongodb-utils"

interface EditBlogPageProps {
  params: {
    id: string
  }
}

interface BlogDocument {
  _id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export const metadata: Metadata = {
  title: "Edit Blog | Project Mewo",
  description: "Edit an existing blog post",
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  try {
    if (!ObjectId.isValid(params.id)) {
      notFound()
    }

    const client = await clientPromise
    const db = client.db("project-mewo")
    const blogDoc = await db.collection("blogs").findOne({ _id: new ObjectId(params.id) })

    if (!blogDoc) {
      notFound()
    }

    // Serialize the MongoDB document to a plain object
    const blog = serializeDocument<BlogDocument>(blogDoc)

    return (
      <SiteLayout>
        <div className="flex-grow py-8">
          <div className="container mx-auto px-4">
            <h1 className="font-inter text-4xl font-bold mb-8">Edit Blog Post</h1>
            <BlogEditor blogId={params.id} initialTitle={blog.title} initialContent={blog.content} isEditing={true} />
          </div>
        </div>
      </SiteLayout>
    )
  } catch (error) {
    console.error("Error fetching blog for editing:", error)
    notFound()
  }
}

