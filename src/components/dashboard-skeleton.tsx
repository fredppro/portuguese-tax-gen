import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <section className="flex flex-1 flex-col gap-6 p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-44 w-full rounded-xl" />
        ))}
      </div>

      <Skeleton className="h-96 w-full rounded-xl" />

      <Skeleton className="h-12 w-32 mt-4 rounded-xl" />
      <div className="w-full">
        <Skeleton className="h-72 w-full rounded-xl" />
      </div>
    </section>
  );
}
