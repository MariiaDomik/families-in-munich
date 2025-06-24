import { getAllUsers } from "@/actions/user";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const users = await getAllUsers();
      
      return NextResponse.json(users, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Error fetching users" },
        { status: 500 }
      );
    }
  }