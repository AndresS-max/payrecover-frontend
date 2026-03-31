"use client";
import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk();
  const router = useRouter();

  useEffect(() => {
    async function processCallback() {
      try {
        await handleRedirectCallback({
          afterSignInUrl: "/dashboard",
          afterSignUpUrl: "/dashboard",
        });
      } catch (err) {
        console.error("SSO callback error:", err);
        // Si falla, redirigir al dashboard de todas formas
        router.push("/dashboard");
      }
    }
    processCallback();
  }, [handleRedirectCallback, router]);

  return (
    <div className="min-h-screen bg-[#0F1B27] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#F2F2F2]/20 border-t-[#F2F2F2] rounded-full animate-spin" />
        <p className="text-[#BFAFAF] text-sm">Iniciando sesión...</p>
      </div>
    </div>
  );
}
