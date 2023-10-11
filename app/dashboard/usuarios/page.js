import { getRoles, getUsers } from "@/backend/userFetch";
import { DeleteButton } from "@/components/ActionButton";
import ModalUserPut from "@/components/modal/ModalUserPut";
import Pagination from "@/components/table/Pagination";
import Search from "@/components/table/Search";

export const metadata = {
  title: 'Usuarios',
}

export default async function Usuarios({ searchParams }) {

  const page = Number(searchParams.page) || 1;
  const perPage = 11;
  const start = (page * perPage) - perPage ;
  const searchText = searchParams.search || undefined;

  const data = await getUsers(start, perPage, searchText);
  const roles = await getRoles();

  return (
    <div className="bg-zinc-400 rounded-md">
      <div className="p-3 flex justify-end items-center gap-5">
        <Search search={searchText} />
      </div>
      <div className="block w-full bg-neutral-200 dark:bg-zinc-300 p-2 overflow-x-auto overscroll-x-none">
        <table className="w-full text-left indent-2 cursor-default border-separate border-spacing-y-1 overflow-hidde">
          <thead>
            <tr>
              <th>#</th>
              <th>NOMBRE</th>
              <th>CORREO</th>
              <th>ROL</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody className="bg-neutral-100 dark:bg-zinc-200">
            {data.total>0?data.users.map((item,index) => (
              <tr key={index} className="rounded-md divide-x-[3px] divide-green-600">
                <td className="p-2">{start+index+1}</td>
                <td className="p-2">{item.nombre}</td>
                <td className="p-2">{item.email}</td>
                <td className="p-2">{item.descripcion}</td>
                <td className="p-2 flex justify-center gap-2">
                  <ModalUserPut user={{id: item.id, rol: item.rol}} roles={roles} />
                  <DeleteButton url={`/api/users/${item.id}`} />
                </td>
              </tr>
            )):(
              <tr className="rounded-md">
                <td className="px-2 py-4 text-center" colSpan={5}>
                  <h2 className="text-xl">No Hay Resultados para:</h2>
                  <h3 className="text-xl"><strong>{searchText}</strong></h3>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination perPage={perPage} total={data.total} />
    </div>
  )
}
