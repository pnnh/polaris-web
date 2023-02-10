import './global.css'
import styles from './layout.module.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
        <link type="text/css" rel="stylesheet" href="/src/client/index.scss"></link>
      </head>
      <body>
        <header className={styles.navHeader}>
          <NavHeader />
        </header>
        <main>{children}</main>
        <script type='module' src='/src/client/index.tsx'></script>
      </body>
    </html>
  )
}

function NavHeader() {
  return <div className={styles.headerRow}>
    <div>
      <a className={styles.navLink} href='/'>首页</a>&nbsp;
      <a className={styles.navLink} href='/'>文章</a>
    </div>
  </div>
}