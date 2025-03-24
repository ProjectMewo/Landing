"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"

interface DesignEditorProps {
  designId?: string
  initialTitle?: string
  initialDescription?: string
  initialYear?: string
  initialImageUrl?: string
  isEditing?: boolean
}

export default function DesignEditor({
  designId,
  initialTitle = "",
  initialDescription = "",
  initialYear = new Date().getFullYear().toString(),
  initialImageUrl = "",
  isEditing = false,
}: DesignEditorProps) {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [year, setYear] = useState(initialYear)
  const [imageUrl, setImageUrl] = useState(initialImageUrl)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    // Store the current URL before redirecting to login
    if (!isLoggedIn) {
      // Save the current path to redirect back after login
      localStorage.setItem("redirectAfterLogin", window.location.pathname)
      router.push("/blog/login")
    }
  }, [isLoggedIn, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !description.trim() || !year.trim() || !imageUrl.trim()) {
      setError("All fields are required")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const token = localStorage.getItem("auth_token")
      const url = isEditing ? `/api/designs/${designId}` : "/api/designs"
      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, year, imageUrl }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to save design work")
      }

      // Redirect back to projects page
      router.push("/projects")
    } catch (err) {
      console.error("Error saving design work:", err)
      setError(err instanceof Error ? err.message : "Failed to save design work")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isLoggedIn) {
    return null // Will redirect in useEffect
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-300 p-4 mb-6 rounded-xl font-jetbrains">
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
          placeholder="Enter design title"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="block font-jetbrains text-sm mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 font-jetbrains text-white min-h-[100px]"
          placeholder="Enter design description"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="year" className="block font-jetbrains text-sm mb-2">
          Year
        </label>
        <input
          type="text"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 font-jetbrains text-white"
          placeholder="Enter year (e.g., 2023)"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="imageUrl" className="block font-jetbrains text-sm mb-2">
          Image URL
        </label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 font-jetbrains text-white"
          placeholder="Enter image URL"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-white text-black px-6 py-2 rounded-xl font-jetbrains hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : isEditing ? "Update Design" : "Add Design"}
        </button>
        <Link
          href="/projects"
          className="border border-gray-700 px-6 py-2 rounded-xl font-jetbrains text-gray-300 hover:bg-gray-900 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}

