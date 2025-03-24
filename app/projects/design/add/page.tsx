import type { Metadata } from "next"
import SiteLayout from "@/components/shared/site-layout"
import DesignEditor from "@/components/projects/design-editor"

export const metadata: Metadata = {
  title: "Add Design Work | Project Mewo",
  description: "Add a new design work to your portfolio",
}

export default function AddDesignPage() {
  return (
    <SiteLayout>
      <div className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-inter text-4xl font-bold mb-8">Add New Design Work</h1>
          <DesignEditor />
        </div>
      </div>
    </SiteLayout>
  )
}

