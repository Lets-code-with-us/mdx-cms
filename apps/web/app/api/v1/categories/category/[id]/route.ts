import { NextRequest, NextResponse } from "next/server";
import { DB_CONNECTION } from "@repo/database-config/db-config";
import { CategoryModel } from "@repo/database-config/models/category";

DB_CONNECTION(process.env.DB_URI!);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const result = await CategoryModel.getCategory(id);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: result.message === "Category not found" ? 404 : 400 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error getting category:", error);
    return NextResponse.json(
      { success: false, message: "Failed to get category" },
      { status: 500 }
    );
  }
}

// POST handles both update and delete operations
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body || !body.action) {
      return NextResponse.json(
        { success: false, message: "Action is required" },
        { status: 400 }
      );
    }

    if (body.action === "update") {
      if (!body.title || typeof body.title !== "string") {
        return NextResponse.json(
          { success: false, message: "Title is required and must be a string" },
          { status: 400 }
        );
      }

      const result = await CategoryModel.updateCategory(id, body.title);

      if (!result.success) {
        return NextResponse.json(
          { success: false, message: result.message },
          { status: result.message === "Category not found" ? 404 : 400 }
        );
      }

      return NextResponse.json(result, { status: 200 });
    } else if (body.action === "delete") {
      const result = await CategoryModel.deleteCategory(id);

      if (!result.success) {
        return NextResponse.json(
          { success: false, message: result.message },
          { status: result.message === "Category not found" ? 404 : 400 }
        );
      }

      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid action" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process request" },
      { status: 500 }
    );
  }
}
