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

export class selectResultModel {
    count: number = 0;
    list: ArticleModel[] = [];
}

export async function selectArticleModels(page: number, size: number): Promise<selectResultModel> {
    let offset = (page - 1) * size;
    if (offset < 0) {
        offset = 0;
    }
    const response = await axios.get<CommonReslut<selectResultModel>>(RestfulAddress.ArticleService + '/restful/article/select',
        { params: { offset: offset, size: size } });
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
