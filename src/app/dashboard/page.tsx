import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { expenseSchema, incomeSchema } from "@/db/schema";
import { fetchIncome } from "@/lib/api";
import z from "zod";
import { expenseColumns } from "@/app/expenses/_table/column-def";
import { GET } from "../api/expense/route";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default async function Page() {
  const incomeData: z.infer<typeof incomeSchema>[] = await fetchIncome();
  const expensesData: z.infer<typeof expenseSchema>[] = await GET().then(
    (res) => res.json()
  ); // Assuming similar structure for expenses

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <Tabs
                defaultValue="expenses"
                className="w-full flex-col justify-start gap-6"
              >
                <div className="flex items-center justify-between px-4 lg:px-6">
                  <Label htmlFor="view-selector" className="sr-only">
                    View
                  </Label>
                  <Select defaultValue="expenses">
                    <SelectTrigger
                      className="flex w-fit @4xl/main:hidden"
                      size="sm"
                      id="view-selector"
                    >
                      <SelectValue placeholder="Select a view" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expenses">Expenses</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                    </SelectContent>
                  </Select>
                  <TabsList>
                    <TabsTrigger value="expenses">Expenses</TabsTrigger>
                    <TabsTrigger value="income">Income</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="expenses" className="px-4 lg:px-6">
                  <DataTable
                    data={expensesData}
                    columns={expenseColumns}
                    draggable
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
