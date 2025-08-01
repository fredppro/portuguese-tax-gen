"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { client } from "@/lib/auth/auth-client";

type Session = Awaited<ReturnType<typeof client.getSession>>;

const SessionContext = createContext<Session | null>(null);

export function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    client.getSession().then(setSession);
  }, []);

  if (session === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading session...
      </div>
    );
  }

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
