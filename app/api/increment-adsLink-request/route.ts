import { connectMongoDB } from "@/lib/mongodb";
import J4You from "@/model/jav4you";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const data = await J4You.find({ type: "adsLink" });
    await J4You.findOneAndUpdate(
      { type: "adsLink" },
      { requestMade: data[0].requestMade + 1 }
    );

    return NextResponse.json({
      mgs: "success",
      total: data[0].requestMade + 1,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured", error },
      { status: 500 }
    );
  }
}
