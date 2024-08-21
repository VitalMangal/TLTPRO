export interface IError {
  status: number,
  message: string,
}

export interface IProductResponse {
  id: number,
  name: string,
  quantity: number,
  price: number,
  image: any, // заменить
  manufacturerId: number,
}

export interface IProductAdd {
  name: string,
  quantity: number,
  price: number,
  image: any, // заменить
  manufacturerId: number,
}

export interface IProductRequestParams {
  limit: number,
  page: number,
  q: string,
}

export interface IProductPatch {
  id: number,
  product: IProductAdd,
}

export interface IProductResponseDelete {
  message: string,
}
