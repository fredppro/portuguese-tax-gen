import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { routing } from "@/lib/i18n-routing";
import { setRequestLocale } from "next-intl/server";
import { headers } from "next/headers";

export default async function AuthLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const signInUrl =
    locale === routing.defaultLocale ? "/en/sign-in" : `/${locale}/sign-in`;
  const signUpUrl =
    locale === routing.defaultLocale ? "/en/sign-up" : `/${locale}/sign-up`;

  const headerList = await headers();
  const pathname = headerList.get("x-current-path");

  const isAuthRoute = pathname === signInUrl || pathname === signUpUrl;

  console.log(pathname, signInUrl);

  if (isAuthRoute) {
    // Minimal layout for sign-in/sign-up
    return (
      <div className="min-h-screen flex items-center justify-center">
        {props.children}
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
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {props.children}
      </SidebarInset>
    </SidebarProvider>
  );
}
