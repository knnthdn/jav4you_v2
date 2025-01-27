import { connectMongoDB } from "@/lib/mongodb";
import J4You from "@/model/jav4you";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    const data = await J4You.find({ type: "adsLink" });

    if (data[0].tokenList.length === 0)
      return NextResponse.json(
        { message: "No ads link available", activeLink: "" },
        { status: 404 }
      );

    await J4You.findOneAndUpdate(
      { type: "adsLink" },
      {
        active:
          data[0].active >= data[0].tokenList.length - 1
            ? 0
            : data[0].active + 1,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return NextResponse.json(
      { activeLink: data[0].tokenList[data[0].active] },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured", error },
      { status: 500 }
    );
  }
}
