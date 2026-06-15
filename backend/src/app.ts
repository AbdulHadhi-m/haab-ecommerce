import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { config } from "./config";
import { routes } from "./routes";
import { errorHandler } from "./middlewares/error-handler";
import { notFoundHandler } from "./middlewares/not-found";
import { globalLimiter, authLimiter } from "./shared/security/rateLimit";
import { corsOptions } from "./shared/security/cors";
import { helmetConfig } from "./shared/security/helmet";
import { mongoSanitizeMiddleware, xssCleanMiddleware, sanitizeInput } from "./shared/security/sanitize";

const app = express();

app.use(helmetConfig);

app.use(cors(corsOptions));

app.use(morgan(config.nodeEnv === "production" ? "combined" : "dev"));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(cookieParser());

app.use(mongoSanitizeMiddleware);
app.use(xssCleanMiddleware);
app.use(sanitizeInput);

app.use("/api", globalLimiter);

app.use("/api/v1/auth", authLimiter);

app.use("/api/v1", routes);

app.all("*", notFoundHandler);
app.use(errorHandler);

export { app };
