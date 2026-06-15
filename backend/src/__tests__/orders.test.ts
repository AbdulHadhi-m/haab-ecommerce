import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { createTestUser, createTestAdmin, createTestProduct, getAuthToken } from "./helpers";
import { orderRoutes } from "@/features/orders/routes";

const app = express();
app.use(express.json());
app.use("/orders", orderRoutes);

describe("Order Routes", () => {
  describe("POST /orders", () => {
    it("should create an order with valid stock", async () => {
      const user = await createTestUser();
      const token = getAuthToken(user._id.toString());
      const product = await createTestProduct({ stock: 10 });

      const res = await request(app)
        .post("/orders")
        .set("Authorization", `Bearer ${token}`)
        .send({
          items: [
            {
              productId: (product as any)._id.toString(),
              name: "Test Product",
              image: "https://example.com/image.jpg",
              price: 99.99,
              quantity: 2,
            },
          ],
          shippingAddress: {
            fullName: "Test User",
            phone: "1234567890",
            email: "test@example.com",
            address: "123 Test St",
            city: "Test City",
            state: "Test State",
            postalCode: "12345",
            country: "Test Country",
          },
          payment: {
            method: "cod",
          },
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
    });

    it("should reject when stock is insufficient", async () => {
      const user = await createTestUser();
      const token = getAuthToken(user._id.toString());
      const product = await createTestProduct({ stock: 1 });

      const res = await request(app)
        .post("/orders")
        .set("Authorization", `Bearer ${token}`)
        .send({
          items: [
            {
              productId: (product as any)._id.toString(),
              name: "Test Product",
              image: "https://example.com/image.jpg",
              price: 99.99,
              quantity: 5,
            },
          ],
          shippingAddress: {
            fullName: "Test User",
            phone: "1234567890",
            email: "test@example.com",
            address: "123 Test St",
            city: "Test City",
            state: "Test State",
            postalCode: "12345",
            country: "Test Country",
          },
          payment: {
            method: "cod",
          },
        });

      expect(res.status).toBe(400);
    });

    it("should reject unauthenticated requests", async () => {
      const res = await request(app).post("/orders").send({
        items: [],
        shippingAddress: {},
        payment: {},
      });

      expect(res.status).toBe(401);
    });
  });

  describe("GET /orders/my-orders", () => {
    it("should return current user's orders", async () => {
      const user = await createTestUser();
      const token = getAuthToken(user._id.toString());

      const res = await request(app)
        .get("/orders/my-orders")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("should reject unauthenticated requests", async () => {
      const res = await request(app).get("/orders/my-orders");
      expect(res.status).toBe(401);
    });
  });

  describe("GET /orders/:id", () => {
    it("should return order by id", async () => {
      const user = await createTestUser();
      const token = getAuthToken(user._id.toString());
      const product = await createTestProduct({ stock: 10 });

      const orderRes = await request(app)
        .post("/orders")
        .set("Authorization", `Bearer ${token}`)
        .send({
          items: [
            {
              productId: (product as any)._id.toString(),
              name: "Test Product",
              image: "https://example.com/image.jpg",
              price: 99.99,
              quantity: 1,
            },
          ],
          shippingAddress: {
            fullName: "Test User",
            phone: "1234567890",
            email: "test@example.com",
            address: "123 Test St",
            city: "Test City",
            state: "Test State",
            postalCode: "12345",
            country: "Test Country",
          },
          payment: {
            method: "cod",
          },
        });

      const orderId = orderRes.body.data._id;

      const res = await request(app)
        .get(`/orders/${orderId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data._id).toBe(orderId);
    });

    it("should return 404 for non-existent order", async () => {
      const user = await createTestUser();
      const token = getAuthToken(user._id.toString());

      const res = await request(app)
        .get(`/orders/${new mongoose.Types.ObjectId().toString()}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(404);
    });
  });

  describe("PATCH /orders/:id/status", () => {
    it("should update order status as admin", async () => {
      const user = await createTestUser();
      const userToken = getAuthToken(user._id.toString());
      const admin = await createTestAdmin();
      const adminToken = getAuthToken(admin._id.toString(), "admin");
      const product = await createTestProduct({ stock: 10 });

      const orderRes = await request(app)
        .post("/orders")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          items: [
            {
              productId: (product as any)._id.toString(),
              name: "Test Product",
              image: "https://example.com/image.jpg",
              price: 99.99,
              quantity: 1,
            },
          ],
          shippingAddress: {
            fullName: "Test User",
            phone: "1234567890",
            email: "test@example.com",
            address: "123 Test St",
            city: "Test City",
            state: "Test State",
            postalCode: "12345",
            country: "Test Country",
          },
          payment: {
            method: "cod",
          },
        });

      const orderId = orderRes.body.data._id;

      const res = await request(app)
        .patch(`/orders/${orderId}/status`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ orderStatus: "confirmed" });

      expect(res.status).toBe(200);
      expect(res.body.data.orderStatus).toBe("confirmed");
    });

    it("should reject non-admin users", async () => {
      const user = await createTestUser();
      const token = getAuthToken(user._id.toString());

      const res = await request(app)
        .patch(`/orders/${new mongoose.Types.ObjectId().toString()}/status`)
        .set("Authorization", `Bearer ${token}`)
        .send({ orderStatus: "confirmed" });

      expect(res.status).toBe(403);
    });
  });
});
