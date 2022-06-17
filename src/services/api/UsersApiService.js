import { BaseApiService } from './core/BaseApiService'

export class UsersApiService extends BaseApiService {
  baseUrl = 'user/dashboard'

  constructor({ app }) {
    super({ app, checkAuth: true })
  }

  async getAccountUsers(payload) {
    const { data } = await this.httpCall({
      method: 'post',
      url: '?request=list',
      data: payload
    })

    return data
  }

  async getPlatformStatuses() {
    const { data } = await this.httpCall({
      method: 'get',
      url: this.baseUrl + '/platform_statuses'
    })

    return data
  }
}
