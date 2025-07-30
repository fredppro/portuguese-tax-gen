// app/api/expense/route.ts

import { NextResponse } from "next/server";
import { db } from "@/db";
import { expense } from "@/db/schema";
import { expenseSchema } from "@/db/schema";

export async function GET() {
  try {
    const data = await db.select().from(expense);
    const parsed = expenseSchema.array().parse(data);
    return NextResponse.json(parsed, { status: 200 });
  } catch (err) {
    console.error("Error fetching expenses:", err);
    return NextResponse.json(
      { error: "Failed to fetch expenses" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const validated = expenseSchema.omit({ id: true }).parse(json);
    const [inserted] = await db.insert(expense).values(validated).returning();
    return NextResponse.json(inserted, { status: 201 });
  } catch (err) {
    console.error("Error inserting expense:", err);
    return NextResponse.json(
      { error: "Invalid input or DB error" },
      { status: 400 }
    );
  }
}
