import { IBaseDocument } from "@/shared/interfaces";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export interface ICart extends IBaseDocument {
  userId: string;
  items: CartItem[];
}
