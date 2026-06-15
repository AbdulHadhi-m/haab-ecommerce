import { productRepository } from "../repositories";
import { BadRequestError, NotFoundError } from "@/shared/errors";
import { generateSlug } from "@/shared/utils";
import { uploadService } from "@/features/uploads/services";
import { CreateProductInput, UpdateProductInput, ProductQuery, ProductFilter, ProductSort } from "../types";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 100;

export const productService = {
  async create(input: CreateProductInput) {
    const slug = input.slug ?? generateSlug(input.name);

    const existing = await productRepository.findBySlug(slug);
    if (existing) {
      throw new BadRequestError("A product with this slug already exists");
    }

    const product = await productRepository.create({ ...input, slug });
    return product;
  },

  async getAll(query: ProductQuery) {
    const page = Math.max(1, parseInt(query.page ?? String(DEFAULT_PAGE), 10) || DEFAULT_PAGE);
    const limit = Math.min(
      MAX_LIMIT,
      Math.max(1, parseInt(query.limit ?? String(DEFAULT_LIMIT), 10) || DEFAULT_LIMIT),
    );
    const skip = (page - 1) * limit;

    const filter: ProductFilter = {};
    const sort: ProductSort = { createdAt: -1 };

    filter.isActive = true;

    if (query.category) {
      filter.category = query.category;
    }

    if (query.featured === "true") {
      filter.featured = true;
    }

    if (query.minPrice || query.maxPrice) {
      filter.price = {};
      if (query.minPrice) {
        filter.price.$gte = parseFloat(query.minPrice);
      }
      if (query.maxPrice) {
        filter.price.$lte = parseFloat(query.maxPrice);
      }
    }

    if (query.search) {
      filter.$text = { $search: query.search };
    }

    if (query.sort) {
      const sortField = query.sort.startsWith("-") ? query.sort.slice(1) : query.sort;
      const sortOrder = query.sort.startsWith("-") ? -1 : 1;

      const allowedSortFields = ["price", "createdAt", "name", "rating"];
      if (allowedSortFields.includes(sortField)) {
        delete sort.createdAt;
        sort[sortField] = sortOrder;
      }
    }

    const [products, total] = await Promise.all([
      productRepository.findAll(filter, sort, skip, limit),
      productRepository.countAll(filter),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: products,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  },

  async getBySlug(slug: string) {
    const product = await productRepository.findBySlug(slug);
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    return product;
  },

  async update(id: string, input: UpdateProductInput) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new NotFoundError("Product not found");
    }

    if (input.slug && input.slug !== product.slug) {
      const existing = await productRepository.findBySlug(input.slug);
      if (existing) {
        throw new BadRequestError("A product with this slug already exists");
      }
    }

    const updated = await productRepository.update(id, input);
    if (!updated) {
      throw new NotFoundError("Product not found");
    }
    return updated;
  },

  async delete(id: string) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new NotFoundError("Product not found");
    }

    const publicIds = product.images
      .filter((img) => img.publicId)
      .map((img) => img.publicId);

    if (publicIds.length > 0) {
      await uploadService.deleteMultipleImages(publicIds);
    }

    await productRepository.delete(id);
  },
};
