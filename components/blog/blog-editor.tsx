"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import { Info } from "lucide-react"

interface EditorProps {
  blogId?: string
  initialTitle?: string
  initialContent?: string
  isEditing?: boolean
}

export default function BlogEditor({
  blogId,
  initialTitle = "",
  initialContent = "",
  isEditing = false,
}: EditorProps): JSX.Element {
  const [title, setTitle] = useState<string>(initialTitle)
  const [content, setContent] = useState<string>(initialContent)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [showGuide, setShowGuide] = useState<boolean>(false)
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    // Redirect if not logged in
    if (!isLoggedIn) {
      router.push("/blog/login")
    }
  }, [isLoggedIn, router])

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const token = localStorage.getItem("auth_token")
      const url = isEditing ? `/api/blogs/${blogId}` : "/api/blogs"
      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to save blog post")
      }

      // Redirect to the blog list or the newly created/edited blog
      if (isEditing) {
        router.push(`/blog/${blogId}`)
      } else {
        const data = await response.json()
        router.push(`/blog/${data.id}`)
      }
    } catch (err) {
      console.error("Error saving blog:", err)
      setError(err instanceof Error ? err.message : "Failed to save blog post")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-300 p-4 mb-6 rounded-md font-jetbrains">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="title" className="block font-jetbrains text-sm mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 font-jetbrains text-white"
          placeholder="Enter blog title"
        />
      </div>

      <div className="mb-2">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="content" className="block font-jetbrains text-sm">
            Content (Markdown supported)
          </label>
          <button
            type="button"
            onClick={() => setShowGuide(!showGuide)}
            className="text-gray-400 hover:text-white text-sm flex items-center"
          >
            <Info size={16} className="mr-1" />
            {showGuide ? "Hide Markdown Guide" : "Show Markdown Guide"}
          </button>
        </div>

        {showGuide && (
          <div className="bg-gray-800 p-4 rounded-xl mb-4 font-jetbrains text-sm">
            <h3 className="font-bold mb-2">Markdown Guide</h3>
            <ul className="space-y-2">
              <li>
                <code className="bg-gray-900 px-1 py-0.5 rounded-sm"># Heading 1</code> - For main headings
              </li>
              <li>
                <code className="bg-gray-900 px-1 py-0.5 rounded-sm">## Heading 2</code> - For subheadings
              </li>
              <li>
                <code className="bg-gray-900 px-1 py-0.5 rounded-sm">**bold**</code> - For <strong>bold text</strong>
              </li>
              <li>
                <code className="bg-gray-900 px-1 py-0.5 rounded-sm">*italic*</code> - For <em>italic text</em>
              </li>
              <li>
                <code className="bg-gray-900 px-1 py-0.5 rounded-sm">[link text](url)</code> - For hyperlinks
              </li>
              <li>
                <code className="bg-gray-900 px-1 py-0.5 rounded-sm">![alt text](image-url)</code> - For images
              </li>
              <li>
                <code className="bg-gray-900 px-1 py-0.5 rounded-sm">- Item</code> - For bullet lists
              </li>
              <li>
                <code className="bg-gray-900 px-1 py-0.5 rounded-sm">1. Item</code> - For numbered lists
              </li>
              <li>
                <code className="bg-gray-900 px-1 py-0.5 rounded-sm">```language code block ```</code> - For code blocks
              </li>
              <li>
                <code className="bg-gray-900 px-1 py-0.5 rounded-sm">{'>'} [!NOTE] {'>'} This is a note</code> - For note box
              </li>
              <li>
                <code className="bg-gray-900 px-1 py-0.5 rounded-sm">{'>'}  [!WARNING] {'>'} This is a warning</code> - For
                warning box
              </li>
              <li>
                <code className="bg-gray-900 px-1 py-0.5 rounded-sm">{'>'} [!TIP] {'>'} This is a tip</code> - For tip box
              </li>
              <li>
                <code className="bg-gray-900 px-1 py-0.5 rounded-sm">{'>'} [!IMPORTANT] {'>'} This is important</code> - For
                important box
              </li>
              <li>
                <code className="bg-gray-900 px-1 py-0.5 rounded-sm">{'>'} [!CAUTION] {'>'} Use caution</code> - For caution box
              </li>
            </ul>
          </div>
        )}

        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 font-jetbrains text-white min-h-[400px]"
          placeholder="Write your blog content using Markdown..."
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-white text-black px-6 py-2 rounded-xl font-jetbrains hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : isEditing ? "Update Post" : "Publish Post"}
        </button>
        <Link
          href="/blog"
          className="border border-gray-700 px-6 py-2 rounded-xl font-jetbrains text-gray-300 hover:bg-gray-900 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}

