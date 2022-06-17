import axios from 'axios'
import { handleErrors } from '@/services/api/core/handleErrors.js'

export class BaseApiService {
  baseUrl
  http
  checkAuth

  constructor({
    app,
    baseUrl = import.meta.env.VITE_API_URL,
    checkAuth = false
  }) {
    this.baseUrl = baseUrl
    this.checkAuth = checkAuth

    this.http = axios.create({
      baseURL: baseUrl,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        accept: 'application/json'
      }
    })
  }

  async httpCall(config, { errorNotice = true } = {}) {
    if (this.checkAuth) {
      this.http.defaults.headers.common.Authorization =
        localStorage.getItem('token')
    }
    try {
      const { data } = await this.http.request(config)
      if (data.status !== 'Success') {
        throw data
      }
      return data
    } catch (error) {
      const errorMessage = handleErrors(error)
      if (errorNotice && errorMessage) {
        alert(errorMessage)
      }
      throw { errorMessage, data: error }
    }
  }
}
