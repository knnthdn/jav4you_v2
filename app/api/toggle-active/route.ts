import { connectMongoDB } from "@/lib/mongodb";
import J4You from "@/model/jav4you";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const connectToDB =  await connectMongoDB();

    if(connectToDB.status === 500){
      return NextResponse.json({status: connectToDB.status,msg:connectToDB.msg})
    }

    const data = await J4You.find({ type: "tokenList" });
    const toggleTo =
      data[0].active >= data[0].tokenList.length - 1 ? 0 : data[0].active + 1;

    await J4You.findOneAndUpdate(
      { type: "tokenList" },
      { active: toggleTo, requestMade: data[0].requestMade + 1 },
      {
        new: true,
        runValidators: true,
      }
    );

    return NextResponse.json(
      { results: `Toggled to ${toggleTo}` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured", error },
      { status: 500 }
    );
  }
}
