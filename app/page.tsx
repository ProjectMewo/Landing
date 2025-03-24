import Image from "next/image"
import SiteLayout from "@/components/shared/site-layout"

export default function Home() {
  return (
    <SiteLayout allowScroll={false}>
      {/* Main Content - Adding flex-1 and flex items-center to center vertically */}
      <div className="z-10 flex-1 flex items-center justify-center w-full">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-6 sm:gap-10 px-4">
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
      </div>
    </SiteLayout>
  )
}

