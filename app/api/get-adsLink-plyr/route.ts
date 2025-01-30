import { connectMongoDB } from "@/lib/mongodb";
import J4You from "@/model/jav4you";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    const connectToDB = await connectMongoDB();

    if (connectToDB.status === 500) {
      return NextResponse.json({
        status: connectToDB.status,
        msg: connectToDB.msg,
      });
    }

    const data = await J4You.find({ type: "adsLinkPlayer" });

    if (data[0].tokenList.length === 0)
      return NextResponse.json(
        { message: "No ads link available", activeLink: "" },
        { status: 404 }
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
