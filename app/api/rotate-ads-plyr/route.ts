import { connectMongoDB } from "@/lib/mongodb";
import J4You from "@/model/jav4you";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function POST() {
  try {
    const connectToDB = await connectMongoDB();

    if (connectToDB.status === 500) {
      return NextResponse.json({
        status: connectToDB.status,
        msg: connectToDB.msg,
      });
    }

    const data = await J4You.findOne({ type: "adsLinkPlayer" });

    await J4You.findOneAndUpdate(
      { type: "adsLinkPlayer" },
      {
        active: data.active >= data.tokenList.length - 1 ? 0 : data.active + 1,
        $inc: { requestMade: 1 },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return NextResponse.json({ msg: `${data.active}` }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured", error },
      { status: 500 }
    );
  }
}
