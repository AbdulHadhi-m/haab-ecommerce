import http from "node:http";
import { app } from "./app";
import { config } from "./config";
import { connectDatabase, disconnectDatabase } from "./database/connection";

let server: http.Server;

async function bootstrap(): Promise<void> {
  await connectDatabase();

  server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
  });

  server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE") {
      console.error(`Port ${config.port} is already in use`);
    } else {
      console.error("Server error:", error);
    }
    process.exit(1);
  });
}

async function shutdown(signal: string): Promise<void> {
  console.log(`\n${signal} received — shutting down gracefully`);

  server.close(async () => {
    console.log("HTTP server closed");
    await disconnectDatabase();
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Forced shutdown after timeout");
    process.exit(1);
  }, 30_000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", reason);
  process.exit(1);
});

bootstrap();
