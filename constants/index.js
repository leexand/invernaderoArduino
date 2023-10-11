import { AiOutlineLineChart, AiOutlineUser } from "react-icons/ai";

export const ALL_ROLES_VISITED = "all"

export const NavItems = [
  {label: "Dashboard", icon: (<AiOutlineLineChart size={20} />), url: "/dashboard", rol: ALL_ROLES_VISITED},
  {label: "Usuarios", icon: (<AiOutlineUser size={20} />), url: "/dashboard/usuarios", rol: 1},
]

export const ENCRYPT_NUMBER = 12;

export const COOKIE_NAME = "sessionTk-ard";
export const COOKIE_MAX_AGE_TEXT = "1d";
export const COOKIE_MAX_AGE_INT = 60 * 60 * 24;

export const ERROR_SERVER_TYPE = { type: "custom", message: "null" };
export const ERROR_SERVER_IGNORER = "null";
export const ERROR_FETCH_MESSAGE = "Ha ocurrido un problema"
