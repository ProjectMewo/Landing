"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Github, Star, GitFork } from "lucide-react"

interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  language: string
  stargazers_count: number
  forks_count: number
  fork: boolean
  owner: {
    login: string
    avatar_url: string
  }
}

interface GitHubReposProps {
  username: string
  isOrg?: boolean
  limit?: number
}

export default function GitHubRepos({ username, isOrg = false, limit = 6 }: GitHubReposProps) {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true)
        const url = isOrg
          ? `https://api.github.com/orgs/${username}/repos?sort=updated&per_page=${limit}`
          : `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`

        const response = await fetch(url)

        if (response.status === 403) {
          throw new Error("API rate limit exceeded. Please try again later.")
        }

        if (response.status === 404) {
          throw new Error(`${isOrg ? "Organization" : "User"} not found`)
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch repositories (${response.status})`)
        }

        const data = await response.json()
        // Filter out forks if not explicitly requested
        setRepos(data.filter((repo: Repository) => !repo.fork).slice(0, limit))
        setError(null)
      } catch (err) {
        console.error("Error fetching repositories:", err)
        setError(err instanceof Error ? err.message : "Failed to load GitHub repositories")
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [username, isOrg, limit])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-6">
        <div className="font-jetbrains text-gray-400">Loading repositories...</div>
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

  if (repos.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
        <div className="font-jetbrains text-gray-400">No public repositories found</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {repos.map((repo) => (
        <div key={repo.id} className="border border-gray-800 rounded-xl p-4 hover:bg-gray-900 transition-colors">
          <div className="flex justify-between items-start">
            <h3 className="font-inter font-bold text-lg">{repo.name}</h3>
            <Link href={repo.html_url} target="_blank" className="text-gray-400 hover:text-white">
              <Github size={18} />
            </Link>
          </div>
          <p className="font-jetbrains text-sm text-gray-300 mt-2 line-clamp-2">
            {repo.description || "No description provided"}
          </p>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-3">
              {repo.language && <span className="font-jetbrains text-xs text-gray-400">{repo.language}</span>}
              <div className="flex items-center gap-1 text-gray-400">
                <Star size={14} />
                <span className="font-jetbrains text-xs">{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <GitFork size={14} />
                <span className="font-jetbrains text-xs">{repo.forks_count}</span>
              </div>
            </div>
            <span className="font-jetbrains text-xs text-gray-500">{repo.owner.login}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

