import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { createTestUser, createTestAdmin, createTestProduct, createTestCategory, getAuthToken } from "./helpers";
import { productRoutes } from "@/features/products/routes";

const app = express();
app.use(express.json());
app.use("/products", productRoutes);

describe("Product Routes", () => {
  describe("GET /products", () => {
    it("should list all products", async () => {
      await createTestProduct();
      await createTestProduct({ name: "Product 2", slug: "product-2", sku: "TST-002" });

      const res = await request(app).get("/products");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(2);
    });

    it("should paginate results", async () => {
      const products = Array.from({ length: 15 }, (_, i) => ({
        name: `Product ${i}`,
        slug: `product-${i}`,
        sku: `TST-${String(i).padStart(3, "0")}`,
      }));
      await Promise.all(products.map((p) => createTestProduct(p)));

      const res = await request(app).get("/products?page=1&limit=10");

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(10);
      expect(res.body.meta).toBeDefined();
    });

    it("should filter by category", async () => {
      const category = await createTestCategory("Electronics");
      await createTestProduct({ category: (category as any)._id });
      await createTestProduct({ name: "Other", slug: "other", sku: "TST-002" });

      const res = await request(app).get(`/products?category=${(category as any)._id.toString()}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].category.toString()).toBe((category as any)._id.toString());
    });

    it("should search products", async () => {
      await createTestProduct({ name: "iPhone", slug: "iphone", sku: "TST-001" });
      await createTestProduct({ name: "iPad", slug: "ipad", sku: "TST-002" });
      await createTestProduct({ name: "MacBook", slug: "macbook", sku: "TST-003" });

      const res = await request(app).get("/products?search=iphone");

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
    });
  });

  describe("GET /products/:slug", () => {
    it("should return product by slug", async () => {
      await createTestProduct({ slug: "test-product" });

      const res = await request(app).get("/products/test-product");

      expect(res.status).toBe(200);
      expect(res.body.data.slug).toBe("test-product");
    });

    it("should return 404 for non-existent slug", async () => {
      const res = await request(app).get("/products/non-existent");

      expect(res.status).toBe(404);
    });
  });

  describe("POST /products", () => {
    it("should create product as admin", async () => {
      const admin = await createTestAdmin();
      const token = getAuthToken(admin._id.toString(), "admin");
      const category = await createTestCategory();

      const res = await request(app)
        .post("/products")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "New Product",
          slug: "new-product",
          description: "New product description",
          price: 49.99,
          stock: 5,
          sku: "NEW-001",
          category: (category as any)._id.toString(),
        });

      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe("New Product");
    });

    it("should reject non-admin users", async () => {
      const user = await createTestUser();
      const token = getAuthToken(user._id.toString());

      const res = await request(app)
        .post("/products")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "New Product",
          slug: "new-product",
          description: "Description",
          price: 49.99,
          stock: 5,
          sku: "NEW-001",
          category: new mongoose.Types.ObjectId().toString(),
        });

      expect(res.status).toBe(403);
    });

    it("should reject unauthenticated requests", async () => {
      const category = await createTestCategory();

      const res = await request(app)
        .post("/products")
        .send({
          name: "New Product",
          slug: "new-product",
          description: "Description",
          price: 49.99,
          stock: 5,
          sku: "NEW-001",
          category: (category as any)._id.toString(),
        });

      expect(res.status).toBe(401);
    });
  });

  describe("PUT /products/:id", () => {
    it("should update product as admin", async () => {
      const admin = await createTestAdmin();
      const token = getAuthToken(admin._id.toString(), "admin");
      const product = await createTestProduct();

      const res = await request(app)
        .put(`/products/${(product as any)._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ price: 79.99 });

      expect(res.status).toBe(200);
      expect(res.body.data.price).toBe(79.99);
    });

    it("should reject non-admin users", async () => {
      const user = await createTestUser();
      const token = getAuthToken(user._id.toString());
      const product = await createTestProduct();

      const res = await request(app)
        .put(`/products/${(product as any)._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ price: 79.99 });

      expect(res.status).toBe(403);
    });
  });

  describe("DELETE /products/:id", () => {
    it("should delete product as admin", async () => {
      const admin = await createTestAdmin();
      const token = getAuthToken(admin._id.toString(), "admin");
      const product = await createTestProduct();

      const res = await request(app)
        .delete(`/products/${(product as any)._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it("should reject non-admin users", async () => {
      const user = await createTestUser();
      const token = getAuthToken(user._id.toString());
      const product = await createTestProduct();

      const res = await request(app)
        .delete(`/products/${(product as any)._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(403);
    });
  });
});
