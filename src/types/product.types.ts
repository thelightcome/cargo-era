export interface ICreateProduct {
  userCode?: string
  trackCode?: string
  description: string
}

export interface IAddProductToCard {
  trackCode: string
  cardCode: string
}

export interface IProduct {
  trackCode: string
  description: string
  userCode: string
  branchDescription: string
  productDetails: [
    {
      id: 0
      createdDate: string
      branchCode: string
      branchDescription: string
    }
  ]
}

export interface IGetProducts {
  code: string
  branchGroup: number
  page: number
}
