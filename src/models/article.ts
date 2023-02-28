import { RestfulAddress } from '@/utils/config'
import axios from 'axios'
import { CommonReslut } from './common-result'

export class ArticleModel {
  pk = ''
  title = ''
  header = ''
  body = ''
  create_time: Date = new Date()
  update_time: Date = new Date()
  creator = ''
  keywords = ''
  description = ''
}

export class selectResultModel {
  count = 0
  list: ArticleModel[] = []
}

export async function selectArticleModels (page: number, size: number): Promise<selectResultModel> {
  let offset = (page - 1) * size
  if (offset < 0) {
    offset = 0
  }
  const response = await axios.get<CommonReslut<selectResultModel>>(RestfulAddress.ArticleService + '/article/select',
    { params: { offset, limit: size } })
  return response.data.data
}

export async function getArticleModel (pk: string): Promise<ArticleModel> {
  const response = await axios.get<CommonReslut<ArticleModel>>(RestfulAddress.ArticleService + '/article/get', { params: { pk } })
  return response.data.data
}

export class TocItem {
  title = ''
  header = 0
}
