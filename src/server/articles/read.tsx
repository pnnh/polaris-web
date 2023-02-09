import React from "react";
import { HeaderPartial } from "../partial/header";
import { selectArticleModels, ArticleModel, getArticleModel, buildBodyHtml, TocItem } from "@/models/article";
import { marked } from "marked";

export async function LoadArticleReadPage(pk: string) {
    const articleModel = await getArticleModel(pk)
    if (articleModel == null) {
        return <div>文章不存在</div>
    }
    const articleHtml = await renderArticle(articleModel)

    return articleHtml;
}

async function renderArticle(article: ArticleModel) {
    let bodyHtml = "";
    let tocList: TocItem[] = [];
    tocList.push({ title: article.title, header: 0 });
    if (article.header == 'stele') {
        var bodyObject = JSON.parse(article.body);
        bodyHtml = buildBodyHtml(tocList, bodyObject)
    } else if (article.header == 'markdown') {
        bodyHtml = marked.parse(article.body);
    } else {
        return <div>暂不支持的文章类型</div>
    }
    return <article>
        <div className="article-info">
            <div>{article.title}</div>
            <div>
                <div className="article-body" dangerouslySetInnerHTML={{ __html: bodyHtml }} ></div>
            </div>
        </div>
    </article>
}
