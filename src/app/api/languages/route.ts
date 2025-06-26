import { getLanguages } from "@/actions/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const languages = await getLanguages();
    return NextResponse.json(languages, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching languages" },
      { status: 500 }
    );
  }
} 