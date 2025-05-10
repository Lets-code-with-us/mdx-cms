"use client";
import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useFetch } from "@/hooks/useFetch";
import Loading from "../../../../components/ui/loading";
import Error from "../../../../components/ui/error";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Define the category interface
interface Category {
  _id: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const router = useRouter();
  const { data, error, loading } = useFetch("/api/v1/categories/categories");

  useEffect(() => {
    if (data && data?.data) {
      setCategories(data?.data);
    }
  }, [data]);

  const handleAddCategory = async () => {
    if (newCategory.trim() === "") return;

    try {
      const response = await axios.post("/api/v1/categories/create", {
        title: newCategory.trim(),
      });

      if (response.status === 201) {
        // Fixed comparison operator
        // Add the new category to the state from the API response data
        if (response.data && response.data.data) {
          setCategories([...categories, response.data.data]);
        }
        setNewCategory("");
        alert("Created");
        // Refresh to get updated data
        router.refresh();
      }
    } catch (error: any) {
      console.error("Error creating category:", error);
      alert("Something went wrong");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Fixed type
    if (e.key === "Enter") {
      handleAddCategory();
    }
  };

  const handleDeleteCategory = async (id: string) => {
    // Fixed type
    try {
      const response = await axios.post(`/api/v1/categories/category/${id}`, {
        action: "delete",
      });

      if (response.status === 200) {
        // Fixed comparison operator
        alert("Deleted");
        // Remove the deleted category from state
        setCategories(categories.filter((category) => category._id !== id));
        // Refresh to get updated data
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Something went wrong"); // Fixed typo
    }
  };

  if (loading) {
    return (
      <div className="w-full">
        {" "}
        {/* Fixed class from w-screen to w-full */}
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        {" "}
        {/* Fixed class from w-screen to w-full */}
        <Error />
      </div>
    );
  }

  return (
    <Card className="w-full mx-auto shadow-md">
      <CardHeader>
        <Link href="/contents">
          <Button className="bg-purple-500 mb-3 hover:bg-purple-600">
            Go Back
          </Button>
        </Link>
        <CardTitle className="text-xl font-bold">Categories Manager</CardTitle>
        <CardDescription>Create and manage your categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Input
            type="text"
            placeholder="New category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button
            onClick={handleAddCategory}
            disabled={newCategory.trim() === ""}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Current Categories
          </h3>

          {categories.length === 0 ? (
            <p className="text-sm text-gray-500 italic">
              No categories yet. Create one above.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category._id}
                  variant="secondary"
                  className="px-3 py-1 text-sm flex items-center gap-2 cursor-pointer group"
                  onClick={() => handleDeleteCategory(category._id)}
                >
                  {category.title}
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    ×
                  </span>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
