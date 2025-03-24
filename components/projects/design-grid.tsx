"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Pen, Edit, Trash2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import DesignModal from "@/components/projects/design-modal"

export interface DesignWork {
  _id: string
  title: string
  description: string
  year: string
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export default function DesignGrid() {
  const [designs, setDesigns] = useState<DesignWork[]>([])
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedDesign, setSelectedDesign] = useState<DesignWork | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    async function fetchDesigns() {
      try {
        setLoading(true)
        const response = await fetch("/api/designs")

        if (!response.ok) {
          throw new Error(`Failed to fetch designs (${response.status})`)
        }

        const data = await response.json()
        setDesigns(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching designs:", err)
        setError(err instanceof Error ? err.message : "Failed to load designs")
      } finally {
        setLoading(false)
      }
    }

    fetchDesigns()
  }, [])

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()

    if (!confirm("Are you sure you want to delete this design work?")) {
      return
    }

    setIsDeleting(id)
    try {
      const token = localStorage.getItem("auth_token")
      const response = await fetch(`/api/designs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete design")
      }

      // Remove the deleted design from the state
      setDesigns(designs.filter((design) => design._id !== id))
    } catch (error) {
      console.error("Error deleting design:", error)
      alert("Failed to delete design. Please try again.")
    } finally {
      setIsDeleting(null)
    }
  }

  const handleDesignClick = (design: DesignWork) => {
    setSelectedDesign(design)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseModal = () => {
    setSelectedDesign(null)
    document.body.style.overflow = 'auto'
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="font-jetbrains text-gray-400">Loading designs...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-xl p-4">
        <div className="font-jetbrains text-red-400">{error}</div>
      </div>
    )
  }

  if (designs.length === 0) {
    return (
      <div className="relative">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
          <div className="font-jetbrains text-gray-400 mb-4">No design works found</div>
          {isLoggedIn && (
            <Link href="/projects/design/add">
              <button className="bg-white text-black px-4 py-2 rounded-xl font-jetbrains hover:bg-gray-200 transition-colors">
                Add Your First Design
              </button>
            </Link>
          )}
        </div>

        {/* Add Design Work Button (only visible when logged in) */}
        {isLoggedIn && (
          <Link href="/projects/design/add">
            <button
              className="fixed bottom-20 right-6 bg-white text-black rounded-full p-4 shadow-lg hover:bg-gray-200 transition-colors"
              aria-label="Add new design work"
            >
              <Pen size={24} />
            </button>
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {designs.map((design) => (
          <div
            key={design._id}
            className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
            onMouseEnter={() => setHoveredId(design._id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleDesignClick(design)}
          >
            <Image
              src={design.imageUrl || "/placeholder.svg"}
              alt={design.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Hover Overlay */}
            <div
              className={`absolute inset-0 bg-black/70 flex flex-col justify-end p-4 transition-opacity duration-200 ${
                hoveredId === design._id ? "opacity-100" : "opacity-0"
              }`}
            >
              <h3 className="font-inter text-lg font-bold mb-2">{design.title}</h3>
              <p className="font-jetbrains text-sm text-gray-300">{design.description}</p>
              <p className="font-jetbrains text-sm text-gray-400 mt-2">{design.year}</p>

              {/* Edit/Delete buttons (only visible when logged in) */}
              {isLoggedIn && (
                <div className="absolute top-2 right-2 flex gap-2">
                  <Link href={`/projects/design/edit/${design._id}`}>
                    <button
                      className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Edit size={16} />
                    </button>
                  </Link>
                  <button
                    className="bg-red-900 p-2 rounded-full hover:bg-red-800 transition-colors"
                    onClick={(e) => handleDelete(design._id, e)}
                    disabled={isDeleting === design._id}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedDesign && (
        <DesignModal 
          design={selectedDesign} 
          onClose={handleCloseModal}
        />
      )}

      {/* Add Design Work Button (only visible when logged in) */}
      {isLoggedIn && (
        <Link href="/projects/design/add">
          <button
            className="fixed bottom-20 right-6 bg-white text-black rounded-full p-4 shadow-lg hover:bg-gray-200 transition-colors"
            aria-label="Add new design work"
          >
            <Pen size={24} />
          </button>
        </Link>
      )}
    </div>
  )
}

