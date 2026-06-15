export interface AddToCartInput {
  productId: string;
  quantity: number;
  size: string;
  color: string;
}

export interface UpdateCartItemInput {
  quantity: number;
}
