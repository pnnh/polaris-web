'use client';

import Prism from 'prismjs'

class ArticleElement extends HTMLElement {
  constructor() {
    super() 
    console.debug('polaris-article constructor')
    // 代码块语法高亮
    const codes = this.getElementsByTagName('code')
    if (codes) {
      Array.from(codes).forEach(e => {
        if (!(e instanceof HTMLElement)) {
          return
        }
        const code = e.innerText
        const language = e.className.replace('language-', '')
        console.debug('code language: ', language)
        if (language) {
          let html = code
          if (Prism.languages[language]) {
            html = Prism.highlight(code, Prism.languages[language], language)
          }
          e.innerHTML = html
        }
      })
    }
  }
}

window.customElements.define('polaris-article', ArticleElement)

