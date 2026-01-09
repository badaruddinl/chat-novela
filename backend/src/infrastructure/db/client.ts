import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Missing DATABASE_URL for backend.");
}

export const pool = new Pool({ connectionString });
export const db = drizzle(pool);
