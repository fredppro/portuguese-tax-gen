import { AppSidebar } from "@/components/app-sidebar";
import { SessionProvider } from "@/components/session-provider";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth/auth";
import { setRequestLocale } from "next-intl/server";
import { headers } from "next/headers";

export type BetterAuthSession = Awaited<ReturnType<typeof auth.api.getSession>>;
export type User = NonNullable<BetterAuthSession>["user"];

export default async function AuthLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const session: BetterAuthSession = await auth.api.getSession({
    headers: await headers(),
  });

  console.log(session);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SessionProvider>{props.children}</SessionProvider>
      </div>
    );
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar user={session.user} variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <SessionProvider>{props.children}</SessionProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
