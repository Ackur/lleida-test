import { UsersApiService } from './UsersApiService'
import { SmsApiService } from './SmsApiService'


export const $api = (app) => {
  return {
    users: new UsersApiService({ app }),
    sms: new SmsApiService({ app })
  }
}
