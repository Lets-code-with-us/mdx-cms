"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { MoreHorizontal, Edit, Trash, Eye, Search, Plus } from "lucide-react";
import { useFetch } from "../../../../hooks/useFetch";
import Loading from "../../../../components/ui/loading";
import Error from "../../../../components/ui/error";
import Link from "next/link";

export default function ContentTable() {
  const { data, error, loading } = useFetch("/api/v1/posts/posts");
  const [searchTerm, setSearchTerm] = useState("");

  if (!data) {
    return null;
  }

  // Filter content based on search term
  const filteredContent = data.message?.filter(
    (item: { title: string; slug: string }) =>
      item?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.slug.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  if (error) {
    return (
      <div className="w-full">
        <Error />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 p-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Content Management
        </h2>
        <Link href="/categories">
          <Button className="bg-purple-500 hover:bg-purple-600">
            <Plus className="mr-2 h-4 w-4" /> Add New Category
          </Button>
        </Link>
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
              filteredContent.map(
                (item: {
                  _id: string;
                  id: string;
                  title: string;
                  slug: string;
                  createdAt: string;
                  published: boolean;
                }) => (
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
                            <Link href={`/viewcontent/${item._id}`}>
                              <DropdownMenuItem className="cursor-pointer flex items-center">
                                <Eye className="mr-2 h-4 w-4" /> View
                              </DropdownMenuItem>
                            </Link>
                            <Link href={`/updatecontent/${item._id}`}>
                              <DropdownMenuItem className="cursor-pointer flex items-center">
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem className="cursor-pointer flex items-center text-red-600 focus:text-red-600">
                              <Trash className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ),
              )
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
          Showing {filteredContent.length} of {data.length} entries
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
