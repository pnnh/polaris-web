import { UserNav } from '@/components/client/user'
import Link from 'next/link' 
import styles from './nav.module.css'
 
export async function loadHeaderNav () { 
  return <nav className={styles.navHeader}> 
        <div className={styles.headerRow}>
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
    </nav> 
}
