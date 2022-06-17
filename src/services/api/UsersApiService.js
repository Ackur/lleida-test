import { BaseApiService } from './core/BaseApiService'

export class UsersApiService extends BaseApiService {
  constructor({ app }) {
    super({ app, checkAuth: true })
  }

  async getAccountUsers(payload) {
    const data = await this.httpCall({
      method: 'post',
      url: '?request=list',
      data: payload
    })

    return data
  }
}
