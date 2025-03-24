"use client"

import { cn } from "@/lib/utils"

interface ProjectsSidebarProps {
  activeCategory: string
  setActiveCategory: (category: string) => void
}

const categories = [
  { id: "coding", label: "Coding Works" },
  { id: "design", label: "Design Works" },
]

export default function ProjectsSidebar({ activeCategory, setActiveCategory }: ProjectsSidebarProps) {
  return (
    <aside className="w-full sm:w-48 sm:min-w-48 border-b sm:border-b-0 sm:border-r border-gray-800 sm:h-full">
      <nav className="p-4 sm:sticky sm:top-0">
        <ul className="flex sm:flex-col space-x-4 sm:space-x-0 sm:space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "px-4 py-2 rounded-xl font-jetbrains text-sm transition-colors",
                  activeCategory === category.id ? "bg-white text-black" : "hover:bg-gray-900",
                )}
              >
                {category.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

