import React from "react";
import { HeaderPartial } from "./partial/header";
import { MetaPartial } from "./partial/meta";
import { Async, useAsync } from "react-async"
import { selectArticleModels, ArticleModel } from "@/models/article";
import { Loading } from "@/components/loading";
import { Error } from "@/components/error";

export async function LoadHomePage() {
    const piclist = await LoadPictureList()
    return <html lang="zh">
        <head>
            <title>北极星</title>
        </head>
        <body className="home">
            <div>
                <HeaderPartial />
                <main>
                    {piclist}

                </main>
            </div>
            <script type='module' src='/src/entry-client.tsx'></script>
        </body>
    </html>
}

export async function LoadPictureList() {
    const models = await selectArticleModels()

    return <div className="picture-list">
        {models.map((model) => {
            return <PictureItem key={model.pk} model={model} />
        })
        }
    </div>
}

function PictureItem(props: { model: ArticleModel }) {

    return <div className="article-item">
        <div data-name="{{.Pk}}" data-type="object">
            <div className="article-link">
                <a href="/article/read/FHIlDUBAEAA">{props.model.title}</a>
            </div>
            <div className="article-description">

            </div>
            <div className="article-info">
                <span className="update-time"><i className="ri-time-line"></i></span>
                <span className="views"><i className="ri-eye-line"></i></span>
            </div>
        </div>
    </div>
}
