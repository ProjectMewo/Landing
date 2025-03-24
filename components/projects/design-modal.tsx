import { useEffect, type ReactNode } from "react"
import { X } from "lucide-react"
import Image from "next/image"
import type { DesignWork } from "@/lib/design-utils"

interface DesignModalProps {
  design: DesignWork
  onClose: () => void
  children?: ReactNode
}

export default function DesignModal({ design, onClose }: DesignModalProps) {
  // Close on escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer animate-in fade-in duration-200" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl mx-4 my-8 animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="sticky top-0 float-right p-2 -mr-2 text-gray-400 hover:text-white transition-colors z-50"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="relative max-h-[70vh]">
            <Image
              src={design.imageUrl}
              alt={design.title}
              width={1920}
              height={1080}
              className="object-contain w-full h-full"
              style={{ maxHeight: '70vh' }}
            />
          </div>
          <div className="p-6">
            <h2 className="font-inter text-2xl font-bold mb-3">{design.title}</h2>
            <p className="font-jetbrains text-gray-300 mb-3 whitespace-pre-wrap">{design.description}</p>
            <p className="font-jetbrains text-sm text-gray-400">{design.year}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
