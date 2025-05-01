import mongoose from "mongoose";

export const DB_CONNECTION = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log("connected");
  } catch (error) {
    await mongoose.disconnect();
    console.log(error);
  }
};
