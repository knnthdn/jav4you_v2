import mongoose from "mongoose";

export async function connectMongoDB() {
  try {
    if (!process.env?.MONGODB_URI) throw Error("invalid uri");

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected successfully...");
  } catch (error) {
    console.log(error);
  }
}
