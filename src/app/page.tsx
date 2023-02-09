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

  return <div className="fx-grid">
    <div className="ms-Grid-col ms-sm12 ms-xl8">
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

  return <div className="article-item">
    <div>
      <div className="article-link">
        <a href={"/article/read/" + props.model.pk}>{props.model.title}</a>
      </div>
      <div className="article-description">
        {props.model.description}
      </div>
      <div className="article-info">
        <span className="update-time"><i className="ri-time-line"></i></span>
        <span className="views"><i className="ri-eye-line"></i></span>
      </div>
    </div>
  </div>
}

export default async function Home() {
  const homePage = LoadHomePage();
  return homePage;
}
