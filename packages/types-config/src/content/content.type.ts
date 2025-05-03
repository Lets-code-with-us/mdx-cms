import { z } from "zod";

export const checkContentType = (content: object) => {
  const contenttype = z.object({
    title: z.string().max(40),
    slug: z.string().max(40),
    content: z.string(),
    category: z.string().max(10),
    published:z.boolean()
  });
  const res = contenttype.safeParse(content);
  if (!res.success) {
    return {
      message: res.error.errors,
    };
  }
  return {
    message: res.success,
  };
};
