export interface CreateOrderItemInput {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface CreateOrderInput {
  items: CreateOrderItemInput[];
  shippingAddress: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: "cod" | "razorpay" | "stripe";
}

export interface UpdateOrderStatusInput {
  orderStatus: string;
}
