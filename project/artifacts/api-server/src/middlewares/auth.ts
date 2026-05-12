import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "@workspace/supabase/server";
import type { User } from "@supabase/supabase-js";

// Extend Express Request to carry the authenticated user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

/**
 * requireAuth middleware
 * Reads the Bearer token from Authorization header, verifies it
 * with Supabase, and attaches the user to req.user.
 * Returns 401 if missing or invalid.
 */
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized: missing Bearer token" });
    return;
  }

  const token = authHeader.slice(7);

  const user = await verifyToken(token);
  if (!user) {
    res.status(401).json({ error: "Unauthorized: invalid or expired token" });
    return;
  }

  req.user = user;
  next();
}

/**
 * optionalAuth middleware
 * Same as requireAuth but does NOT reject unauthenticated requests.
 * Useful for routes that behave differently when logged in.
 */
export async function optionalAuth(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    const user = await verifyToken(token);
    if (user) req.user = user;
  }
  next();
}
