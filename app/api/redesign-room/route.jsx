import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log("Received data:", data);

    // Process the data here (e.g., call an AI image generation service)

    return NextResponse.json({ result: "AI image generation successful", data });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Error processing request" }, { status: 500 });
  }
}