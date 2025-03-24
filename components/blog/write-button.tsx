"use client"

import { useAuth } from "@/lib/auth-context"
import { Pen } from "lucide-react"
import Link from "next/link"

export default function WriteButton() {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return null
  }

  return (
    <Link href="/blog/write">
      <button
        className="fixed bottom-20 right-6 bg-white text-black rounded-full p-4 shadow-lg hover:bg-gray-200 transition-colors"
        aria-label="Write new blog post"
      >
        <Pen size={24} />
      </button>
    </Link>
  )
}

