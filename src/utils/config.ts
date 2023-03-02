
export class RestfulAddress {
  static get ServerUrl () {
    if (isNodejs()) {
      return process.env.SERVER
    }
    return ''
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
