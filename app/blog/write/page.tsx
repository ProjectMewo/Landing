import type { Metadata } from "next"
import BlogEditor from "@/components/blog/blog-editor"
import SiteLayout from "@/components/shared/site-layout"

export const metadata: Metadata = {
  title: "Write Blog | Project Mewo",
  description: "Create a new blog post",
}

export default function WriteBlogPage() {
  return (
    <SiteLayout>
      <div className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-inter text-4xl font-bold mb-8">Write New Blog Post</h1>
          <BlogEditor />
        </div>
      </div>
    </SiteLayout>
  )
}

