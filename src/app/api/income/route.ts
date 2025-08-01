import { NextResponse } from "next/server";
import { db } from "@/db";
import { income } from "@/db/schema/schema";
import { incomeSchema } from "@/db/schema/schema";

export async function GET() {
  try {
    const data = await db.select().from(income);
    const parsedData = data.map((entry) => ({
      ...entry,
      amount: parseFloat(entry.amount),
    }));

    return NextResponse.json(parsedData, { status: 200 });
  } catch (error) {
    console.error("Error fetching income data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newIncome = incomeSchema.parse(body);
    const inserted = await db
      .insert(income)
      .values({ ...newIncome, amount: String(newIncome.amount) }) // Convert amount to string for the database
      .returning();

    return NextResponse.json(inserted[0], { status: 201 });
  } catch (error) {
    console.error("Error inserting income data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
