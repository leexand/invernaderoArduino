import { COOKIE_NAME } from "@/constants"
import { decodeJwt } from "jose"
import { cookies } from "next/headers"

export function getTokenValue() {
  const cookieStore = cookies()
  const token = cookieStore.get(COOKIE_NAME)
  if(!token) return undefined
  return decodeJwt(token.value)
}
