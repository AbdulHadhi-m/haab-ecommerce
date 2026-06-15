import { Category } from "../category.model";
import { ICategory } from "../interfaces";
import { CreateCategoryInput, UpdateCategoryInput } from "../types";

export const categoryRepository = {
  async create(input: CreateCategoryInput): Promise<ICategory> {
    return Category.create(input);
  },

  async findAll(isActive?: boolean): Promise<ICategory[]> {
    const filter: Record<string, unknown> = {};
    if (isActive !== undefined) filter.isActive = isActive;
    return Category.find(filter).sort({ name: 1 });
  },

  async findBySlug(slug: string): Promise<ICategory | null> {
    return Category.findOne({ slug });
  },

  async findById(id: string): Promise<ICategory | null> {
    return Category.findById(id);
  },

  async update(id: string, input: UpdateCategoryInput): Promise<ICategory | null> {
    return Category.findByIdAndUpdate(id, input, { new: true, runValidators: true });
  },

  async delete(id: string): Promise<ICategory | null> {
    return Category.findByIdAndDelete(id);
  },

  async countByField(field: string, value: unknown): Promise<number> {
    return Category.countDocuments({ [field]: value });
  },
};
