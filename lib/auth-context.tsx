"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type AuthContextType = {
  isLoggedIn: boolean
  login: (password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const token = localStorage.getItem("auth_token")
    if (token) {
      setIsLoggedIn(true)
    }
    setIsInitialized(true)
  }, [])

  const login = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("auth_token", data.token)
        setIsLoggedIn(true)
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = (): void => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("redirectAfterLogin")
    setIsLoggedIn(false)
  }

  // Don't render children until we've checked the auth state
  if (!isInitialized) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

