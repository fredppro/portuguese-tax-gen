"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { client } from "@/lib/auth/auth-client";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function SiteHeader() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Documents</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button
            className="w-full"
            size="sm"
            onClick={() => {
              startTransition(async () => {
                await client.signOut();
                router.refresh();
              });
            }}
            disabled={isPending}
          >
            {isPending && <Loader2Icon className="animate-spin" />}
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
