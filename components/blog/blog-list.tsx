"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { useAuth } from "@/lib/auth-context"
import { LogIn } from "lucide-react"

interface Blog {
  _id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export default function BlogList(): JSX.Element {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    async function fetchBlogs(): Promise<void> {
      try {
        const response = await fetch("/api/blogs")
        if (!response.ok) {
          throw new Error("Failed to fetch blogs")
        }
        const data = await response.json()
        setBlogs(data)
      } catch (err) {
        setError("Failed to load blogs. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-inter text-4xl font-bold">Blog</h1>
        {!isLoggedIn && (
          <Link
            href="/blog/login"
            className="flex items-center gap-2 font-jetbrains text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors"
          >
            <LogIn size={16} />
            <span>Login</span>
          </Link>
        )}
      </div>

      {loading ? (
        <div className="font-jetbrains text-gray-400">Loading blogs...</div>
      ) : error ? (
        <div className="font-jetbrains text-red-500">{error}</div>
      ) : blogs.length === 0 ? (
        <div className="font-jetbrains text-gray-400">No blog posts yet.</div>
      ) : (
        <div className="space-y-8">
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="border border-gray-800 rounded-xl p-6 hover:bg-gray-900 transition-colors"
            >
              <Link href={`/blog/${blog._id}`}>
                <h2 className="font-inter text-2xl font-bold mb-2">{blog.title}</h2>
                <div className="font-jetbrains text-sm text-gray-400 mb-4">
                  {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
                </div>
                <p className="font-jetbrains text-gray-300">
                  {blog.content.substring(0, 200)}
                  {blog.content.length > 200 ? "..." : ""}
                </p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

