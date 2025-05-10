import { Auth } from "../../schemas/auth.schema";
import { hashedPassword, checkPassword } from "../../utils/hashingPassword";


export class AuthModel {
  static async createNewUser(
    email: string,
    password: string,
    organization: string,
  ) {
    try {
      const findExistingUser = await (Auth as any).findOne({
        email: email,
      });
      if (findExistingUser || findExistingUser.organization === organization) {
        return {
          code: 409,
          message: "User already exist or organization",
        };
      }

      const hashedpassword = await hashedPassword(password);
      if (hashedpassword.code === 500) {
        return {
          code: hashedpassword.code,
          message: hashedpassword.message,
        };
      }

      const createUser = new Auth({
        email,
        password: hashedpassword.payload,
        organization,
      });

      await createUser.save();
      return {
        code: 201,
        message: "Created",
      };
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  }

  static async signinUser(email: string, password: string, jwtSecret: string) {
    try {
      const checkUserExist = await (Auth as any).find({
        email: email,
      });

      if (!checkUserExist) {
        return {
          code: 404,
          message: "User not found",
        };
      }

      const checkpassword = await checkPassword(
        password,
        checkUserExist.password,
      );

      if (checkpassword.code == 500) {
        return {
          code: checkpassword.code,
          message: checkpassword.message,
        };
      }

      if (!checkpassword.payload) {
        return {
          code: 402,
          message: "Invalid Password",
        };
      }

    

      return {
        code: 200,
        message: "auth",
      };
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  }
}
