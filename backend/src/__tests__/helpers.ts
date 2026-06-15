import express from "express";
import { User } from "@/features/auth/auth.model";
import { Product } from "@/features/products/product.model";
import { Category } from "@/features/categories/category.model";
import { generateAccessToken, generateRefreshToken } from "@/features/auth/utils/token";
import type { IUser } from "@/features/auth/interfaces";

export function createApp() {
  const app = express();
  app.use(express.json());
  return app;
}

export async function createTestUser(overrides: Partial<IUser> = {}): Promise<IUser> {
  const userData = {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
    role: "customer" as const,
    isActive: true,
    ...overrides,
  };
  return User.create(userData);
}

export async function createTestAdmin(): Promise<IUser> {
  return createTestUser({
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  });
}

export function getAuthToken(userId: string, role: string = "customer"): string {
  return generateAccessToken({ userId, role });
}

export function getRefreshToken(userId: string, role: string = "customer"): string {
  return generateRefreshToken({ userId, role });
}

export async function createTestCategory(name: string = "Test Category") {
  return Category.create({
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    description: "Test description",
    isActive: true,
  });
}

export async function createTestProduct(overrides: Record<string, unknown> = {}) {
  const category = await createTestCategory();
  return Product.create({
    name: "Test Product",
    slug: "test-product",
    description: "Test product description",
    price: 99.99,
    stock: 10,
    sku: "TST-001",
    category: (category as any)._id,
    images: [{ url: "https://example.com/image.jpg", publicId: "test" }],
    ...overrides,
  });
}
