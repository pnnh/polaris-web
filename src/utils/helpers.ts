// 获取服务端以json格式传输的状态数据
export function getJsonData<T>(name = 'data'): T {
  const dataEl = document.getElementById(name)
  if (!dataEl) {
    return {} as T
  }
  return JSON.parse(dataEl.innerText)
}

export function setLocalStorage(key: string, value: any) {
  const stringValue = JSON.stringify(value)
  localStorage.setItem(key, stringValue)
}

export function getLocalStorage(key: string): any {
  const stringValue = localStorage.getItem(key) ?? 'null'
  return JSON.parse(stringValue)
}


export function generatorRandomString(length: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}


export class Pagination {
  totalCount: number = 0
  pageSize: number = 8
  currentPage: number = 1
  startPage: number = 1
  endPage: number = 1
  previousPage: number = 1
  nextPage: number = 1
  maxPage: number = 1
}

export function calcPagination(currentPage: number, totalCount: number, pageSize: number): Pagination {
  if (currentPage < 1) {
    currentPage = 1
  }
  let maxPage = Math.floor(totalCount / pageSize)
  if (totalCount % pageSize != 0) {
    maxPage += 1
  }
  if (currentPage > maxPage) {
    currentPage = maxPage
  }
  let startPage = currentPage - 5
  if (startPage < 1) {
    startPage = 1
  }
  let endPage = currentPage + 5
  if (endPage > maxPage) {
    endPage = maxPage
  }
  let previousPage = currentPage - 1
  let nextPage = currentPage + 1

  let pagination = new Pagination()
  pagination.totalCount = totalCount
  pagination.pageSize = pageSize
  pagination.currentPage = currentPage
  pagination.startPage = startPage
  pagination.endPage = endPage
  pagination.previousPage = previousPage
  pagination.nextPage = nextPage
  pagination.maxPage = maxPage
  return pagination
}