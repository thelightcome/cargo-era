import { Context } from '@nuxt/types'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

export type IHttpParams = AxiosRequestConfig['params']
export type IHttpData = AxiosRequestConfig['data']
export interface IHttpResponse<T> extends AxiosResponse {
  data: T
}
export interface IHttpClient {
  get<T>(url: string, params?: IHttpParams): Promise<IHttpResponse<T>>
  post<T>(
    url: string,
    data: IHttpData,
    params: IHttpParams
  ): Promise<IHttpResponse<T>>
  patch<T>(
    url: string,
    data: IHttpData,
    params: IHttpParams
  ): Promise<IHttpResponse<T>>
  put<T>(
    url: string,
    data: IHttpData,
    params: IHttpParams
  ): Promise<IHttpResponse<T>>
  delete<T>(url: string, params: IHttpParams): Promise<IHttpResponse<T>>
}

export default class HttpClient implements IHttpClient {
  constructor(private $http: Context['$axios']) {}

  async get(url: string, params?: IHttpParams) {
    try {
      return await this.$http.$get(url, params)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async post(url: string, data: IHttpData, params: IHttpParams) {
    try {
      return await this.$http.$post(url, data, params)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async patch(url: string, data: IHttpData, params: IHttpParams) {
    try {
      return await this.$http.$post(url, data, params)
    } catch (e) {
      return e
    }
  }

  async put(url: string, data: IHttpData, params: IHttpParams) {
    try {
      return await this.$http.$put(url, data, params)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async delete(url: string, params: IHttpParams) {
    try {
      return await this.$http.$delete(url, params)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
