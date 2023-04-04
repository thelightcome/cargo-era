import { Context } from '@nuxt/types'

type messageType = number[]

export interface IErrorHandler {
  onError(code: keyof messageType): void
}

/**
 * @class
 * @name ErrorHandler
 * @classdesc services to handle errors
 */
export default class ErrorHandler {
  /**
   * @property {messageType} message list of error codes and related messages
   */
  private message: messageType = [500]

  /**
   * @constructor
   * @param {Context['error']} $error error method from Nuxt context
   */
  constructor(private $error: Context['error']) {}

  /**
   * Process error caught from axios
   * @param code error code
   */
  onError(code: keyof messageType) {
    if (this.message.includes(Number(code))) {
      this.$error({
        statusCode: Number(code),
      })
    }
  }
}
