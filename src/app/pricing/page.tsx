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
    <div className="min-h-screen bg-deep relative flex flex-col items-center">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-dot-grid mask-radial pointer-events-none opacity-30"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight transition-colors text-primary">AlyntAI</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-sm transition-colors px-3 py-1.5 rounded-md font-medium text-muted hover:text-primary">
              ← Inicio
            </Link>
            <Link href="/sign-up" className="text-sm px-4 py-1.5 rounded-md font-medium transition-all bg-primary text-black hover:bg-primary/90">
              Start free trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="relative text-center max-w-3xl pt-32 pb-4 px-6 md:pt-44">
        <div className="inline-flex items-center gap-2 rounded-full border border-soft px-4 py-1.5 text-xs font-medium mb-8 bg-card/[0.5] text-primary hover-lift">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-subtle" />
          Tarifa fija, sin comisiones
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-primary">
          Ellos cobran comisión.<br />
          <span className="opacity-60">Nosotros no.</span>
        </h1>
        <p className="text-xl text-muted max-w-xl mx-auto leading-relaxed">
          Otros cobran 20-30% de cada dólar recuperado. AlyntAI es tarifa fija. <span className="text-primary font-semibold">Tú te quedas con todo lo que recuperas.</span>
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl relative px-6 py-12 z-10">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`
              relative flex flex-col p-8 rounded-lg border transition-all hover-lift
              ${plan.highlighted 
                ? "bg-card border-primary/30 shadow-lg scale-[1.02] shadow-black/80" 
                : "bg-card-alt border-soft hover:border-primary/10"
              }
            `}
          >
            {plan.highlighted && (
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-[black] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                Recomendado
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2 text-primary">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-extrabold text-primary">{plan.price}</span>
                <span className="text-muted font-light">/mes</span>
              </div>
              <p className="text-muted text-sm leading-relaxed">
                {plan.description}
              </p>
            </div>

            <ul className="flex-grow space-y-4 mb-10">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex gap-3 text-sm items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted/90">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscription(plan.priceId)}
              disabled={loadingPriceId === plan.priceId}
              className={`
                w-full h-11 rounded-md font-medium text-sm flex items-center justify-center gap-2 transition-all group
                ${plan.highlighted 
                  ? "bg-primary text-[black] hover:opacity-90 cta-glow border-0" 
                  : "bg-white/5 border border-soft text-primary hover:bg-white/10"
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {loadingPriceId === plan.priceId ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* ═══ COMPARISON TABLE ═══ */}
      <div className="w-full max-w-4xl px-6 py-16 z-10">
        <div className="text-center mb-10">
          <p className="text-muted text-sm uppercase tracking-wider font-medium mb-3">La Diferencia</p>
          <h2 className="text-3xl font-bold tracking-tight text-primary mb-3">¿Por qué tarifa fija?</h2>
          <p className="text-muted">Haz las cuentas. Con AlyntAI te quedas con todo lo que te corresponde.</p>
        </div>
        
        <div className="rounded-lg border border-soft bg-card overflow-hidden shadow-sm hover-lift">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-soft bg-black/30">
                    <th className="text-left py-4 px-6 text-muted text-xs font-medium uppercase tracking-wider w-[200px]">Característica</th>
                    <th className="text-center py-4 px-6 text-xs font-semibold uppercase tracking-wider text-black bg-primary min-w-[130px]">AlyntAI</th>
                    <th className="text-center py-4 px-6 text-muted text-xs font-medium uppercase tracking-wider min-w-[130px]">Los Demás</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-soft hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-muted font-medium">Tarifa base mensual</td>
                    <td className="py-4 px-6 text-center bg-primary/5 font-medium"><span className="text-primary font-semibold">Desde $9.99/mes</span></td>
                    <td className="py-4 px-6 text-center text-muted/80">$200-500/mes</td>
                  </tr>
                  <tr className="border-b border-soft hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-muted font-medium">Comisión por éxito</td>
                    <td className="py-4 px-6 text-center bg-primary/5 font-medium"><span className="text-primary font-semibold">0%</span></td>
                    <td className="py-4 px-6 text-center text-muted/80">20-30%</td>
                  </tr>
                  <tr className="border-b border-soft hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-muted font-medium">Recuperas $1,000</td>
                    <td className="py-4 px-6 text-center bg-primary/5 font-medium"><span className="text-success font-semibold tracking-wide text-lg">Tú quedas $1,000</span></td>
                    <td className="py-4 px-6 text-center text-loss font-semibold tracking-wide">$700-800</td>
                  </tr>
                  <tr className="border-b border-soft hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-muted font-medium">Recuperas $5,000</td>
                    <td className="py-4 px-6 text-center bg-primary/5 font-medium"><span className="text-success font-semibold tracking-wide text-lg">Tú quedas $5,000</span></td>
                    <td className="py-4 px-6 text-center text-loss font-semibold tracking-wide">$3,500-4,000</td>
                  </tr>
                  <tr className="border-b border-soft hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-muted font-medium">Recuperas $10,000</td>
                    <td className="py-4 px-6 text-center bg-primary/5 font-medium"><span className="text-success font-semibold tracking-wide text-lg">Tú quedas $10,000</span></td>
                    <td className="py-4 px-6 text-center text-loss font-semibold tracking-wide">$7,000-8,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </div>

      <div className="pb-16 text-center text-[11px] text-muted/40 px-6 z-10">
        <p>Tarifa fija mensual. Sin comisiones por recuperación. Sin costos ocultos.<br />
        Sin compromiso. Cancela en cualquier momento desde tu panel.</p>
      </div>

      {/* Footer */}
      <footer className="border-t border-soft bg-card-alt w-full mt-auto">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight text-primary">AlyntAI</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-muted">
              <Link href="/terms" className="hover:text-primary transition-colors">Términos</Link>
              <a href="mailto:hola@alyntai.com" className="hover:text-primary transition-colors">Soporte</a>
            </div>
            <p className="text-xs text-muted/50">© {new Date().getFullYear()} AlyntAI</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
