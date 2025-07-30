import { z } from "zod";
import { GET, POST } from "@/lib/api";
import { incomeSchema } from "@/db/schema";

export type Income = z.infer<typeof incomeSchema>;

export async function getAllIncome(): Promise<Income[]> {
  const data = await GET<unknown>("/api/income");
  return z.array(incomeSchema).parse(data);
}

export async function createIncome(data: Income): Promise<Income> {
  const res = await POST<unknown>("/api/income", data);
  return incomeSchema.parse(res);
}
