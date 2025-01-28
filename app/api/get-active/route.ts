import { connectMongoDB } from "@/lib/mongodb";
import J4You from "@/model/jav4you";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const connectToDB =  await connectMongoDB();

    if(connectToDB.status === 500){
      return NextResponse.json({status: connectToDB.status,msg:connectToDB.msg})
    }

    const data = await J4You.find({ type: "tokenList" });
    const { active, tokenList } = data[0];

    return NextResponse.json(
      { activeToken: tokenList[active] },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured", error },
      { status: 500 }
    );
  }
}
