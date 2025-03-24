import type { Metadata } from "next"
import SiteLayout from "@/components/shared/site-layout"
import ProjectsContent from "@/components/projects/projects-content"

export const metadata: Metadata = {
  title: "Projects | Project Mewo",
  description: "Explore the projects from Project Mewo",
}

export default function ProjectsPage() {
  return (
    <SiteLayout>
      <ProjectsContent />
    </SiteLayout>
  )
}

