import { query, queryAndTotal } from "@/utils/db";
import { getTokenValue } from "@/utils/token";
console.log('=');
export async function getUsers(start, limit, search) {
  const claims = getTokenValue();
  return await queryAndTotal({
    start, limit,
    name: "users",
    table: "usuarios",
    columns: "usuarios.id, usuarios.nombre, usuarios.email, usuarios.rol, roles.descripcion",
    where: `WHERE usuarios.id!=${claims.ardp} AND usuarios.id!=1 ${search?`AND (usuarios.nombre LIKE '%${search}%' or usuarios.email LIKE '%${search}%' or usuarios.rol=(SELECT id FROM roles WHERE descripcion LIKE '%${search}%'))`:""}`,
    join: "INNER JOIN roles ON usuarios.rol=roles.id"
  })
}

export async function getRoles() {
  const roles = await query({query: "SELECT * FROM roles"})
  return roles;
}
