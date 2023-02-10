// 获取服务端以json格式传输的状态数据
export function getJsonData<T> (name = 'data'): T {
  const dataEl = document.getElementById(name)
  if (!dataEl) {
    return {} as T
  }
  return JSON.parse(dataEl.innerText)
}

export function setLocalStorage (key: string, value: any) {
  const stringValue = JSON.stringify(value)
  localStorage.setItem(key, stringValue)
}

export function getLocalStorage (key: string): any {
  const stringValue = localStorage.getItem(key) ?? 'null'
  return JSON.parse(stringValue)
}


export function generatorRandomString (length: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}