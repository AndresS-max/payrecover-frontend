"use client";

import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Check, ArrowRight, Loader2, X } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    id: "basic",
    name: "Standard",
    price: "$9.99",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC || "price_placeholder_basic",
    description: "Ideal para pequeños negocios empezando su recuperación de pagos.",
    features: [
      "Hasta 50 recuperaciones/mes",
      "Soporte por email",
      "Panel de métricas básico",
      "Reintentos inteligentes",
      "Secuencia de 3 emails con IA",
      "Sin comisiones por transacción",
    ],
    cta: "Empezar con Standard",
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
      "Analytics avanzados & dashboard Pro",
      "Personalización de marca en emails",
      "Reportes de onboarding con IA",
      "Sin comisiones por transacción",
    ],
    cta: "Obtener Pro ahora",
    highlighted: true,
  },
];

const COMPARISON = [
  { feature: "Tarifa base mensual", us: "Desde $9.99/mes", them: "$200-500/mes" },
  { feature: "Comisión por recuperación", us: "0%", them: "20-30%" },
  { feature: "Recuperas $1,000", us: "Tú te quedas $1,000", them: "Tú te quedas $700-800" },
  { feature: "Recuperas $5,000", us: "Tú te quedas $5,000", them: "Tú te quedas $3,500-4,000" },
  { feature: "Recuperas $10,000", us: "Tú te quedas $10,000", them: "Tú te quedas $7,000-8,000" },
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
    <div className="min-h-screen bg-[#0F1B27] text-[#F2F2F2] flex flex-col items-center relative overflow-hidden font-nunito">
      
      {/* Background Decor */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(242,242,242,0.03) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[800px] h-[500px] bg-white opacity-[0.03] blur-[120px] rounded-full" />

      {/* Navbar */}
      <nav className="w-full sticky top-0 z-50 bg-[#0F1B27]/80 backdrop-blur-xl border-b border-[#F2F2F2]/[0.06]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#F2F2F2] flex items-center justify-center">
              <span className="text-[#0D0D0D] text-sm font-extrabold">A</span>
            </div>
            <span className="text-lg font-extrabold tracking-tight">AlyntAI</span>
          </Link>
          <Link href="/" className="text-sm text-[#BFAFAF] hover:text-white transition-colors flex items-center gap-1 group">
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Inicio
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div className="relative text-center max-w-3xl pt-20 pb-4 px-6">
        <div className="inline-flex items-center gap-2 bg-[#0D0D0D] border border-[#F2F2F2]/10 rounded-full px-5 py-2 text-sm text-[#BFAFAF] mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Tarifa fija, sin comisiones
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Ellos cobran comisión.<br />
          <span className="opacity-60">Nosotros no.</span>
        </h1>
        <p className="text-xl text-[#BFAFAF] max-w-xl mx-auto">
          Otros cobran 20-30% de cada dólar recuperado. AlyntAI es tarifa fija. <span className="text-[#F2F2F2] font-semibold">Tú te quedas con todo lo que recuperas.</span>
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl relative px-6 py-12">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`
              relative flex flex-col p-8 rounded-3xl border transition-all duration-500
              ${plan.highlighted 
                ? "bg-white/5 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.05)] scale-[1.03] z-10" 
                : "bg-[#0D0D0D]/50 border-white/5 hover:border-white/10"
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
                <span className="text-5xl font-extrabold">{plan.price}</span>
                <span className="text-[#BFAFAF] font-light">/mes</span>
              </div>
              <p className="text-[#BFAFAF] text-sm leading-relaxed">
                {plan.description}
              </p>
            </div>

            <ul className="flex-grow space-y-4 mb-10">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex gap-3 text-sm items-center">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
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

      {/* ═══ COMPARISON TABLE ═══ */}
      <div className="w-full max-w-4xl px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">¿Por qué tarifa fija?</h2>
          <p className="text-[#BFAFAF]">Haz las cuentas. Con AlyntAI te quedas con todo.</p>
        </div>
        
        <div className="bg-[#0D0D0D]/60 border border-[#F2F2F2]/[0.06] rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 text-sm font-bold border-b border-[#F2F2F2]/[0.06]">
            <div className="p-4 text-[#BFAFAF]">Concepto</div>
            <div className="p-4 text-center bg-[#F2F2F2]/[0.03]">
              <span className="text-[#F2F2F2]">AlyntAI</span>
            </div>
            <div className="p-4 text-center text-[#BFAFAF]/60">Otros</div>
          </div>
          {/* Rows */}
          {COMPARISON.map((row, i) => (
            <div key={i} className={`grid grid-cols-3 text-sm ${i < COMPARISON.length - 1 ? "border-b border-[#F2F2F2]/[0.04]" : ""}`}>
              <div className="p-4 text-[#BFAFAF]">{row.feature}</div>
              <div className="p-4 text-center bg-[#F2F2F2]/[0.03] text-[#F2F2F2] font-semibold flex items-center justify-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                {row.us}
              </div>
              <div className="p-4 text-center text-[#BFAFAF]/40 flex items-center justify-center gap-1.5">
                <X className="w-3.5 h-3.5 text-red-400/50 flex-shrink-0" />
                {row.them}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pb-16 text-center text-xs text-[#BFAFAF]/40 px-6">
        <p>Tarifa fija mensual. Sin comisiones por recuperación. Sin costos ocultos.<br />
        Sin compromiso. Cancela en cualquier momento desde tu panel.</p>
      </div>
    </div>
  );
}
