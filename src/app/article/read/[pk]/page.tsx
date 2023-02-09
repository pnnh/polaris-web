
import styles from './page.module.css';
import React from "react";
import { ArticleModel, getArticleModel, TocItem } from "@/models/article";
import { marked } from "marked";
import { BuildBodyHtml } from '@/components/code-block';

export async function LoadArticleReadPage(pk: string) {
    const articleModel = await getArticleModel(pk)
    if (articleModel == null) {
        return <div>文章不存在</div>
    }
    const articleHtml = await renderArticle(articleModel)

    return articleHtml;
}

async function renderArticle(article: ArticleModel) {

    let tocList: TocItem[] = [];
    tocList.push({ title: article.title, header: 0 });
    if (article.header == 'stele') {
        var bodyObject = JSON.parse(article.body); 

        return <div className={styles.articleInfo}>
            <div>{article.title}</div>
            <div>
                <div className="article-body">
                    <BuildBodyHtml tocList={tocList} node={bodyObject} />
                </div>
            </div>
        </div>

    } else if (article.header == 'markdown') {
        let bodyHtml = marked.parse(article.body);
        return <div className={styles.articleInfo}>
            <div>{article.title}</div>
            <div>
                <div className="article-body" dangerouslySetInnerHTML={{ __html: bodyHtml }} ></div>
            </div>
        </div>
    } else {
        return <div>暂不支持的文章类型</div>
    }
}


export default async function Home({ params }: { params: { pk: string } }) {
    const articlePage = await LoadArticleReadPage(params.pk);
    return articlePage;
}

