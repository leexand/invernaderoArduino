import { COOKIE_MAX_AGE_INT, COOKIE_MAX_AGE_TEXT, COOKIE_NAME, ERROR_FETCH_MESSAGE } from "@/constants"
import { query } from "@/utils/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server"
import { SignJWT } from "jose";
import { serialize } from "cookie";

export async function POST(req) {
  try {
    const {email, password} = await req.json();

    const user = await query({
      query: "SELECT * FROM usuarios WHERE email=?",
      values: [email]
    })
    if(user.length === 1) {
      const passCorrect =await bcrypt.compare(password, user[0].pass);

      if(passCorrect) {
        const token = await new SignJWT({ ardp: user[0].id, rppl: user[0].rol })
        .setIssuedAt()
        .setExpirationTime(COOKIE_MAX_AGE_TEXT)
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));

        const serialized = serialize(COOKIE_NAME, token, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: COOKIE_MAX_AGE_INT,
          path: "/"
        });

        return new NextResponse(JSON.stringify({ message: "success" }), {
          status: 200,
          headers: { "Set-Cookie": serialized }
        })
      }
    }

    return NextResponse.json({ message: "Correo o Contraseña incorrectos" }, { status: 400 });
  }
  catch (error) {
    console.log(error.message)
    return NextResponse.json({message: error}, {status: 500})
  }
}
