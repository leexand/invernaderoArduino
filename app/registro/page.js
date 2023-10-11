import CardPages from '@/components/cards/CardPages'
import FormRegister from '@/components/form/FormRegister'
import Link from 'next/link'

export const metadata = {
  title: 'Registro',
}

export default function Login() {
  return (
    <CardPages size="md" title="Registrarse">
      <FormRegister />
      <p className="pt-3 text-white">Ya tienes una cuenta? <Link href="/" className="text-green-600" >Inicia Sesión</Link></p>
    </CardPages>
  )
}
