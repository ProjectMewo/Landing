import Link from "next/link"
import { Github, Mail } from "lucide-react"
import ParticleBackground from "@/components/particle-background"
import type { ReactNode } from "react"
import packageJson from "../../package.json"
const { version } = packageJson

interface SiteLayoutProps {
  children: ReactNode
  showParticles?: boolean
  allowScroll?: boolean
}

export default function SiteLayout({
  children,
  showParticles = true,
  allowScroll = true,
}: SiteLayoutProps): JSX.Element {
  return (
    <main
      className={`relative flex min-h-screen flex-col items-center bg-black text-white ${allowScroll ? "allow-scroll" : "overflow-hidden"}`}
    >
      {/* Particle Background */}
      {showParticles && <ParticleBackground />}

      {/* Top Navigation */}
      <nav className="z-10 w-full p-4 flex justify-between">
        {/* Left side navbar */}
        <div className="flex gap-6 items-center">
          <Link href="/" className="flex items-center mr-6">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-DjBVvoQKTfjAR5EkZGwsLfNzavz1Es.png"
              alt="Project Mewo Logo"
              className="h-8 w-8 mr-2"
            />
            <span className="font-inter font-bold hidden sm:inline">Project Mewo</span>
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-2 font-jetbrains text-sm hover:text-gray-300 transition-colors"
          >
            <span>Blog</span>
          </Link>
          <Link
            href="/projects"
            className="flex items-center gap-2 font-jetbrains text-sm hover:text-gray-300 transition-colors"
          >
            <span>Projects</span>
          </Link>
        </div>

        {/* Right side links */}
        <div className="flex gap-6">
          <Link
            href="https://github.com/ProjectMewo"
            target="_blank"
            className="flex items-center gap-2 font-jetbrains text-sm hover:text-gray-300 transition-colors"
          >
            <Github size={20} />
            <span className="hidden sm:inline">GitHub</span>
          </Link>
          <Link
            href="mailto:shimeji.rin@gmail.com"
            className="flex items-center gap-2 font-jetbrains text-sm hover:text-gray-300 transition-colors"
          >
            <Mail size={20} />
            <span className="hidden sm:inline">Contact</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="z-10 w-full flex-grow flex flex-col">{children}</div>

      {/* Footer */}
      <footer className="z-[5] w-full py-4 px-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="font-jetbrains text-xs text-gray-500 mb-2 sm:mb-0">
          © {new Date().getFullYear()} Project Mewo. All rights reserved.
        </div>
        <div className="flex gap-4 font-jetbrains text-xs text-gray-500">
          <Link href="/privacy" className="hover:text-gray-400 transition-colors">
            Privacy
          </Link>
          <span className="hidden sm:inline">v{version}</span>
        </div>
      </footer>
    </main>
  )
}

