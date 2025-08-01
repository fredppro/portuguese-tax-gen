import { z } from "zod";
import { GET, POST } from "@/lib/api";
import { expenseSchema } from "@/db/schema/schema";

// Type inference
export type Expense = z.infer<typeof expenseSchema>;

export async function getAllExpenses(): Promise<Expense[]> {
  const data = await GET<unknown>("/api/expense");
  return z.array(expenseSchema).parse(data);
}

export async function createExpense(data: Expense): Promise<Expense> {
  const res = await POST<unknown>("/api/expense", data);
  return expenseSchema.parse(res);
}
