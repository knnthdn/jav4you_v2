import { connectMongoDB } from "@/lib/mongodb";
import J4You from "@/model/jav4you";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    const connectToDB = await connectMongoDB();

    if (connectToDB.status === 500) {
      return NextResponse.json({
        proxy: "https://goodproxy.tymgorvez.workers.dev/",
      });
    }

    const res = await J4You.findOne({ type: "proxyLink" });

    return NextResponse.json({ proxy: res }, { status: 200 });
  } catch {
    return NextResponse.json({
      proxy: "https://goodproxy.tymgorvez.workers.dev/",
    });
  }
}
