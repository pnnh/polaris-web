
export class RestfulAddress {
  static get ArticleService () {
    if (isNodejs()) {
      return process.env.SERVER
    }
    return ''
  }

  static get AuthUrl () {
    // multiverse授权登录服务地址
    return process.env.NEXT_PUBLIC_LOGIN_URL
  }
}

export function isDev () {
  return process.env.NEXT_PUBLIC_ENV === 'development'
}

export function isNodejs () {
  return typeof window === 'undefined'
}

export function isBrowser () {
  return typeof window !== 'undefined'
}
