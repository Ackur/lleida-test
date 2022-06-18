import { BaseApiService } from './core/BaseApiService'

export class SmsApiService extends BaseApiService {
  constructor({ app }) {
    super({ app, checkAuth: true })
  }

  async send(payload) {
    const data = await this.httpCall(
      {
        method: 'post',
        url: 'https://api.lleida.net/sms/v2/',
        data: payload
      },
      { errorNotice: false }
    )

    return data
  }
}
