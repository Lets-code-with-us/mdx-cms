import { NextRequest, NextResponse } from "next/server";
import { DB_CONNECTION } from "@repo/database-config/db-config";
import { CategoryModel } from "@repo/database-config/models/category";

DB_CONNECTION(process.env.DB_URI!);
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || typeof body.title !== "string") {
      return NextResponse.json(
        { success: false, message: "Title is required and must be a string" },
        { status: 400 },
      );
    }

    const result = await CategoryModel.createCategory(body.title);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 },
      );
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create category" },
      { status: 500 },
    );
  }
}
