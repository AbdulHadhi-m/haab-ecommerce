import { config } from "@/config";
export { auditLogger } from "./audit";

interface LogEntry {
  timestamp: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  metadata?: Record<string, unknown>;
}

export const logger = {
  info(message: string, metadata?: Record<string, unknown>): void {
    logEntry({ level: "info", message, metadata });
  },
  warn(message: string, metadata?: Record<string, unknown>): void {
    logEntry({ level: "warn", message, metadata });
  },
  error(message: string, metadata?: Record<string, unknown>): void {
    logEntry({ level: "error", message, metadata });
  },
  debug(message: string, metadata?: Record<string, unknown>): void {
    if (config.nodeEnv === "development") {
      logEntry({ level: "debug", message, metadata });
    }
  },
};

function logEntry(entry: Omit<LogEntry, "timestamp">): void {
  const timestamp = new Date().toISOString();
  const logLine = {
    timestamp,
    service: "haab-backend",
    environment: config.nodeEnv,
    ...entry,
  };

  if (entry.level === "error") {
    console.error(JSON.stringify(logLine));
  } else if (entry.level === "warn") {
    console.warn(JSON.stringify(logLine));
  } else {
    console.log(JSON.stringify(logLine));
  }
}
