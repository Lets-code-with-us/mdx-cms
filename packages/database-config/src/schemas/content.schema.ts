import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Content = mongoose.models.Content || mongoose.model("Content", contentSchema);
export type ContentDocument = mongoose.Document & {
  title: string;
  slug: string;
  content: string;
  category: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};
