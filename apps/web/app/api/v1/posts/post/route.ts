import { NextRequest, NextResponse } from "next/server";

export const POST = async(request: NextRequest) => {
  try {
    const data = await request.json();
    if (!data) {
      return NextResponse.json(
        { message: "Empty Request Body" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 200 });
  }
};
