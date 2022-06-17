import { UsersApiService } from './UsersApiService'

export const $api = (app) => {
  return {
    users: new UsersApiService({ app })
  }
}
