import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL is not configured");
}

const globalForPostgres = globalThis as unknown as {
    pool: Pool | undefined;
};

export const pool =
    globalForPostgres.pool ??
    new Pool({
        connectionString,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
    });

if (process.env.NODE_ENV !== "production") {
    globalForPostgres.pool = pool;
}