"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseSchema } from "@/db/schema";
import { z } from "zod";
import { useState } from "react";

// The current schema defines the id, but in POST requests, we don't send the id
type ExpenseFormData = Omit<z.infer<typeof expenseSchema>, "id">;

export default function ExpensesPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema.omit({ id: true })), // The same here, omit the id
  });

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: ExpenseFormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      console.log(res);

      if (!res.ok) throw new Error("Failed to submit expense");
      reset(); // Clear form
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Add Expense</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Description</label>
          <input
            {...register("description")}
            className="w-full border p-2 rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block">Amount (€)</label>
          <input
            {...register("amount")}
            className="w-full border p-2 rounded"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount.message}</p>
          )}
        </div>

        <div>
          <label className="block">Date</label>
          <input
            type="date"
            {...register("date")}
            className="w-full border p-2 rounded"
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label className="block">Category</label>
          <input
            {...register("category")}
            className="w-full border p-2 rounded"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {submitting ? "Submitting..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
}
