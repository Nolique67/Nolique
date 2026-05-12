import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

// For Supabase: use the "Transaction mode" connection pooler URL (port 6543)
// for serverless/edge, or the direct connection URL (port 5432) for long-lived servers.
// Set DATABASE_URL in your environment to your Supabase connection string.
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Copy it from your Supabase project → Settings → Database."
  );
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Supabase requires SSL in production
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export const db = drizzle(pool, { schema });

export * from "./schema";
