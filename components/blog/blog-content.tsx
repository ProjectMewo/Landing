"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, Edit, Trash2, LogIn } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import remarkDirective from "remark-directive"
import remarkDirectiveRehype from "remark-directive-rehype"
import type { Components } from "react-markdown"

// Custom plugin for GitHub-style alert boxes
function remarkAlerts() {
  return (tree: any) => {
    // The plugin doesn't need to manipulate the tree directly
    // as we're using directive plugins to handle the alerts
    return tree
  }
}

interface Blog {
  _id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

interface BlogContentProps {
  blog: Blog
}

export default function BlogContent({ blog }: BlogContentProps): JSX.Element {
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const handleDelete = async (): Promise<void> => {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return
    }

    setIsDeleting(true)
    try {
      const token = localStorage.getItem("auth_token")
      const response = await fetch(`/api/blogs/${blog._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete blog")
      }

      router.push("/blog")
    } catch (error) {
      console.error("Error deleting blog:", error)
      alert("Failed to delete blog post. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  // Custom components for Markdown rendering
  const components: Components = {
    // Improved header styling
    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 font-inter" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3 font-inter" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-5 mb-2 font-inter" {...props} />,
    h4: ({ node, ...props }) => <h4 className="text-lg font-bold mt-4 mb-2 font-inter" {...props} />,
    h5: ({ node, ...props }) => <h5 className="text-base font-bold mt-4 mb-2 font-inter" {...props} />,
    h6: ({ node, ...props }) => <h6 className="text-sm font-bold mt-4 mb-2 font-inter" {...props} />,
    // Improved link styling
    a: ({ node, ...props }) => (
      <a className="text-blue-400 underline hover:text-blue-300 transition-colors" {...props} />
    ),
    // Image styling
    img: ({ node, ...props }) => (
      <div className="my-4">
        <img {...props} className="max-w-full h-auto rounded-md" />
      </div>
    ),
    // Custom rendering for alert containers
    div: ({ node, className, children, ...props }) => {
      if (className?.includes("alert-")) {
        const alertType = className.replace("alert-", "")
        const alertClasses: Record<string, string> = {
          note: "bg-blue-900/30 border-l-4 border-blue-500",
          tip: "bg-green-900/30 border-l-4 border-green-500",
          warning: "bg-yellow-900/30 border-l-4 border-yellow-500",
          important: "bg-purple-900/30 border-l-4 border-purple-500",
          caution: "bg-red-900/30 border-l-4 border-red-500",
        }

        return (
          <div className={`${alertClasses[alertType] || alertClasses["note"]} p-4 rounded-r-md my-4`} {...props}>
            {children}
          </div>
        )
      }
      return (
        <div className={className} {...props}>
          {children}
        </div>
      )
    },
    // Code block styling
    // @ts-ignore
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "")
      return !inline ? (
        <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto my-4">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      ) : (
        <code className="bg-gray-900 px-1 py-0.5 rounded-sm" {...props}>
          {children}
        </code>
      )
    },
    // List styling
    ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-4 space-y-2" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />,
    // Paragraph styling
    p: ({ node, ...props }) => <p className="my-4" {...props} />,
    // Blockquote styling
    blockquote: ({ node, ...props }) => (
      <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4 text-gray-300" {...props} />
    ),
  }

  return (
    <article className="max-w-3xl mx-auto pb-16">
      <div className="mb-8 flex justify-between items-center">
        <Link
          href="/blog"
          className="font-jetbrains text-gray-400 flex items-center hover:text-white transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to all posts
        </Link>

        {!isLoggedIn && (
          <Link
            href="/blog/login"
            className="flex items-center gap-2 font-jetbrains text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors"
          >
            <LogIn size={16} />
            <span>Login</span>
          </Link>
        )}
      </div>

      <h1 className="font-inter text-4xl font-bold mb-4">{blog.title}</h1>

      <div className="font-jetbrains text-sm text-gray-400 mb-8">
        Published on {format(new Date(blog.createdAt), "MMMM d, yyyy")}
        {blog.updatedAt !== blog.createdAt && ` (Updated ${format(new Date(blog.updatedAt), "MMMM d, yyyy")})`}
      </div>

      {isLoggedIn && (
        <div className="flex gap-4 mb-8">
          <Link
            href={`/blog/edit/${blog._id}`}
            className="font-jetbrains text-sm flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <Edit size={16} className="mr-2" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="font-jetbrains text-sm flex items-center text-red-500 hover:text-red-400 transition-colors disabled:opacity-50"
          >
            <Trash2 size={16} className="mr-2" />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}

      <div className="prose prose-invert max-w-none font-jetbrains">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkDirective, remarkDirectiveRehype, remarkAlerts]}
          rehypePlugins={[rehypeRaw]}
          components={components}
        >
          {processContent(blog.content)}
        </ReactMarkdown>
      </div>
    </article>
  )
}

// Process content to support GitHub-style alert syntax
function processContent(content: string): string {
  // Replace GitHub-style alerts: > [!NOTE], > [!WARNING], etc.
  return content.replace(
    />\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]([\s\S]*?)(?=>\s*\[!|\n\n|$)/g,
    (_, type, text) => {
      const alertType = type.toLowerCase()
      return `<div class="alert-${alertType}">\n\n${text.trim()}\n\n</div>\n\n`
    },
  )
}

