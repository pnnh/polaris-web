import React from "react";
import { Async, useAsync } from "react-async"
import { selectArticleModels, ArticleModel } from "@/models/article";
import styles from './page.module.css'

export async function LoadHomePage() {
  const piclist = await LoadPictureList()
  return <div>
    {piclist}
  </div>
}

export async function LoadPictureList() {
  const models = await selectArticleModels()

  return <div>
    <div>
      <div className={styles.articleList}>
        {models.map((model) => {
          return <PictureItem key={model.pk} model={model} />
        })
        }
      </div>
    </div>
  </div>

}

function PictureItem(props: { model: ArticleModel }) {

  return <div className={styles.articleItem}>
    <div>
      <div className={styles.articleTitle}>
        <a className={styles.articleLink} href={"/article/read/" + props.model.pk}>{props.model.title}</a>
      </div>
      <div className={styles.articleDescription}>
        {props.model.description}
      </div>
    </div>
  </div>
}

export default async function Home() {
  const homePage = LoadHomePage();
  return homePage;
}
