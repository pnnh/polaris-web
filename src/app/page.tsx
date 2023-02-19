import React from 'react' 
import { selectArticleModels, ArticleModel } from '@/models/article'
import styles from './page.module.css'
import { calcPagination } from '@/utils/helpers'
import Link from 'next/link'

export async function LoadPictureList (page = 1) {
  const pageSize = 8
  const result = await selectArticleModels(page, pageSize)
  const pagination = calcPagination(page, result.count, pageSize)
  
  return <div className={styles.articleContainer}>
      <div className={styles.articleList}>
        {result.list.map((model) => {
          return <PictureItem key={model.pk} model={model} />
        })
        }
      </div>
      <div className={styles.pageList}>
        {pagination.previousPage >= 1
          ? (<Link href={'/' + pagination.previousPage}
          className={styles.pageItem}>上一页</Link>)
          : (<></>)}
        {[...Array(pagination.endPage - pagination.startPage + 1).keys()].map((_, index) => {
          return <Link key={index} href={'/' + (pagination.startPage + index)}
            className={pagination.currentPage === pagination.startPage + index
              ? styles.pageItemActive
              : styles.pageItem}>{pagination.startPage + index}</Link>
        })}
        {pagination.nextPage <= pagination.maxPage
          ? (<Link href={'/' + pagination.nextPage}
          className={styles.pageItem}>下一页</Link>)
          : (<></>)}
      </div>
    </div>
}

export function PictureItem (props: { model: ArticleModel }) {

  return <div className={styles.articleItem}>
    <div>
      <div className={styles.articleTitle}> 
        <Link className={styles.articleLink} href={'/article/read/' + props.model.pk}>{props.model.title}</Link>
      </div>
      <div className={styles.articleDescription}>
        {props.model.description}
      </div>
    </div>
  </div>
}

export default async function Home () {
  const piclist = await LoadPictureList()
  return piclist
}
