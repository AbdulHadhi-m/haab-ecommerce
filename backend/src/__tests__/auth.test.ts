import request from "supertest";
import express from "express";
import cookieParser from "cookie-parser";
import { createTestUser, getAuthToken } from "./helpers";
import { authRoutes } from "@/features/auth/routes";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);

describe("Auth Routes", () => {
  describe("POST /auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app)
        .post("/auth/register")
        .send({
          name: "New User",
          email: "new@example.com",
          password: "password123",
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toHaveProperty("id");
      expect(res.body.data.user.email).toBe("new@example.com");
    });

    it("should reject duplicate email", async () => {
      await createTestUser({ email: "dup@example.com" } as any);

      const res = await request(app)
        .post("/auth/register")
        .send({
          name: "Duplicate",
          email: "dup@example.com",
          password: "password123",
        });

      expect(res.status).toBe(400);
    });
  });

  describe("POST /auth/login", () => {
    it("should login with valid credentials", async () => {
      await createTestUser({ email: "login@example.com" } as any);

      const res = await request(app)
        .post("/auth/login")
        .send({
          email: "login@example.com",
          password: "password123",
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("accessToken");
      expect(res.body.data).toHaveProperty("refreshToken");
    });

    it("should reject invalid password", async () => {
      await createTestUser({ email: "wrong@example.com" } as any);

      const res = await request(app)
        .post("/auth/login")
        .send({
          email: "wrong@example.com",
          password: "wrongpassword",
        });

      expect(res.status).toBe(401);
    });
  });

  describe("GET /auth/me", () => {
    it("should return current user", async () => {
      const user = await createTestUser();
      const token = getAuthToken(user._id.toString());

      const res = await request(app)
        .get("/auth/me")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.email).toBe("test@example.com");
    });

    it("should reject unauthenticated request", async () => {
      const res = await request(app).get("/auth/me");
      expect(res.status).toBe(401);
    });
  });
});
