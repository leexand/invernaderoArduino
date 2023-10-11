import { COOKIE_NAME, ERROR_FETCH_MESSAGE } from "@/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);

    if(!token) return NextResponse.json("");

    cookieStore.delete(COOKIE_NAME)
    return NextResponse.json({message: "success"}, {status: 200})
  }
  catch (error) {
    console.log(error.message)
    return NextResponse.json({message: ERROR_FETCH_MESSAGE}, {status: 500})
  }
}
