import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { income } from "./schema/schema";

export const db = drizzle(process.env.DATABASE_URL!);

async function logSeededData() {
  try {
    console.log("Fetching seeded data...");
    const seededData = await db.select().from(income);
    console.log("Seeded Data:", seededData);
  } catch (error) {
    console.error("Error fetching seeded data:", error);
  }
}

logSeededData();
