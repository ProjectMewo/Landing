import type { Metadata } from "next"
import LoginForm from "@/components/blog/login-form"
import SiteLayout from "@/components/shared/site-layout"

export const metadata: Metadata = {
  title: "Login | Project Mewo",
  description: "Login to manage blog posts",
}

export default function LoginPage() {
  return (
    <SiteLayout>
      <div className="flex-grow flex items-center justify-center py-8">
        <div className="w-full max-w-md p-8 border border-gray-800 rounded-xl">
          <h1 className="font-inter text-3xl font-bold mb-6 text-center">Admin Login</h1>
          <LoginForm />
        </div>
      </div>
    </SiteLayout>
  )
}

