import { Product } from "../product.model";
import type { IProduct } from "../interfaces";
import type { CreateProductInput, UpdateProductInput, ProductFilter, ProductSort } from "../types";

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
    const products = await Product.find(filter as Record<string, unknown>)
      .populate("category", "name slug")
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select("-__v")
      .lean();
    return products as unknown as IProduct[];
  },

  async countAll(filter: ProductFilter): Promise<number> {
    return Product.countDocuments(filter as Record<string, unknown>);
  },

  async findBySlug(slug: string): Promise<IProduct | null> {
    const product = await Product.findOne({ slug })
      .populate("category", "name slug")
      .select("-__v")
      .lean();
    return product as unknown as IProduct | null;
  },

  async findById(id: string): Promise<IProduct | null> {
    const product = await Product.findById(id)
      .populate("category", "name slug")
      .select("-__v")
      .lean();
    return product as unknown as IProduct | null;
  },

  async update(id: string, input: UpdateProductInput): Promise<IProduct | null> {
    const product = await Product.findByIdAndUpdate(id, input, { new: true, runValidators: true })
      .populate("category", "name slug")
      .select("-__v")
      .lean();
    return product as unknown as IProduct | null;
  },

  async delete(id: string): Promise<IProduct | null> {
    const product = await Product.findByIdAndDelete(id).lean();
    return product as unknown as IProduct | null;
  },
};
