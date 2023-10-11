import CardPages from '@/components/cards/CardPages'
import FormLogin from '@/components/form/FormLogin'
import Link from 'next/link'

export const metadata = {
  title: 'Inicio de sesión',
}

export default function Login() {
  console.log(process.env.DB_NAME);
  return (
    <CardPages size="md" title="Iniciar Sesión">
      <FormLogin />
      <p className="pt-3 text-white">No tienes una cuenta? <Link href="/registro" className="text-green-600" >Registrate</Link></p>
    </CardPages>
  )
}
