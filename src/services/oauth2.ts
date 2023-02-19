import { ArticleModel } from '@/models/article'
import { CommonReslut } from '@/models/common-result'
import { RestfulAddress } from '@/utils/config'
import axios from 'axios'

export async function loginFinish (code: string) {
  const response = await axios.get(RestfulAddress.ArticleService + '/restful/login/finish', { params: { code } })
  return response.data.data
}
