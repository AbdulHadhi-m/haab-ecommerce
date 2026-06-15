import { IBaseDocument } from "@/shared/interfaces";
import { Types } from "mongoose";

export interface IProductImage {
  url: string;
  publicId: string;
}

export interface IProductRatings {
  average: number;
  count: number;
}

export interface IProduct extends IBaseDocument {
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice: number | null;
  images: IProductImage[];
  stock: number;
  sku: string;
  category: Types.ObjectId;
  featured: boolean;
  rating: number;
  ratings: IProductRatings;
  isActive: boolean;
}
