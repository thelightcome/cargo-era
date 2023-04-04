import {
  ICreateProduct,
  IAddProductToCard,
  IGetProducts,
} from 'types/product.types'

import Base from './base'

export default class Product extends Base {
  async trackProduct(barcode: string) {
    return await this.PUT(`/products/${barcode}`, {}, {})
  }

  async addProduct(body: ICreateProduct) {
    return await this.POST(`/products`, body, {})
  }

  async addProductToCard(body: IAddProductToCard) {
    console.log(body)
    await new Promise((resolve, reject) => {
      try {
        resolve('scsc')
      } catch (err) {
        reject(err)
      }
    })
    // return await this.PUT(`/products/card/${body.trackCode}`, body, {})
  }

  async getProducts(body: IGetProducts) {
    console.log(body)
    await new Promise((resolve, reject) => {
      try {
        resolve('scsc')
      } catch (err) {
        reject(err)
      }
    })
  }
}
