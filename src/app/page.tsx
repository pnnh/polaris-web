import React from 'react' 
import { selectArticleModels, ArticleModel } from '@/models/article'
import styles from './page.module.css'
import { calcPagination } from '@/utils/helpers'

export async function LoadPictureList (page = 1) {
  const pageSize = 8
  const result = await selectArticleModels(page, pageSize)
  const pagination = calcPagination(page, result.count, pageSize)
  
  return <div>
    <div>
      <div className={styles.articleList}>
        {result.list.map((model) => {
          return <PictureItem key={model.pk} model={model} />
        })
        }
      </div>
      <div className={styles.pageList}>
        {pagination.previousPage >= 1
          ? (<a href={'/' + pagination.previousPage}
          className={styles.pageItem}>上一页</a>)
          : (<></>)}
        {[...Array(pagination.endPage - pagination.startPage + 1).keys()].map((_, index) => {
          return <a key={index} href={'/' + (pagination.startPage + index)}
            className={pagination.currentPage === pagination.startPage + index
              ? styles.pageItemActive
              : styles.pageItem}>{pagination.startPage + index}</a>
        })}
        {pagination.nextPage <= pagination.maxPage
          ? (<a href={'/' + pagination.nextPage}
          className={styles.pageItem}>下一页</a>)
          : (<></>)}
      </div>
    </div>
  </div>
}

export function PictureItem (props: { model: ArticleModel }) {

  return <div className={styles.articleItem}>
    <div>
      <div className={styles.articleTitle}>
        <a className={styles.articleLink} href={'/article/read/' + props.model.pk}>{props.model.title}</a>
      </div>
      <div className={styles.articleDescription}>
        {props.model.description}
      </div>
    </div>
  </div>
}

export default async function Home () {
  const piclist = await LoadPictureList()
  return <div>
    {piclist}
  </div>
}
