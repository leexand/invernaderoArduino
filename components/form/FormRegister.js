'use client'

import { useForm } from "react-hook-form";
import Form from "./Form";
import Input from "./Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ERROR_FETCH_MESSAGE, ERROR_SERVER_TYPE } from "@/constants";

export default function FormRegister() {

  const router = useRouter();
  const [errs, setErrs] = useState("");

  const { register, handleSubmit, setError, formState: {errors}, watch, reset } = useForm({
    shouldFocusError: true
  });

  const onSubmit = handleSubmit( async (dataForm) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(dataForm)
    })

    if(res.ok) {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(dataForm),
      })

      if(res.ok) {
        router.refresh()
        return router.push("/dashboard")
      }
      return router.push("/")
    }

    const data = await res.json();
    setErrs(data.message)
    if(data.message === ERROR_FETCH_MESSAGE) return
    setError("email", ERROR_SERVER_TYPE)
  })

  return (
    <Form onSubmit={onSubmit} errs={errs} doubleCol btnLabel="Registrarse" >
      <Input
        doubleCol
        type="text"
        label="Nombre"
        placeholder="Ingrese el nombre"
        validated={register("name", {
          required: "El Nombre es requerido",
          minLength: {
            value: 3,
            message: "El Nombre debe tener al menos 3 caracteres",
          },
          maxLength: {
            value: 30,
            message: "El Nombre debe tener maximo 30 caracteres"
          }
        })}
        errors={errors.name?.message}
      />
      <Input
        doubleCol
        type="text"
        label="Correo"
        placeholder="Ingrese el correo"
        validated={register("email", {
          required: "El correo es requerido",
          maxLength: {
            value: 40,
            message: "El Correo debe tener maximo 40 caracteres"
          },
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
      <Input
        type="password"
        label="Validar Contraseña"
        placeholder="Ingrese la contraseña"
        validated={register("comfirmPassword", {
          validate: (value) => value === watch("password") || "Las Contraseñas no son iguales",
        })}
        errors={errors.comfirmPassword?.message}
      />
    </Form>
  )
}
