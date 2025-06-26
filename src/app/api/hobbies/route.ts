import { getHobbies } from "@/actions/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const hobbies = await getHobbies();
    return NextResponse.json(hobbies, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching hobbies" },
      { status: 500 }
    );
  }
} 