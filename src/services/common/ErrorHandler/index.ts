import { Context } from '@nuxt/types'

type messageType = {
  [key: number]: string
}

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
  private message: messageType = {
    400: 'Bad Request',
    401: 'Пожалуйста авторизуйтесь, чтобы выполнить это действие.',
    402: 'Для данного действия необходима оплата.',
    403: 'Действие запрещено.',
    404: 'Действие к которому вы обратились не существует.',
    405: 'Действие к которому вы обратились не поддерживается.',
    423: 'Действие к которому вы обратились заблокировано.',
    500: 'Увы, у нас возникла техническая неполадка. Пожалуйста, попробуйте позже.',
    501: 'Данное действие не может выполнится.',
    502: 'Время ожидания истекло. Попробуйте повторить действие.',
    503: 'В данный момент сервис не доступен для работы. Извиняемся, за предоставленные неудобства.',
  }

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
    if (this.message[code]) {
      console.log(this.message[code])
      // this.$error({
      //   statusCode: Number(code),
      //   message: this.message[code],
      // })
    }
  }
}
