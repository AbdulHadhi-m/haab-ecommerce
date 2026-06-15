import { IBaseDocument } from "@/shared/interfaces";
import { Types } from "mongoose";

export interface IReview extends IBaseDocument {
  product: Types.ObjectId;
  user: Types.ObjectId;
  rating: number;
  title?: string;
  comment?: string;
  isVerifiedPurchase: boolean;
}
