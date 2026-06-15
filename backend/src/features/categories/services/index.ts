import { categoryRepository } from "../repositories";
import { BadRequestError, NotFoundError } from "@/shared/errors";
import { generateSlug } from "@/shared/utils";
import { CreateCategoryInput, UpdateCategoryInput } from "../types";

export const categoryService = {
  async create(input: CreateCategoryInput) {
    const slug = input.slug ?? generateSlug(input.name);

    const existing = await categoryRepository.findBySlug(slug);
    if (existing) {
      throw new BadRequestError("A category with this slug already exists");
    }

    const category = await categoryRepository.create({ ...input, slug });
    return category;
  },

  async getAll(isActive?: boolean) {
    return categoryRepository.findAll(isActive);
  },

  async getBySlug(slug: string) {
    const category = await categoryRepository.findBySlug(slug);
    if (!category) {
      throw new NotFoundError("Category not found");
    }
    return category;
  },

  async update(id: string, input: UpdateCategoryInput) {
    const category = await categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundError("Category not found");
    }

    if (input.slug && input.slug !== category.slug) {
      const existing = await categoryRepository.findBySlug(input.slug);
      if (existing) {
        throw new BadRequestError("A category with this slug already exists");
      }
    }

    const updated = await categoryRepository.update(id, input);
    if (!updated) {
      throw new NotFoundError("Category not found");
    }
    return updated;
  },

  async delete(id: string) {
    const category = await categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundError("Category not found");
    }

    await categoryRepository.delete(id);
  },
};
