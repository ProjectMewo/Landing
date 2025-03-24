"use client"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import GitHubRepos from "./github-repos"

export default function GitHubProfile() {
  return (
    <div className="space-y-8">
      {/* Custom Neofetch-style Profile */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0 w-full md:w-80">
            <Image
              src="https://i.imgur.com/Qq3OJJ0.png"
              alt="Profile picture"
              width={320}
              height={320}
              className="rounded-xl"
            />
          </div>

          {/* Profile Info */}
          <div className="font-jetbrains">
            <div className="text-lg font-bold mb-2">buttermiilk@github</div>
            <div className="border-b border-gray-700 mb-4"></div>

            <div className="space-y-1 text-sm">
              <div>
                <span className="text-gray-400">OS:</span> Windows 10, Arch Linux x86_64, Debian "bullseye"
              </div>
              <div>
                <span className="text-gray-400">Shell:</span> PowerShell, zsh
              </div>
              <div>
                <span className="text-gray-400">Pronouns:</span> they/them
              </div>
              <div>
                <span className="text-gray-400">Location:</span> Asia
              </div>
              <div>
                <span className="text-gray-400">Languages:</span> JavaScript, Python, C++, Bash, HTML, CSS
              </div>
              <div>
                <span className="text-gray-400">Learning:</span> Bun, React
              </div>
              <div>
                <span className="text-gray-400">Commits:</span> 144
              </div>
              <div>
                <span className="text-gray-400">Stars:</span> 2
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Custom URL:</span>
                <Link
                  href="https://linktr.ee/sh1m3ji"
                  target="_blank"
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  linktr.ee/sh1m3ji
                  <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Image */}
        <div className="flex justify-center mt-6">
          <Image src="https://i.imgur.com/T09wbom.jpg" alt="scheme" width={200} height={20} className="h-5 w-auto" />
        </div>
      </div>

      {/* GitHub Repositories */}
      <div className="space-y-6">
        <h3 className="font-inter text-2xl font-bold">Personal Projects</h3>
        <GitHubRepos username="buttermiilk" />

        <h3 className="font-inter text-2xl font-bold mt-12">ProjectMewo Projects</h3>
        <GitHubRepos username="ProjectMewo" isOrg={true} />
      </div>
    </div>
  )
}

