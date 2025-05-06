import { NextResponse, NextRequest } from "next/server";
import { AuthModel } from "@repo/database-config/models/auth";
import { DB_CONNECTION } from "@repo/database-config/db-config";

DB_CONNECTION(process.env.DB_URI!);
export const POST = (request: NextRequest) => {
  try {
    const data = request.json();

    
  } catch (error) {}
};
