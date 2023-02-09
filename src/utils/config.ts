
export class RestfulAddress {
  static get ArticleService() {
    if (isNodejs()) {
      return "http://127.0.0.1:8101";
    }
    return "";
  }
}

export function isNodejs() {
  return typeof window === "undefined";
}

export function isBrowser() {
  return typeof window !== "undefined";
}