import { logger } from "./index";
import { Request } from "express";

interface AuditEntry {
  action: string;
  userId?: string;
  role?: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
}

export const auditLogger = {
  log(entry: AuditEntry): void {
    logger.info(`Audit: ${entry.action} on ${entry.resource}`, {
      type: "audit",
      ...entry,
    });
  },

  fromRequest(req: Request, action: string, resource: string, details?: Record<string, unknown>): AuditEntry {
    return {
      action,
      userId: req.user?.id,
      role: req.user?.role,
      resource,
      details,
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    };
  },
};
