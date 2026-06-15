import { Product } from "../product.model";
import { IProduct } from "../interfaces";
import { CreateProductInput, UpdateProductInput, ProductFilter, ProductSort } from "../types";

export const productRepository = {
  async create(input: CreateProductInput): Promise<IProduct> {
    return Product.create(input);
  },

  async findAll(
    filter: ProductFilter,
    sort: ProductSort,
    skip: number,
    limit: number,
  ): Promise<IProduct[]> {
    return Product.find(filter as Record<string, unknown>)
      .populate("category", "name slug")
      .sort(sort)
      .skip(skip)
      .limit(limit);
  },

  async countAll(filter: ProductFilter): Promise<number> {
    return Product.countDocuments(filter as Record<string, unknown>);
  },

  async findBySlug(slug: string): Promise<IProduct | null> {
    return Product.findOne({ slug })
      .populate("category", "name slug");
  },

  async findById(id: string): Promise<IProduct | null> {
    return Product.findById(id)
      .populate("category", "name slug");
  },

  async update(id: string, input: UpdateProductInput): Promise<IProduct | null> {
    return Product.findByIdAndUpdate(id, input, { new: true, runValidators: true })
      .populate("category", "name slug");
  },

  async delete(id: string): Promise<IProduct | null> {
    return Product.findByIdAndDelete(id);
  },
};
