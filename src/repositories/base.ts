import {
  IHttpClient,
  IHttpData,
  IHttpParams,
  IHttpResponse,
} from 'services/common/HttpClient'

/**
 * @class
 * @name Base
 * @classdesc Base repository class that contains method to make CRUD calls
 */
export default class Base {
  /**
   * @constructor
   * @param {IHttpClient} $http service to create http calls
   */
  constructor(private $http: IHttpClient) {}

  /**
   * GET method
   * @param {string} url - url to call
   * @param {IHttpParams} params - params to pass
   * @returns
   */
  protected async GET<T>(
    url: string,
    params: IHttpParams
  ): Promise<IHttpResponse<T>> {
    return await this.$http.get(url, params)
  }

  /**
   * POST method
   * @param {string} url - url to call
   * @param {IHttpParams} params - params to pass
   * @returns
   */
  protected async POST<T>(
    url: string,
    data: IHttpData,
    params: IHttpParams
  ): Promise<IHttpResponse<T>> {
    return await this.$http.post(url, data, params)
  }

  /**
   * PUT method
   * @param {string} url - url to call
   * @param {IHttpParams} params - params to pass
   * @returns
   */
  protected async PUT<T>(
    url: string,
    data: IHttpData,
    params: IHttpParams
  ): Promise<IHttpResponse<T>> {
    return await this.$http.put(url, data, params)
  }

  /**
   * DELETE method
   * @param {string} url - url to call
   * @param {IHttpParams} params - params to pass
   * @returns
   */
  protected async DELETE<T>(
    url: string,
    params: IHttpParams
  ): Promise<IHttpResponse<T>> {
    return await this.$http.delete(url, params)
  }
}
