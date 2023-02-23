import { loadHeaderNav } from '@/components/nav' 

export default async function ArticleLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  const headerNav = await loadHeaderNav()
  return ( 
        <><header></header>
        {headerNav}
        <main>{children}</main> </>
  )
}
