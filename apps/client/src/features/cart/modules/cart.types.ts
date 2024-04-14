export interface ICartProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export interface ICartProducts {
  id: string;
  quantity: number;
  totalPrice: number;
  product: ICartProduct;
}
