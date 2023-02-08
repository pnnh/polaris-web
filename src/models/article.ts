import axios from "axios";
import { CommonReslut } from "./common-result";

export class ArticleModel {
    pk: string = "";
    title: string = "";
    header: string = "";
    body: string = "";
    create_time: Date = new Date();
    update_time: Date = new Date();
    creator: string = "";
    keywords: string = "";
    description: string = "";
}

export async function selectArticleModels(): Promise<ArticleModel[]> {
    const response = await axios.get<CommonReslut<ArticleModel[]>>('http://127.0.0.1:8101/article/select');
    return response.data.data;
}

export async function getArticleModel(pk: string): Promise<ArticleModel> {
    const response = await axios.get<CommonReslut<ArticleModel>>('http://127.0.0.1:8101/article/get', { params: { pk: pk } });
    return response.data.data;
}

export class TocItem {
    title: string = "";
    header: number = 0;
}

export function buildBodyHtml(tocList: Array<TocItem>, node: any): string {

    if (!node) return "";
    var children = node["children"] as Array<object>;
    if (!children || children.length < 1) return "";

    var body = "";
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var html = buildNode(tocList, child);
        body += html;
    }

    return body;
}

function buildNode(tocList: Array<TocItem>, node: any): string {
    if (!node) return "";
    var name = node["name"] as string;
    switch (name) {
        case "paragraph":
            return buildParagraph(tocList, node);
        case "header":
            return buildHeader(tocList, node);
        case "code-block":
            return buildCodeBlock(tocList, node);
    }
    return "";
}

function buildParagraph(tocList: Array<TocItem>, node: any): string {
    if (!node) return "";
    var children = node["children"] as Array<object>;
    if (!children || children.length < 1) return "";
    var html = "<p>";
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var text = buildText(child);
        html += text;
    }
    html += "</p>";
    return html;
}

function buildHeader(tocList: Array<TocItem>, node: any): string {
    var header = node["header"] as number;
    var children = node["children"] as Array<object>;
    var html = "<h" + header + ">";
    var headerTitle = "";
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var text = buildText(child);
        headerTitle += text;
    }
    tocList.push({ title: headerTitle, header: header });
    html += headerTitle;

    html += "</h" + header + ">";
    return html;
}

function buildCodeBlock(tocList: Array<TocItem>, node: any): string {
    var language = node["language"] as string;
    var children = node["children"] as Array<object>;
    var html = "<pre><code class=\"language-" + language + "\">";
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var text = buildText(child);
        html += text;
    }
    html += "</code></pre>";
    return html;
}

function buildText(node: any): string {
    var text = node["text"] as string;
    return text;
}