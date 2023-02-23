
import styles from './page.module.css'
import React from 'react'
import { ArticleModel, getArticleModel, TocItem } from '@/models/article' 
import { BuildBodyHtml } from '@/components/client/article-body'
import { markdownToStele } from '@/utils/markdown'
import { SteleBody } from '@/models/stele'


export async function LoadArticleReadPage (pk: string) {
  const articleModel = await getArticleModel(pk)
  if (articleModel == null) {
    return <div>文章不存在</div>
  }
  const articleHtml = await renderArticle(articleModel)

  return articleHtml
}

async function renderArticle (article: ArticleModel) {

  const tocList: TocItem[] = []
  tocList.push({ title: article.title, header: 0 })
  let bodyObject: SteleBody | null = null
  if (article.header === 'stele') {
    bodyObject = JSON.parse(article.body)
  } else if (article.header === 'markdown') {
    bodyObject = markdownToStele(article.body)
  }
  if (!bodyObject) {
    return <div>暂不支持的文章类型</div>
  }

  return <div className={styles.articleInfo}>
        <div className={styles.articleTitle}>{article.title}</div>
        <div className={styles.articleBody}>
            <BuildBodyHtml tocList={tocList} node={bodyObject} />
        </div>
    </div>
}


export default async function Home ({ params }: { params: { pk: string } }) {
  const articlePage = await LoadArticleReadPage(params.pk)
  return articlePage
}

