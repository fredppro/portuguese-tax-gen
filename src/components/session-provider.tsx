"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { client } from "@/lib/auth/auth-client";
import { usePathname } from "@/lib/i18n-navigation";
import { DashboardSkeleton } from "./dashboard-skeleton";
import { SignInSkeleton } from "@/components/sign-in-skeleton";

type Session = Awaited<ReturnType<typeof client.getSession>>;

const SessionContext = createContext<Session | null>(null);

export function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    client.getSession().then(setSession);
  }, []);

  if (session === null) {
    switch (pathname) {
      case "/dashboard":
        return <DashboardSkeleton />;

      case "/sign-in":
        return <SignInSkeleton />;

      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            Loading session…
          </div>
        );
    }
  }

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
