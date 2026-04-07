"use client";

import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    id: "basic",
    name: "Standard",
    price: "$9.99",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC || "price_placeholder_basic",
    description: "Ideal para pequeños negocios empezando su recuperación.",
    features: [
      "Hasta 50 recuperaciones/mes",
      "Soporte por email",
      "Panel de métricas básico",
      "15% de comisión adicional se aplica",
    ],
    cta: "Empezar con Basic",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Enterprise Recovery",
    price: "$29.99",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO || "price_placeholder_pro",
    description: "Potencia total para agencias y negocios de alto volumen.",
    features: [
      "Recuperaciones ilimitadas",
      "Soporte prioritario",
      "Analytics avanzados",
      "Personalización de marca en emails",
      "15% de comisión adicional se aplica",
    ],
    cta: "Obtener Pro ahora",
    highlighted: true,
  },
];

export default function PricingPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { openSignIn } = useClerk();
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  const handleSubscription = async (priceId: string) => {
    if (!isSignedIn) {
      openSignIn({ fallbackRedirectUrl: "/pricing" });
      return;
    }

    try {
      setLoadingPriceId(priceId);
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      
      const response = await fetch(`${backendUrl}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          clerk_user_id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
        }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Algo salió mal al crear la sesión de pago.");
      }
    } catch (error) {
      console.error("Error redirecting to checkout:", error);
      alert("Hubo un error de conexión con el servidor.");
    } finally {
      setLoadingPriceId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1B27] text-[#F2F2F2] flex flex-col items-center py-20 px-6 relative overflow-hidden font-nunito">
      
      {/* Background Decor */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(242,242,242,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(242,242,242,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[800px] h-[500px] bg-white opacity-5 blur-[120px] rounded-full" />

      {/* Header */}
      <div className="relative text-center max-w-2xl mb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-[#BFAFAF] hover:text-white transition-colors mb-8 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Volver al inicio
        </Link>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 mt-2">
          Planes Simple y <span className="text-white opacity-80 underline decoration-[#F2F2F2]/20">Escalables</span>
        </h1>
        <p className="text-xl text-[#BFAFAF]">
          Elige la potencia que tu negocio necesita para recuperar cada centavo perdido.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl relative">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`
              relative flex flex-col p-8 rounded-3xl border transition-all duration-500
              ${plan.highlighted 
                ? "bg-white/5 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.05)] scale-105 z-10" 
                : "bg-black/20 border-white/5 hover:border-white/10"
              }
            `}
          >
            {plan.highlighted && (
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#F2F2F2] text-[#0D0D0D] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Recomendado
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className="text-[#BFAFAF] font-light">/mes</span>
              </div>
              <p className="text-[#BFAFAF] text-sm leading-relaxed">
                {plan.description}
              </p>
            </div>

            <ul className="flex-grow space-y-4 mb-10">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex gap-3 text-sm items-start">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#F2F2F2]" />
                  </div>
                  <span className="text-[#D9D9D9]">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscription(plan.priceId)}
              disabled={loadingPriceId === plan.priceId}
              className={`
                w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all group
                ${plan.highlighted 
                  ? "bg-[#F2F2F2] text-[#0D0D0D] hover:bg-white" 
                  : "bg-white/10 text-white hover:bg-white/20"
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {loadingPriceId === plan.priceId ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-16 text-center text-xs text-[#BFAFAF]/40">
        <p>Todos los planes incluyen nuestra tasa de recuperación del 15%.<br />
        Sin compromiso. Cancela en cualquier momento desde tu panel.</p>
      </div>
    </div>
  );
}
