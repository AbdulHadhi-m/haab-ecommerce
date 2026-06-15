import { config } from "./index";

export const databaseConfig = {
  uri: config.mongodbUri,
  options: {
    maxPoolSize: 10,
    minPoolSize: 2,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    heartbeatFrequencyMS: 10_000,
    retryWrites: true,
    w: "majority" as const,
  },
};
