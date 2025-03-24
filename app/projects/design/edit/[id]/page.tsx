import type { Metadata } from "next"
import { notFound } from "next/navigation"
import SiteLayout from "@/components/shared/site-layout"
import DesignEditor from "@/components/projects/design-editor"
import { getDesignWork } from "@/lib/design-utils"

interface EditDesignPageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: "Edit Design Work | Project Mewo",
  description: "Edit an existing design work in your portfolio",
}

export default async function EditDesignPage({ params }: EditDesignPageProps) {
  const design = await getDesignWork(params.id)

  if (!design) {
    notFound()
  }

  return (
    <SiteLayout>
      <div className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-inter text-4xl font-bold mb-8">Edit Design Work</h1>
          <DesignEditor
            designId={design._id}
            initialTitle={design.title}
            initialDescription={design.description}
            initialYear={design.year}
            initialImageUrl={design.imageUrl}
            isEditing={true}
          />
        </div>
      </div>
    </SiteLayout>
  )
}

