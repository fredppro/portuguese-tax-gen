import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export function SignInSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 px-4">
      <Skeleton className="h-[542px] w-[368px] rounded-xl flex flex-col items-center justify-start space-y-4 py-6">
        <Skeleton className="h-[256px] w-[170px] bg-neutral-200" />
        <Skeleton className="h-[192px] w-[232px] bg-neutral-200" />
        {[...Array(2)].map((_, j) => (
          <Skeleton key={j} className="h-[128px] w-[300px] bg-neutral-200" />
        ))}
        <div className="w-[230px] h-[16px] bg-neutral-200" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              <Skeleton className="h-6 w-[70px] bg-neutral-200" />
              <Skeleton className="h-8 w-[300px] bg-neutral-200" />
            </React.Fragment>
          ))}
        </div>
        <Skeleton className="h-[128px] w-[170px] bg-neutral-200" />
      </Skeleton>
    </div>
  );
}
