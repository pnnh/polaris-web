import { UserNav } from '@/components/user'
import Link from 'next/link'
import './global.css'
import styles from './layout.module.css'

// 隔几秒重新验证下数据
export const revalidate = 10

export default async function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  const headerNav = await loadHeaderNav()
  return (
    <html>
      <head>
        <title>北极星</title>
        <base href="/" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
        <meta name="renderer" content="webkit" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body>
        <header></header>
        <nav className={styles.navHeader}>
          {headerNav}
        </nav>
        <main>{children}</main>
        <footer>
        </footer>
      </body>
    </html>
  )
}

async function loadHeaderNav () { 
  return <div className={styles.headerRow}>
    <div className={styles.headerMenu}>
      <div className={styles.headerLeft}>
        <Link className={styles.navLink} href='/'>首页</Link>&nbsp;
        <Link className={styles.navLink} href='/'>文章</Link>
      </div>
      <div className={styles.headerRight}>
        <UserNav/>
      </div>
    </div>
  </div>
}
