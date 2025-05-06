"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PenLine, FileText, Tag, Save } from "lucide-react";

const EditorComp = dynamic(() => import("@/components/editorui/editor"), {
  ssr: false,
});

const markdown = `
# Hello **world**!

This is an example of Markdown content. You can:

- Create lists
- **Bold text**
- *Italicize text*
- [Add links](https://example.com)
- And much more!
`;

export default function MDXEditor() {
  const [content, setContent] = useState({
    title: "",
    slug: "",
    content: "",
    category: "blogs",
  });

  const handleChange = (e:React.FormEventHandler) => {
    const { name, value } = e.target;
    setContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e:React.ReactEventHandler) => {
    e.preventDefault();
    console.log("Content submitted:", content);
    // Add your save logic here
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <Card className="shadow-lg border-t-4 border-t-blue-500">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <PenLine className="h-6 w-6 text-blue-500" />
            MDX Editor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  Title
                </Label>
                <Input 
                  id="title"
                  name="title"
                  value={content.title}
                  onChange={handleChange}
                  placeholder="Enter the blog title"
                  className="h-10 focus-visible:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug" className="text-sm font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  Slug
                </Label>
                <Input 
                  id="slug"
                  name="slug"
                  value={content.slug}
                  onChange={handleChange}
                  placeholder="your-blog-post-slug"
                  className="h-10 focus-visible:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium flex items-center gap-2">
                <Tag className="h-4 w-4 text-gray-500" />
                Category
              </Label>
              <select 
                id="category"
                name="category"
                value={content.category}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                <option value="blogs">Blogs</option>
                <option value="tutorials">Tutorials</option>
                <option value="news">News</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="editor" className="text-sm font-medium">
                Content
              </Label>
              <div className="border border-gray-200 rounded-lg overflow-hidden min-h-[400px]">
                <Suspense fallback={
                  <div className="h-[400px] flex items-center justify-center bg-gray-50">
                    <div className="animate-pulse text-gray-400">Loading editor...</div>
                  </div>
                }>
                  <EditorComp markdown={markdown} />
                </Suspense>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-600 gap-2 text-white px-4 py-2 rounded-md"
              >
                <Save className="h-4 w-4" />
                Save Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}