export interface CreateOrderInput {
  items: OrderItemInput[];
  shippingAddress: ShippingAddressInput;
  paymentMethod: string;
}

export interface OrderItemInput {
  productId: string;
  quantity: number;
  size: string;
  color: string;
  price: number;
}

export interface ShippingAddressInput {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}
