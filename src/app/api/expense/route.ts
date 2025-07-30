import { db } from "@/db";
import { expense } from "@/db/schema";
import { expenseSchema } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await db.select().from(expense);
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = expenseSchema.omit({ id: true }).parse(body);

    const inserted = await db.insert(expense).values(validated).returning();
    return NextResponse.json(inserted[0], { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}
