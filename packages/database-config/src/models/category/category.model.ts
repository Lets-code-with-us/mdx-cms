import mongoose from "mongoose";
import { Category } from "../../schemas/category.schema.js";

export class CategoryModel {
  /**
   * Create a new category
   * @param title The title of the category
   * @returns Created category or error
   */
  static async createCategory(title: string) {
    try {
      // Check if category with same title already exists
      const existingCategory = await (Category as any).findOne({ title });

      if (existingCategory) {
        return {
          success: false,
          message: "Category with this title already exists",
          data: null,
        };
      }

      // Create new category
      const newCategory = await (Category as any).create({ title });

      return {
        success: true,
        message: "Category created successfully",
        data: newCategory,
      };
    } catch (error) {
      console.error("Error creating category:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to create category",
        data: null,
      };
    }
  }

  /**
   * Get a category by ID
   * @param id The category ID
   * @returns The category if found
   */
  static async getCategory(id: string) {
    try {
      // Validate if provided ID is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
          success: false,
          message: "Invalid category ID format",
          data: null,
        };
      }

      const category = await (Category as any).findById(id);

      if (!category) {
        return {
          success: false,
          message: "Category not found",
          data: null,
        };
      }

      return {
        success: true,
        message: "Category retrieved successfully",
        data: category,
      };
    } catch (error) {
      console.error("Error getting category:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to get category",
        data: null,
      };
    }
  }

  /**
   * Get all categories
   * @returns Array of all categories
   */
  static async getAllCategories() {
    try {
      const categories = await (Category as any).find().sort({ createdAt: -1 });

      return {
        success: true,
        message: "Categories retrieved successfully",
        data: categories,
      };
    } catch (error) {
      console.error("Error getting all categories:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to get categories",
        data: null,
      };
    }
  }

  /**
   * Update a category by ID
   * @param id The category ID
   * @param title The new title
   * @returns The updated category
   */
  static async updateCategory(id: string, title: string) {
    try {
      // Validate if provided ID is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
          success: false,
          message: "Invalid category ID format",
          data: null,
        };
      }

      // Check if new title already exists in another category
      const existingCategory = await (Category as any).findOne({
        title,
        _id: { $ne: id },
      });

      if (existingCategory) {
        return {
          success: false,
          message: "Another category with this title already exists",
          data: null,
        };
      }

      const updatedCategory = await (Category as any).findByIdAndUpdate(
        id,
        { title },
        { new: true },
      );

      if (!updatedCategory) {
        return {
          success: false,
          message: "Category not found",
          data: null,
        };
      }

      return {
        success: true,
        message: "Category updated successfully",
        data: updatedCategory,
      };
    } catch (error) {
      console.error("Error updating category:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to update category",
        data: null,
      };
    }
  }

  /**
   * Delete a category by ID
   * @param id The category ID to delete
   * @returns Success/failure information
   */
  static async deleteCategory(id: string) {
    try {
      // Validate if provided ID is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
          success: false,
          message: "Invalid category ID format",
          data: null,
        };
      }

      const deletedCategory = await (Category as any).findByIdAndDelete(id);

      if (!deletedCategory) {
        return {
          success: false,
          message: "Category not found",
          data: null,
        };
      }

      return {
        success: true,
        message: "Category deleted successfully",
        data: deletedCategory,
      };
    } catch (error) {
      console.error("Error deleting category:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to delete category",
        data: null,
      };
    }
  }
}
