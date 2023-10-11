import { ERROR_FETCH_MESSAGE } from "@/constants";
import { query } from "@/utils/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server"
import { getTokenValue } from "@/utils/token";

export async function PUT(req, {params}) {
  try {

    const claims = getTokenValue()

    if(!claims) return NextResponse.json({})

    const id = Number(params.id);

    if(claims.rppl !== 1) {
      return NextResponse.json({message: "No tienes los permisos necesarios para esta operacion", noAdmin: true}, {status: 400})
    }

    if(claims.ardp === id) {
      return NextResponse.json({message: "No puedes modificar tu propio rol", equals: true}, {status: 400})
    }

    const { passwordAdmin, rol } = await req.json();

    const admin = await query({
      query: "SELECT pass FROM usuarios WHERE id=?",
      values: [(claims.ardp)]
    })

    const passCorrect = await bcrypt.compare(passwordAdmin, admin[0].pass);

    if(!passCorrect) {
      return NextResponse.json({message: "La Contraseña del Administrador es incorrecta"}, {status: 400})
    }

    const user = await query({
      query: `UPDATE usuarios SET rol=? WHERE id=?`,
      values: [rol, id]
    })

    return NextResponse.json({message: "success"}, {status: 200})
  }
  catch (error) {
    console.log(error.message)
    return NextResponse.json({message: ERROR_FETCH_MESSAGE}, {status: 500})
  }
}

export async function DELETE(req, {params}) {
  try {
    const user = await query({
      query: `DELETE FROM usuarios WHERE id=?`,
      values: [params.id]
    })

    return NextResponse.json({message: "success"}, {status: 200})
  }
  catch (error) {
    console.log(error.message)
    return NextResponse.json({message: ERROR_FETCH_MESSAGE}, {status: 500})
  }
}
