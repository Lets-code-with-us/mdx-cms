import { NextResponse } from "next/server";
import { ContentModel } from "@repo/database-config/models/content";
import { DB_CONNECTION } from "@repo/database-config/db-config";

DB_CONNECTION(process.env.DB_URI!);

export const GET = async (
  _: Request,
  context: { params:  Promise<{ post: string }> },
) => {
  try {
    const { post } = await context.params;

    // All posts
    if (post[0] === "posts" && !post[1]) {
      const contents = await ContentModel.getContents("all", "all");
      return NextResponse.json({ message: contents }, { status: 200 });
    }

    // Posts with category
    if (post[0] === "posts" && post[1] === "category" && !post[3]) {
      const contents = await ContentModel.getContents(
        "category",
        post[2] as string,
      );
      return NextResponse.json({ message: contents }, { status: 200 });
    }

    // Single post by id
    if (post[0] === "posts" && post[1] === "id" && !post[3]) {
      const content = await ContentModel.getContent(post[2] as string);
      return NextResponse.json({ message: content }, { status: 200 });
    }

    return NextResponse.json(
      { message: "Invalid route", post },
      { status: 404 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 },
    );
  }
};
