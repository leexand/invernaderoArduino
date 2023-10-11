'use client'

import { useForm } from "react-hook-form";
import Form from "./Form";
import Input from "./Input";
import { ERROR_FETCH_MESSAGE, ERROR_SERVER_TYPE } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormLogin() {

  const router = useRouter();
  const [errs, setErrs] = useState("");

  const { register, handleSubmit, setError, formState: {errors} } = useForm({
    shouldFocusError: true
  });

  const onSubmit = handleSubmit( async (dataForm) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(dataForm),
    })

    if(res.ok) {
      router.refresh()
      return router.push("/dashboard")
    }

    const data = await res.json();
    setErrs(data.message)
    if(data.message === ERROR_FETCH_MESSAGE) return
    setError("email", ERROR_SERVER_TYPE)
    setError("password", ERROR_SERVER_TYPE)
  })

  return (
    <Form onSubmit={onSubmit} btnLabel="Iniciar Sesión" >
      <Input
        type="text"
        label="Correo"
        placeholder="Ingrese el correo"
        validated={register("email", {
          required: "El correo es requerido",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]*@[a-zA-Z0-9*-]([\.]?[a-zA-Z0-9*-])*(\.\w{2,4})+$/,
            message: "Ingrese un Correo valido"
          }
        })}
        errors={errors.email?.message}
      />
      <Input
        type="password"
        label="Contraseña"
        placeholder="Ingrese la contraseña"
        validated={register("password", {
          required: "La Contraseña es requerida",
          minLength: {
            value: 8,
            message: "La Contraseña debe tener al menos 8 caracteres",
          }
        })}
        errors={errors.password?.message}
      />
    </Form>
  )
}
