import { RestfulAddress } from "@/utils/config";
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
    const response = await axios.get<CommonReslut<ArticleModel[]>>(RestfulAddress.ArticleService + '/restful/article/select');
    return response.data.data;
}

export async function getArticleModel(pk: string): Promise<ArticleModel> {
    const response = await axios.get<CommonReslut<ArticleModel>>(RestfulAddress.ArticleService + '/restful/article/get', { params: { pk: pk } });
    return response.data.data;
}

export class TocItem {
    title: string = "";
    header: number = 0;
}
