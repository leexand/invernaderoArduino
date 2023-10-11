import Sidebar from "@/components/navs/sidebar"
import { ALL_ROLES_VISITED, NavItems } from "@/constants";
import { getTokenValue } from "@/utils/token";

export const metadata = {
  title: 'Titulo',
}

function getNavLinks() {
  const claims = getTokenValue();

  if(!claims) return []

  if(claims.rppl === 1) return NavItems;

  let links = NavItems.filter((item) => {
    if(item.rol === ALL_ROLES_VISITED) return item;
  })
  return links;
}

export default function DashLayout({ children }) {
  return (
    <main className="flex">
      <Sidebar NavItems={getNavLinks()} />
      <div className='px-3 py-4 w-full h-full relative'>
        {children}
      </div>
    </main>
  )
}
