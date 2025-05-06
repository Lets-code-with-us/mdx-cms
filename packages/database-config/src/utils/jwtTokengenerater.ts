import jwt from "jsonwebtoken";

export const genrateJWTToken = async (
  payload: object,
  secret: string,
  expiry: string | number | undefined,
) => {
  try {
    const token = jwt.sign(payload, secret as string, {
      expiresIn: expiry as string,
    });
    return {
      code: 200,
      payload: token,
    };
  } catch (error) {
    return {
      code: 500,
      message: "Failed to gnerate the token",
    };
  }
};
