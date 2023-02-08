import React from "react";
import { HeaderPartial } from "./partial/header";
import { MetaPartial } from "./partial/meta";
import { Async, useAsync } from "react-async"
import { selectArticleModels, ArticleModel } from "@/models/article";
import { Loading } from "@/components/loading";
import { Error } from "@/components/error";

export async function LoadHomePage2() {
    const piclist = await LoadPictureList()
    return <html lang="zh">
        <head>
            <title>北极星</title>
            <link type="text/css" rel="stylesheet" href="/src/client/index.scss"></link>
        </head>
        <body className="home-page">
            <div>
                <HeaderPartial />
                <main>
                    {piclist}
                </main>
            </div>
            <script type='module' src='/src/client/index.tsx'></script>
        </body>
    </html>
}

export async function LoadHomePage() {
    const piclist = await LoadPictureList()
    return piclist
}

export async function LoadPictureList() {
    const models = await selectArticleModels()

    return <div className="fx-grid">
        <div className="ms-Grid-col ms-sm12 ms-xl8">
            <div className="article-list">
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
