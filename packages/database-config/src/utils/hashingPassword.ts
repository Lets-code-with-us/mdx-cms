import bcrypt from "bcryptjs";

export const hashedPassword = async (password: string) => {
  try {
    const hashingPass = await bcrypt.hash(password, 10);
    return {
      code: 200,
      payload: hashingPass,
    };
  } catch (error) {
    return {
      code: 500,
      message: "Error will hashing the password",
    };
  }
};

export const checkPassword = async (
  password: string,
  hashedPassword: string,
) => {
  try {
    const comparePassword = await bcrypt.compare(password, hashedPassword);
    return {
      code: 200,
      payload: comparePassword,
    };
  } catch (error) {
    return {
      code: 500,
      message: "Comparing password failed",
    };
  }
};
