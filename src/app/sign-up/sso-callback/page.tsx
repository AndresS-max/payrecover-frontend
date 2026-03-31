"use client";
import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SSOCallbackSignUp() {
  const { handleRedirectCallback } = useClerk();
  const router = useRouter();

  useEffect(() => {
    async function processCallback() {
      try {
        await handleRedirectCallback({
          signInFallbackRedirectUrl: "/dashboard",
          signUpFallbackRedirectUrl: "/dashboard",
        });
      } catch (err) {
        console.error("SSO callback error:", err);
        router.push("/dashboard");
      }
    }
    processCallback();
  }, [handleRedirectCallback, router]);

  return (
    <div className="min-h-screen bg-[#0F1B27] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#F2F2F2]/20 border-t-[#F2F2F2] rounded-full animate-spin" />
        <p className="text-[#BFAFAF] text-sm">Creando cuenta...</p>
      </div>
    </div>
  );
}
