import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  FileText,
  Code,
  Sparkles,
  GitBranch,
  Search,
  Feather,
  LayoutTemplate,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-violet-600 text-white">
            <FileText size={22} />
          </div>
          <span className="text-xl font-bold text-gray-900">MDX.cms</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#features"
            className="hidden md:block text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            Features
          </a>
          <Link
            href="#docs"
            className="hidden md:block text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            Documentation
          </Link>
          <Link href="/signin">
            <Button size="sm" variant="outline" className="hidden md:flex mr-2">
              Sign In
            </Button>
          </Link>
          <Link href="/getstarted">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-violet-100 text-violet-800 text-sm font-medium">
              The modern way to manage content
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              MDX-powered CMS for developers
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              Create, edit, and publish Markdown and React components in one
              seamless workflow. Perfect for blogs, documentation, and
              content-heavy applications.
            </p>

            <div className="flex items-center gap-4 text-gray-500 text-sm pt-4">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-gray-400" />
                <span>Git-based workflow</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-gray-400" />
                <span>React + MDX</span>
              </div>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-400" />
                <span>SEO optimized</span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-violet-100 rounded-full filter blur-xl opacity-70"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-100 rounded-full filter blur-xl opacity-70"></div>

            <Card className="relative border bg-white/50 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="bg-gray-900 rounded-t-lg p-3 text-gray-400 text-xs font-mono flex items-center">
                  <div className="flex space-x-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span>mdx-content.jsx</span>
                </div>
                <div className="bg-gray-900 p-4 rounded-b-lg shadow-inner text-gray-100 font-mono text-sm">
                  <div className="text-gray-400">{`# Welcome to MDX.cms`}</div>
                  <div className="text-green-400 mt-2">{`<Hero>`}</div>
                  <div className="pl-6 text-blue-300">
                    {`title="Next-gen Content Platform"`}
                  </div>
                  <div className="pl-6 text-blue-300">
                    {`subtitle="Write in Markdown, style with React"`}
                  </div>
                  <div className="text-green-400">{`</Hero>`}</div>
                  <div className="mt-2 text-gray-100">
                    {`Create **beautiful** content with the simplicity of Markdown and the power of React components.`}
                  </div>
                  <div className="text-purple-400 mt-2">
                    {`<CodeExample language="jsx" />`}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-violet-50">
                    <Feather className="w-5 h-5 text-violet-600 mb-2" />
                    <h3 className="font-medium text-gray-900 text-sm">Write</h3>
                  </div>
                  <div className="p-3 rounded-lg bg-indigo-50">
                    <LayoutTemplate className="w-5 h-5 text-indigo-600 mb-2" />
                    <h3 className="font-medium text-gray-900 text-sm">
                      Compose
                    </h3>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50">
                    <Sparkles className="w-5 h-5 text-blue-600 mb-2" />
                    <h3 className="font-medium text-gray-900 text-sm">
                      Publish
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section Preview */}
      <section className="py-16 bg-gray-50" id="features">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything you need for modern content
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              MDX.cms combines the best of content management with the
              flexibility developers love.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-violet-100 flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">MDX Powered</h3>
                <p className="text-gray-600">
                  Combine Markdown with JSX to create interactive, dynamic
                  content.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                  <GitBranch className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Git Workflow</h3>
                <p className="text-gray-600">
                  Version control and collaboration built on top of Git.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">SEO Ready</h3>
                <p className="text-gray-600">
                  Built-in tools to optimize your content for search engines.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Built By Section */}
      <footer className="py-6 bg-white border-t border-gray-200 text-center">
        <p className="text-gray-600 font-medium">
          Built with 💜 by{" "}
          <span className="text-violet-600 font-bold">Let&apos;s Code</span>
        </p>
      </footer>
    </div>
  );
}
