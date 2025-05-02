import { NextRequest, NextResponse } from "next/server";
import { AuthModel } from "@repo/database-config/models/auth";
import { DB_CONNECTION } from "@repo/database-config/db-config";

// creating new user

DB_CONNECTION("");
export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();
    if (!data) {
      return NextResponse.json(
        { message: "Empty request body" },
        { status: 402 }
      );
    }

    const res = await AuthModel.createNewUser(
      "email",
      "password",
      "organization"
    );

    switch (res.code) {
      case 201:
        return NextResponse.json(
          { message: res.message },
          { status: res.code }
        );

      case 409:
        return NextResponse.json({ mesage: res.message }, { status: res.code });

      case 403:
        return NextResponse.json(
          { message: res.message },
          { status: res.code }
        );

      default:
        return NextResponse.json(
          { message: res.message },
          { status: res.code }
        );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 200 });
  }
};
