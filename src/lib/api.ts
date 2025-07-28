import { incomeSchema } from "@/db/schema";
import { z } from "zod";

const API_BASE_PATH =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"; // Default to localhost for server-side

// Helper function to construct the full API URL
function getApiUrl(path: string): string {
  if (typeof window === "undefined") {
    // Server-side: Use absolute URL
    return `${API_BASE_PATH}${path}`;
  }
  // Client-side: Use relative URL
  return path;
}

// Fetch all income entries
export async function fetchIncome() {
  const response = await fetch(getApiUrl("/api/income"));
  const data = await response.json();

  // Validate the response with Zod
  return z.array(incomeSchema).parse(data);
}

// Add a new income entry
export async function addIncome(newIncome: z.infer<typeof incomeSchema>) {
  const response = await fetch(getApiUrl("/api/income"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newIncome),
  });

  const data = await response.json();

  // Validate the response with Zod
  return incomeSchema.parse(data);
}
