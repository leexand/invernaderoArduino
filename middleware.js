import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { COOKIE_NAME } from './constants'

export async function middleware(req) {
  const token = req.cookies.get(COOKIE_NAME)

  if(token === undefined) {
    return NextResponse.redirect(new URL("/", req.url))
  }
  try {
    const { payload } = await jwtVerify(token.value, new TextEncoder().encode(process.env.JWT_SECRET))

    if(payload.rppl === 1) {
      return NextResponse.next();
    }

    if(payload.rppl !== 1 && req.nextUrl.pathname.startsWith("/dashboard/usuarios")) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }
  catch (error) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
