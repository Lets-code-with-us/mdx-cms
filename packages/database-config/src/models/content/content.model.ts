import { Content } from "../../schemas/content.schema.js";

export class ContentModel {
  static async createContent(
    title: string,
    slug: string,
    content: string,
    category: string,
    published: boolean
  ) {
    try {
      const contetnTitleExists = await (Content as any).findOne({
        title: title,
      });

      if (contetnTitleExists) {
        return {
          code: 409,
          message: "Title Already exists",
        };
      }

      const createContent = await new Content({
        title,
        slug,
        content,
        category,
        published,
      });

      await createContent.save();

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

  static async updateContent(
    id: string,
    title: string,
    slug: string,
    content: string,
    category: string,
    published: boolean
  ) {
    try {
      const contentTitleExists = await (Content as any).findById(id);

      if (!contentTitleExists) {
        return {
          code: 404,
          message: "Content not exist",
        };
      }

      await (Content as any).findByIdAndUpdate(id, {
        title,
        slug,
        content,
        category,
        published,
      });
      return {
        code: 200,
        message: "Updated",
      };
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  }

  static async deleteContent(id: string) {
    try {
      const contentTitleExists = await (Content as any).findById(id);

      if (!contentTitleExists) {
        return {
          code: 404,
          message: "Content not exist",
        };
      }

      await (Content as any).findByIdAndDelete(id);
      return {
        code: 200,
        message: "Deleted",
      };
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  }

  static async getContent(id: string) {
    try {
      const content = await (Content as any).findById(id);
      if (!content) {
        return {
          code: 404,
          message: "Not Found",
        };
      }
      if (content.published === true) {
        return {
          code: 200,
          message: content,
        };
      }
      else{
        return{
          code:402,
          message:"Unpublished"
        }
      }
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  }

  static async getContents(type: string, query: string) {
    try {
      if (type === "all") {
        const content = await (Content as any).find({
          published: true,
        });
        if (!content) {
          return {
            code: 404,
            message: "No Content",
          };
        }
        return {
          code: 200,
          message: content,
        };
      }

      if (type === "category") {
        const content = await (Content as any).find({
          category: query,
          published: true,
        });

        if (!content) {
          return {
            code: 404,
            message: "No Content",
          };
        }
        return {
          code: 200,
          message: content,
        };
      }

      const content = await (Content as any).find({
        category: query,
        published: true,
      });

      if (!content) {
        return {
          code: 404,
          message: "No Content",
        };
      }
      return {
        code: 200,
        message: content,
      };
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  }
}
