import type { Metadata } from "next"
import { notFound } from "next/navigation"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import BlogContent from "@/components/blog/blog-content"
import WriteButton from "@/components/blog/write-button"
import SiteLayout from "@/components/shared/site-layout"
import { serializeDocument } from "@/lib/mongodb-utils"

interface BlogPageProps {
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

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  try {
    if (!ObjectId.isValid(params.id)) {
      return {
        title: "Blog Not Found | Project Mewo",
      }
    }

    const client = await clientPromise
    const db = client.db("project-mewo")
    const blog = await db.collection("blogs").findOne({ _id: new ObjectId(params.id) })

    if (!blog) {
      return {
        title: "Blog Not Found | Project Mewo",
      }
    }

    return {
      title: `${blog.title} | Project Mewo Blog`,
      description: blog.content.substring(0, 160),
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Blog | Project Mewo",
    }
  }
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
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
            <BlogContent blog={blog} />
            <WriteButton />
          </div>
        </div>
      </SiteLayout>
    )
  } catch (error) {
    console.error("Error fetching blog:", error)
    notFound()
  }
}

