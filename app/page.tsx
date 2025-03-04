import Image from "next/image"
import Link from "next/link"
// TODO: deal with the deprecation of the github icon later
import { Github, Mail } from "lucide-react"
import ParticleBackground from "@/components/particle-background"

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-black text-white">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Top Navigation */}
      <nav className="z-10 w-full p-4 flex justify-end">
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
      <div className="z-10 flex flex-col sm:flex-row items-center sm:items-start justify-center gap-6 sm:gap-10 px-4">
        {/* Logo */}
        <div className="w-40 h-40 sm:w-48 sm:h-48 relative sm:self-end sm:-mb-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-DjBVvoQKTfjAR5EkZGwsLfNzavz1Es.png"
            alt="Project Mewo Logo"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center sm:items-start max-w-md">
          <h1 className="font-inter text-4xl sm:text-5xl font-bold mb-4 text-center sm:text-left">Project Mewo</h1>
          <p className="font-jetbrains text-sm sm:text-base text-gray-300 text-center sm:text-left">
            The collection of my do-it-yourself "side quests" - everything public I have done, ever.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="z-10 w-full py-4 px-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="font-jetbrains text-xs text-gray-500 mb-2 sm:mb-0">
          © {new Date().getFullYear()} Project Mewo. All rights reserved.
        </div>
        <div className="flex gap-4 font-jetbrains text-xs text-gray-500">
          <Link href="#" className="hover:text-gray-400 transition-colors">
            Terms
          </Link>
          <Link href="#" className="hover:text-gray-400 transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-gray-400 transition-colors">
            Docs
          </Link>
          <span className="hidden sm:inline">v1.0.0</span>
        </div>
      </footer>
    </main>
  )
}

