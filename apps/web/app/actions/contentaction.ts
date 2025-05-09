// app/actions/contentaction.ts
"use server";

import { redirect } from "next/navigation";

export async function createContent(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;

  console.log(title, slug, content, category);

  if (!title || !slug || !content || !category) {
    throw new Error("All fields are required");
  }

  const res = await fetch("https://external-api.com/posts/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, slug, content, category }),
  });

  if (!res.ok) {
    throw new Error("Failed to create post");
  }

  redirect("/contents");
}
