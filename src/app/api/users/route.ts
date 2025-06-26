import { getAllUsers, getLanguages, getUsersForMap } from "@/actions/user";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { pathname, searchParams } = new URL(request.url);
  
  if (pathname.endsWith('/languages')) {
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

  // Проверяем, нужны ли пользователи для карты
  const forMap = searchParams.get('forMap');
  
  try {
    if (forMap === 'true') {
      const users = await getUsersForMap();
      return NextResponse.json(users, { status: 200 });
    } else {
      const users = await getAllUsers();
      return NextResponse.json(users, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
}