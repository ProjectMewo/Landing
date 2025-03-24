import type { Metadata } from "next"
import BlogList from "@/components/blog/blog-list"
import WriteButton from "@/components/blog/write-button"
import SiteLayout from "@/components/shared/site-layout"

export const metadata: Metadata = {
  title: "Blog | Project Mewo",
  description: "Read the latest blog posts from Project Mewo",
}

export default function BlogPage() {
  return (
    <SiteLayout>
      <div className="flex-grow py-8">
        <BlogList />
        <WriteButton />
      </div>
    </SiteLayout>
  )
}

