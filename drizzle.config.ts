import "dotenv/config";
import { Config, defineConfig } from "drizzle-kit";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.url(),
});

const env = envSchema.parse(process.env);

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
    ssl: false,
  },
} satisfies Config);
