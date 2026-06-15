import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { config } from "./config";
import { routes } from "./routes";
import { errorHandler } from "./middlewares/error-handler";
import { notFoundHandler } from "./middlewares/not-found";

const app = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(morgan("short"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: config.nodeEnv === "production" ? 100 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later" },
});
app.use("/api", limiter);

app.use("/api/v1", routes);

app.all("*", notFoundHandler);
app.use(errorHandler);

export { app };
