import { query } from "@/utils/db";
import { NextResponse } from "next/server"
import bcrypt from "bcrypt";
import { ENCRYPT_NUMBER, ERROR_FETCH_MESSAGE } from "@/constants";


export async function POST(req) {
  try {
    const {name, email, password} = await req.json();

    const validEmail = await query({
      query: "SELECT nombre FROM usuarios WHERE email=?",
      values: [email]
    })

    if(validEmail.length >= 1) {
      return NextResponse.json({message: "El Correo ya esta registrado"}, {status: 400});
    }

    const passHash = await bcrypt.hash(password, ENCRYPT_NUMBER);

    const user = await query({
      query: "INSERT INTO usuarios(nombre, email, pass) VALUES(?,?,?)",
      values: [name, email, passHash]
    })

    return NextResponse.json({message: "success"}, {status: 200})
  }
  catch (error) {
    console.log(error.message)
    return NextResponse.json({message: ERROR_FETCH_MESSAGE}, {status: 500})
  }
}
