"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function OnboardingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const handleConnectStripe = async () => {
    setIsLoading(true);
    console.log("Iniciando conexión con backend...");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/connect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
      });

      if (!response.ok) {
        throw new Error("Error obteniendo la URL de Stripe Connect");
      }

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("El servidor no retornó una URL válida");
      }
    } catch (error) {
      console.error("Error al conectar con Stripe:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto mt-12">
      <div className="bg-zinc-900/50 p-8 md:p-12 rounded-3xl border border-zinc-800 shadow-2xl text-center relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-32 bg-[#F2F2F2]/5 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Icon Header */}
          <div className="w-20 h-20 bg-[#F2F2F2]/5 rounded-2xl flex items-center justify-center mb-6 border border-[#F2F2F2]/10 shadow-[0_0_30px_rgba(242,242,242,0.05)]">
            <svg
              className="w-10 h-10 text-[#F2F2F2]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[#F2F2F2] mb-4 tracking-tight">
            Conecta tu cuenta de Stripe
          </h1>

          <p className="text-[#BFAFAF] mb-10 text-lg leading-relaxed max-w-lg">
            Alynt AI necesita tu autorización para rastrear e identificar facturas fallidas.
            Esta conexión nos permite automatizar el proceso de recuperación de forma <span className="text-[#F2F2F2] font-semibold">100% segura</span> y transparente.
          </p>

          <button
            onClick={handleConnectStripe}
            disabled={isLoading}
            className={`
              w-full md:w-auto relative group flex items-center justify-center space-x-3 
              bg-[#F2F2F2] hover:bg-[#D9D9D9] text-[#0D0D0D] font-bold py-4 px-10 rounded-xl 
              transition-all duration-300 shadow-[0_4px_20px_rgba(242,242,242,0.15)] 
              active:scale-[0.98]
              ${isLoading ? "opacity-90 cursor-not-allowed" : ""}
            `}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-[#0D0D0D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Conectando...</span>
              </>
            ) : (
              <>
                <span>Autorizar conexión con Stripe</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>

          <p className="text-sm text-[#BFAFAF]/60 flex items-center mt-6">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Conexión encriptada de extremo a extremo
          </p>
        </div>
      </div>
    </div>
  );
}
