"use client"

import { useState } from "react"
import ProjectsSidebar from "@/components/projects/sidebar"
import GitHubProfile from "@/components/projects/github-profile"
import DesignGrid from "@/components/projects/design-grid"

export default function ProjectsContent() {
  const [activeCategory, setActiveCategory] = useState("coding")

  return (
    <div className="flex-grow flex flex-col sm:flex-row">
      {/* Sidebar */}
      <ProjectsSidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {activeCategory === "coding" ? (
            <>
              <h2 className="font-inter text-3xl font-bold mb-8">Coding Works</h2>
              <GitHubProfile />
            </>
          ) : (
            <>
              <h2 className="font-inter text-3xl font-bold mb-8">Design Works</h2>
              <DesignGrid />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

