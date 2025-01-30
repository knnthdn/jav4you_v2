import mongoose from "mongoose";

export async function connectMongoDB() {
  try {
    if (!process.env?.MONGODB_URI) throw Error("invalid uri");

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb connected successfully")
    return{ status: 200, msg: "MongoDb Connected Successfully..,"}
  } catch (error) {
    console.log("Failed to connect MongoDb")
    return{ status: 500, msg: "Cant Connect to MongoDb...", error}
  }
}
