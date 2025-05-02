import { Auth } from "../../schemas/auth.schema.js";
import bcrypt from "bcryptjs";

export class AuthModel {
  static async createNewUser(
    email: string,
    password: string,
    organization: string
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

      const hashedPassword = await bcrypt.hash(password, 10);

      const createUser = new Auth({
        email,
        password: hashedPassword,
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

  static async signinUser(email:string,password:string){
    try {
        
    } catch (error) {
        return{
            code:500,
            message:error
        }
    }
  }


}
