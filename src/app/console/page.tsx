 
import { cookies } from 'next/headers'

export default function Page () {
  const cookieStore = cookies()
  const session = cookieStore.get('session')
  
  console.log('session', session)
  
  return <div > 控制台首页
  </div>
}
