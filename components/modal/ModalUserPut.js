'use client'

import { useEffect, useState } from "react"
import Form from "../form/Form"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import Input from "../form/Input"
import { RiLockPasswordLine } from "react-icons/ri"
import Select, { Option } from "../form/Select"
import { BsPersonVideo } from "react-icons/bs"
import { ERROR_FETCH_MESSAGE, ERROR_SERVER_TYPE } from "@/constants"
import dynamic from "next/dynamic"
import { ButtonIcon } from "../ActionButton"
const Modal = dynamic(() => import("./Modal"), { ssr: false })

export default function ModalUserPut({user, roles}) {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [errs, setErrs] = useState("")

  const router = useRouter();

  const { register, handleSubmit, setError, formState: {errors}, reset } = useForm({
    shouldFocusError: true
  });

  useEffect(() => {!open&&(reset(),setErrs(""),setLoading(false))}, [open])

  const onSubmit = handleSubmit(async (dataForm) => {
    setLoading(true)
    const res = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(dataForm)
    }).finally(() => setLoading(false))

    if(res?.ok) {
      setOpen(false)
      return router.refresh();
    }

    const data = await res.json();

    if(data?.noAdmin) {
      toast.error(data?.message)
      router.push("/dashboard/usuarios")
      return;
    }
    if(data?.equals) {
      toast.error(data?.message)
      setOpen(false)
      return;
    }

    setErrs(data?.message)
    if(data.message === ERROR_FETCH_MESSAGE) return
    setError("passwordAdmin", ERROR_SERVER_TYPE)
  })

  return (
    <>
      <ButtonIcon
        variant="edit"
        action={() => setOpen(true)}
      />
      {open&&(
        <Modal size="md" onClose={() => setOpen(false)} title="Actualizar Usuario" >
          <Form onSubmit={onSubmit} errs={errs} loading={loading} btnLabel="Actualizar Usuario" >
            <Select
              label="Rol"
              inicial={user.rol}
              validated={register("rol")}
            >
              {roles.map((item,index) => <Option key={index} value={item.id} text={item.descripcion} />)}
            </Select>
            <Input
              type="password"
              label="Contraseña del Administrador"
              placeholder="Ingresa la Contraseña del Administrador"
              validated={register("passwordAdmin", {
                required: "La Contraseña Administrador es requerida",
                minLength: {
                  value: 8,
                  message: "La Contraseña debe tener al menos 8 caracteres",
                }
              })}
              errors={errors.passwordAdmin?.message}
            />
          </Form>
        </Modal>
      )}
    </>
  )
}
