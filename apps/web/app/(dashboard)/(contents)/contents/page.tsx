"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MoreHorizontal,
  Edit,
  Trash,
  Eye,
  Search,
  Plus,
  SortAsc,
} from "lucide-react";

export default function ContentTable() {
  // Example data - in a real app, this would come from an API
  const [content, setContent] = useState([
    {
      id: "1",
      title: "Getting Started with Next.js",
      slug: "getting-started-with-nextjs",
      published: true,
      createdAt: "2025-04-28T10:00:00Z",
    },
    {
      id: "2",
      title: "Understanding React Hooks",
      slug: "understanding-react-hooks",
      published: true,
      createdAt: "2025-04-25T14:30:00Z",
    },
    {
      id: "3",
      title: "Building a Beautiful UI with Tailwind",
      slug: "building-beautiful-ui-with-tailwind",
      published: false,
      createdAt: "2025-04-22T09:15:00Z",
    },
    {
      id: "4",
      title: "Advanced TypeScript Patterns",
      slug: "advanced-typescript-patterns",
      published: false,
      createdAt: "2025-04-20T16:45:00Z",
    },
    {
      id: "5",
      title: "Server Components in Next.js",
      slug: "server-components-nextjs",
      published: true,
      createdAt: "2025-04-18T11:20:00Z",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Toggle publish status
  const togglePublish = (id:string) => {
    setContent(
      content.map((item) =>
        item.id === id ? { ...item, published: !item.published } : item
      )
    );
  };

  // Filter content based on search term
  const filteredContent = content.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date for display
  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="w-full space-y-4 p-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Content Management
        </h2>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10"
          />
        </div>
        <Button variant="outline" className="h-10">
          <SortAsc className="mr-2 h-4 w-4" />
          Sort
        </Button>
      </div>

      <div className="rounded-md border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">Slug</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContent.length > 0 ? (
              filteredContent.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="text-gray-500">{item.slug}</TableCell>
                  <TableCell className="text-gray-500">
                    {formatDate(item.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={item.published ? "default" : "outline"}
                      className={
                        item.published
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "text-gray-500 hover:bg-gray-100"
                      }
                    >
                      {item.published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePublish(item.id)}
                        className={
                          item.published
                            ? "border-orange-200 text-orange-700 hover:bg-orange-50"
                            : "border-green-200 text-green-700 hover:bg-green-50"
                        }
                      >
                        {item.published ? "Unpublish" : "Publish"}
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-36">
                          <DropdownMenuItem className="cursor-pointer flex items-center">
                            <Eye className="mr-2 h-4 w-4" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer flex items-center">
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer flex items-center text-red-600 focus:text-red-600">
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>
          Showing {filteredContent.length} of {content.length} entries
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
