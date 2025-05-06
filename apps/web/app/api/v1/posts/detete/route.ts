import { NextRequest, NextResponse } from "next/server";
import { ContentModel } from "@repo/database-config/models/content";
import { DB_CONNECTION } from "@repo/database-config/db-config";

// creating new user

DB_CONNECTION(process.env.DB_URI! as string);
export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();
    if (!data) {
      return NextResponse.json(
        { message: "Empty request body" },
        { status: 402 },
      );
    }

    const res = await ContentModel.deleteContent(data.id);

    switch (res.code) {
      case 200:
        return NextResponse.json(
          { message: res.message },
          { status: res.code },
        );

      case 404:
        return NextResponse.json({ mesage: res.message }, { status: res.code });

      default:
        return NextResponse.json(
          { message: res.message },
          { status: res.code },
        );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 200 });
  }
};
