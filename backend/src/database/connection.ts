import mongoose from "mongoose";
import { databaseConfig } from "../config/database";

const MAX_RETRIES = 5;
const RETRY_BASE_DELAY = 1000;

export async function connectDatabase(): Promise<void> {
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    attempt++;
    try {
      await mongoose.connect(databaseConfig.uri, databaseConfig.options);
      console.log("MongoDB connected successfully");
      return;
    } catch (error) {
      const delay = Math.min(RETRY_BASE_DELAY * Math.pow(2, attempt - 1), 10_000);
      console.error(
        `MongoDB connection attempt ${attempt}/${MAX_RETRIES} failed — retrying in ${delay}ms`
      );
      if (attempt >= MAX_RETRIES) {
        console.error("All MongoDB connection retries exhausted");
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.connection.close();
  console.log("MongoDB disconnected");
}

mongoose.connection.on("error", (err) => {
  console.error("MongoDB runtime error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected unexpectedly");
});
