"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ProjectsContextType {
  activeCategory: string
  setActiveCategory: (category: string) => void
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined)

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [activeCategory, setActiveCategory] = useState("coding")

  return <ProjectsContext.Provider value={{ activeCategory, setActiveCategory }}>{children}</ProjectsContext.Provider>
}

export function useProjects() {
  const context = useContext(ProjectsContext)
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider")
  }
  return context
}

