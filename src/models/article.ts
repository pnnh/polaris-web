import axios from "axios";
import { CommonReslut } from "./common-result";

export class ArticleModel {
    pk: string = "";
    title: string = "";
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