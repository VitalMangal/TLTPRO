import { ManufacturersResponseType } from "./Manufacturers";
import { OpenModalType } from "./Modals";

export type ProductErrorType = {
  status: number,
  message: string,
}

export type ProductType = {
	id: number,
	name: string,
	quantity: number,
	price: string,
	photoUrl: string,
	manufacturerId: number,
};

export type ProductAddType = {
  name: string,
  quantity: number,
  price: string,
  image: File | null,
  manufacturerId: number,
}

export type ProductRequestParams = {
  limit: number,
  page: number,
  q: string,
}

export type ProductPatchType = {
  id: number,
  product: FormData,
}

export type ProductResponseDeleteType = {
  message: string,
}

export type ProductsFormFlexPropsType = {
  productsList: ProductType[],
  openModal: OpenModalType,
};

export type ProductsFormGridPropsType = {
  productsList: ProductType[],
};

export type CardPropsType = {
  product: ProductType,
  manufList: ManufacturersResponseType[],
};


