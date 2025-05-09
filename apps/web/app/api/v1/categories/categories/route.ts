import { NextResponse } from "next/server";
import { DB_CONNECTION } from "@repo/database-config/db-config";
import { CategoryModel } from "@repo/database-config/models/category";

DB_CONNECTION(process.env.DB_URI!);
export async function GET() {
  try {
    const result = await CategoryModel.getAllCategories();

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 },
      );
    }

    return NextResponse.json({ message: result }, { status: 200 });
  } catch (error) {
    console.error("Error getting categories:", error);
    return NextResponse.json(
      { success: false, message: "Failed to get categories" },
      { status: 500 },
    );
  }
}
