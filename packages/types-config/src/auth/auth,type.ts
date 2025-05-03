import { z } from "zod";

export const checkUserType = (user: object) => {
  const usertype = z.object({
    emai: z.string().email(),
    password: z.string().min(10).max(20),
    organization: z.string().min(2).max(20),
    role: z.string(),
  });
  const res = usertype.safeParse(user);
  if (!res.success) {
    return {
      message: res.error.errors,
    };
  }
  return {
    message: res.success,
  };
};
