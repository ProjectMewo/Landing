"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

export default function LoginForm(): JSX.Element {
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [redirectPath, setRedirectPath] = useState<string>("/blog")
  const router = useRouter()
  const { login } = useAuth()

  useEffect(() => {
    // Check if there's a stored redirect path
    const storedPath = localStorage.getItem("redirectAfterLogin")
    if (storedPath) {
      setRedirectPath(storedPath)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    if (!password.trim()) {
      setError("Password is required")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const success = await login(password)

      if (success) {
        // Clear the stored redirect path
        const path = redirectPath
        localStorage.removeItem("redirectAfterLogin")
        router.push(path)
      } else {
        setError("Invalid password")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-300 p-4 mb-6 rounded-xl font-jetbrains">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="password" className="block font-jetbrains text-sm mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 font-jetbrains text-white"
          placeholder="Enter admin password"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-white text-black px-6 py-2 rounded-xl font-jetbrains hover:bg-gray-200 transition-colors disabled:opacity-50"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  )
}

