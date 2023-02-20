import { RestfulAddress } from '@/utils/config'
import axios from 'axios'
import { CommonReslut } from './common-result'

export class UserModel {
  nickname = ''
}

export async function checkLogined (): Promise<UserModel> {
  const response = await axios.get<CommonReslut<UserModel>>(RestfulAddress.ArticleService + '/server/account/logined')
  return response.data.data
}
