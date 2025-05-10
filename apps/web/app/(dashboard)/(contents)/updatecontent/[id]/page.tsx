"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
import { Button } from "../../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { PenLine, FileText, Tag, Save, MoveLeft } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Loading from "../../../../../components/ui/loading";

// Use dynamic import with loading priority
const EditorComp = dynamic(
  () => import("../../../../../components/editorui/editor"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-400">Loading editor...</div>
      </div>
    ),
  },
);

export default function MDXEditor() {
  const { id: slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState({
    title: "",
    slug: "",
    content: "",
    category: "",
    published: "",
  });

  useEffect(() => {
    if (slug) {
      fetchContent(slug as string);
    }
  }, [slug]);

  const fetchContent = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/v1/posts/posts/id/${id}`);
      const data = await response.json();

      if (data && data.message && data.message.message) {
        // Make sure we're setting content properly
        setContent(data.message.message);
        setIsLoading(false);
      } else {
        console.error("Invalid data structure:", data);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      alert("Failed to load content");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (newContent: string) => {
    setContent((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/posts/update", {
        id: slug,
        ...content,
      });
      if (response.status == 200) {
        alert("Updated");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      alert("Something went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-screen">
        <Loading />
      </div>
    );
  }

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
                <Label
                  htmlFor="title"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <FileText className="h-4 w-4 text-gray-500" />
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={content.title || ""}
                  onChange={handleChange}
                  placeholder="Enter the blog title"
                  className="h-10 focus-visible:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="slug"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <FileText className="h-4 w-4 text-gray-500" />
                  Slug
                </Label>
                <Input
                  id="slug"
                  name="slug"
                  value={content.slug || ""}
                  onChange={handleChange}
                  placeholder="your-blog-post-slug"
                  className="h-10 focus-visible:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="category"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Tag className="h-4 w-4 text-gray-500" />
                Category
              </Label>
              <select
                id="category"
                name="category"
                value={content.category || ""}
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
              <Label
                htmlFor="published"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Tag className="h-4 w-4 text-gray-500" />
                Published
              </Label>
              <select
                id="published"
                name="published"
                value={content.published || "false"}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                <option value={`true`}>Published</option>
                <option value={`false`}>UnPublished</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="editor" className="text-sm font-medium">
                Content
              </Label>
              <div className="border border-gray-200 rounded-lg overflow-hidden min-h-[400px]">
                {!isLoading && (
                  <EditorComp
                    markdown={content.content || ""}
                    onChange={handleEditorChange}
                    key={`editor-${slug}-${isLoading}`}
                  />
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Link href="/contents">
                <Button className="bg-blue-500 hover:bg-blue-600 gap-2 text-white px-4 py-2 rounded-md">
                  <MoveLeft className="h-4 w-4" />
                  Back
                </Button>
              </Link>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 gap-2 text-white px-4 py-2 rounded-md"
              >
                <Save className="h-4 w-4" />
                {isLoading ? "Updating.. " : "Update Post"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
