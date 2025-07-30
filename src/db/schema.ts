import {
  pgTable,
  serial,
  text,
  numeric,
  boolean,
  date,
  timestamp,
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
  id: z.number(),
  amount: z.number().positive(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  clientName: z.string().min(1, "Client name is required"),
  nif: z.string().length(9, "NIF must be 9 characters"),
  description: z.string().optional(),
  withVat: z.boolean(),
});

export const expense = pgTable("expense", {
  id: serial("id").primaryKey(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  date: date("date").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const expenseSchema = z.object({
  id: z.number(),
  description: z.string().min(1),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: z.string().min(1),
});
