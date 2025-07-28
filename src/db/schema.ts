import {
  pgTable,
  serial,
  text,
  numeric,
  boolean,
  date,
} from "drizzle-orm/pg-core";
import { z } from "zod";

export const income = pgTable("income", {
  id: serial("id").primaryKey(),
  amount: numeric("amount").notNull(),
  date: date("date").notNull(),
  clientName: text("client_name").notNull(),
  nif: text("nif").notNull(),
  description: text("description"),
  withVat: boolean("with_vat").notNull(),
});

export const incomeSchema = z.object({
  amount: z.number().positive(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  clientName: z.string().min(1, "Client name is required"),
  nif: z.string().length(9, "NIF must be 9 characters"),
  description: z.string().optional(),
  withVat: z.boolean(),
});
