"use client";

import { SignIn } from "@/components/sign-in";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { client } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    client.oneTap({
      fetchOptions: {
        onError: ({ error }) => {
          toast.error(error.message || "An error occurred");
        },
        onSuccess: () => {
          toast.success("Successfully signed in");
          router.push("/dashboard");
        },
      },
    });
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center flex-col justify-center w-full md:py-10">
        <div className="md:w-[400px]">
          <Tabs
            defaultValue="sign-in"
            className="w-full flex-col justify-start gap-6"
          >
            <div className="flex items-center justify-between px-4 lg:px-6">
              <TabsList>
                <TabsTrigger value="sign-in">Signin</TabsTrigger>
                <TabsTrigger value="sign-up">Signup</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="sign-in" className="px-4 lg:px-6">
              <SignIn />
            </TabsContent>

            <TabsContent value="sign-up" className="px-4 lg:px-6">
              {/* <SignUp /> */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
