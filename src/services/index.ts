import { Context } from '@nuxt/types'
import ErrorHandler, { IErrorHandler } from './common/ErrorHandler'
import HttpClient, { IHttpClient } from './common/HttpClient'
import FormValidation, { IFormValidation } from './FormValidation'
import FilterObject from './FilterObject'

type commonServices = {
  error: IErrorHandler
  http: IHttpClient
}

export type servicesType = {
  common: commonServices
  formValidation: IFormValidation
  filterObject: typeof FilterObject
}

const services = (ctx: Context): servicesType => ({
  common: {
    error: new ErrorHandler(ctx.error),
    http: new HttpClient(ctx.$axios),
  },
  formValidation: new FormValidation(),
  filterObject: FilterObject,
})

export default services
