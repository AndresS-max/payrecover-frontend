"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function OnboardingPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://payrecover.onrender.com/api/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          email: user?.primaryEmailAddress?.emailAddress,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Ocurrió un error: No se recibió la URL de Stripe.");
      }
    } catch (error) {
      console.error("Error connecting to Stripe:", error);
      alert("Ocurrió un error al intentar conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-zinc-950">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Conecta tu cuenta de pagos
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto">
            Para automatizar la recuperación de tus facturas, necesitamos conectarnos con tu cuenta de Stripe.
          </p>
        </div>

        {/* How it works Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#635BFF]/10 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#635BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1. Autorización</h3>
            <p className="text-zinc-500 text-sm">
              Te redirigiremos de forma segura a Stripe.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#635BFF]/10 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#635BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">2. Conexión</h3>
            <p className="text-zinc-500 text-sm">
              PayRecover obtendrá permisos solo de lectura para detectar pagos fallidos.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#635BFF]/10 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#635BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3. Automatización</h3>
            <p className="text-zinc-500 text-sm">
              Empezaremos a recuperar tu dinero en piloto automático.
            </p>
          </div>
        </div>

        {/* Action Container */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 text-center shadow-xl">
          <button 
            onClick={handleConnect}
            disabled={loading}
            className={`bg-[#635BFF] hover:bg-[#544BD9] text-white font-semibold text-lg py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,91,255,0.4)] active:scale-[0.98] inline-flex items-center space-x-3 w-full md:w-auto overflow-hidden ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {/* Using a generic connector icon as a stand-in for stripe */}
              <path d="M11.996 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zM8.385 17.653c-1.39 0-2.518-1.127-2.518-2.518 0-1.39 1.128-2.518 2.518-2.518 1.39 0 2.518 1.128 2.518 2.518 0 1.39-1.128 2.518-2.518 2.518zm0-6.19c-1.39 0-2.518-1.128-2.518-2.518 0-1.39 1.128-2.518 2.518-2.518 1.39 0 2.518 1.128 2.518 2.518 0 1.39-1.128 2.518-2.518 2.518zm7.23 6.19c-1.39 0-2.518-1.127-2.518-2.518 0-1.39 1.128-2.518 2.518-2.518 1.39 0 2.518 1.128 2.518 2.518 0 1.39-1.128 2.518-2.518 2.518zm0-6.19c-1.39 0-2.518-1.128-2.518-2.518 0-1.39 1.128-2.518 2.518-2.518 1.39 0 2.518 1.128 2.518 2.518 0 1.39-1.128 2.518-2.518 2.518z" />
            </svg>
            <span>{loading ? "Redirigiendo a Stripe..." : "Conectar con Stripe"}</span>
          </button>
          <p className="text-zinc-500 text-sm mt-6 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Cifrado de grado bancario (AES-256)
          </p>
        </div>
      </div>
    </div>
  );
}
