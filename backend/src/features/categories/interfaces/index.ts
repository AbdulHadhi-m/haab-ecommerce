import { IBaseDocument } from "@/shared/interfaces";

export interface ICategory extends IBaseDocument {
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
}
