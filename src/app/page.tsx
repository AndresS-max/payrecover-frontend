"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useClerk, useUser, useAuth } from "@clerk/nextjs";
import Link from "next/link";

/* ─── Animated counter ────────────────────────────────────────────────── */
function AnimatedNumber({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 2000;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = end / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setValue(end); clearInterval(timer); }
      else setValue(Math.floor(start));
    }, stepTime);
    return () => clearInterval(timer);
  }, [target]);
  return <>{prefix}{value.toLocaleString()}{suffix}</>;
}

/* ─── Section wrapper ─────────────────────────────────────────────────── */
function Section({ children, id, dark = true, className = "" }: { children: React.ReactNode; id?: string; dark?: boolean; className?: string }) {
  return (
    <section id={id} className={`relative py-24 px-6 ${dark ? "bg-[#0F1B27]" : "bg-[#0D0D0D]"} ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

function LandingPageContent() {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const { signOut } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const isSessionExpired = searchParams?.get('error') === 'session_expired';
    if (isSessionExpired && isSignedIn) {
      signOut().then(() => router.replace('/'));
    }
  }, [searchParams, isSignedIn, signOut, router]);

  const handleCTA = () => {
    if (isSignedIn) router.push("/dashboard");
    else openSignIn({ fallbackRedirectUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-[#0F1B27] text-[#F2F2F2] selection:bg-[#F2F2F2]/20 selection:text-white overflow-hidden">

      {/* ════════════ NAVBAR ════════════ */}
      <nav className="sticky top-0 z-50 bg-[#0F1B27]/80 backdrop-blur-xl border-b border-[#F2F2F2]/[0.06]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F2F2F2] flex items-center justify-center">
              <span className="text-[#0D0D0D] text-sm font-extrabold">A</span>
            </div>
            <span className="text-lg font-extrabold tracking-tight">AlyntAI</span>
          </div>
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <>
                <Link href="/dashboard" className="text-sm text-[#BFAFAF] hover:text-white transition-colors">Dashboard</Link>
                <button onClick={handleCTA} className="bg-[#F2F2F2] hover:bg-[#D9D9D9] text-[#0D0D0D] font-semibold text-sm py-2.5 px-6 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                  Ir al panel →
                </button>
              </>
            ) : (
              <>
                <button onClick={() => openSignIn({ fallbackRedirectUrl: "/dashboard" })} className="text-sm text-[#BFAFAF] hover:text-white transition-colors">
                  Iniciar sesión
                </button>
                <button onClick={handleCTA} className="bg-[#F2F2F2] hover:bg-[#D9D9D9] text-[#0D0D0D] font-semibold text-sm py-2.5 px-6 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(242,242,242,0.1)]">
                  Empezar gratis
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ════════════ HERO ════════════ */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle, rgba(242,242,242,0.04) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }} />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(242,242,242,0.05) 0%, transparent 60%)" }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#0D0D0D] border border-[#F2F2F2]/10 rounded-full px-5 py-2 text-sm text-[#BFAFAF] mb-10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Recuperación de pagos con IA
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.95] mb-8"
            style={{
              background: "linear-gradient(135deg, #F2F2F2 0%, #BFAFAF 60%, #D9D9D9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Tu herramienta de<br />dunning cobra comisión.<br />
            <span style={{ WebkitTextFillColor: "#F2F2F2" }}>Nosotros no.</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#BFAFAF] max-w-2xl mx-auto leading-relaxed font-light mb-10">
            Recuperación de pagos fallidos con IA para SaaS. Reintentos inteligentes, emails personalizados, dashboard en tiempo real. Conecta Stripe en 2 minutos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button onClick={handleCTA}
              className="bg-[#F2F2F2] hover:bg-white text-[#0D0D0D] font-bold text-base py-4 px-10 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_40px_rgba(242,242,242,0.15)]"
            >
              {isSignedIn ? "Ir al dashboard →" : "Empezar prueba gratis →"}
            </button>
            <Link href="/pricing"
              className="bg-white/5 hover:bg-white/10 text-white font-semibold text-base py-4 px-10 rounded-full border border-white/10 transition-all text-center flex items-center justify-center"
            >
              Ver planes
            </Link>
          </div>

          <p className="text-xs text-[#BFAFAF]/50">
            Sin tarjeta de crédito · Sin comisiones · Cancela cuando quieras
          </p>
        </div>
      </section>

      {/* ════════════ STATS ════════════ */}
      <Section dark={false}>
        <div className="text-center mb-12">
          <span className="text-sm text-[#BFAFAF] font-semibold uppercase tracking-widest">El problema</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3">
            Estás perdiendo ingresos ahora mismo<br className="hidden md:block" /> y no lo sabes
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { value: 9, prefix: "$", suffix: "B+", label: "Perdidos en pagos fallidos al año", sub: "Recurly, 2024" },
            { value: 15, suffix: "%", label: "De pagos recurrentes fallan silenciosamente", sub: "Promedio de la industria" },
            { value: 78, suffix: "%", label: "Tasa media de recuperación", sub: "Benchmark AlyntAI" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#0F1B27]/60 border border-[#F2F2F2]/[0.06] rounded-2xl p-8 text-center group hover:border-[#F2F2F2]/15 transition-all duration-500">
              <div className="text-4xl md:text-5xl font-black mb-3 text-[#F2F2F2]">
                <AnimatedNumber target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <p className="text-[#BFAFAF] text-sm mb-1">{stat.label}</p>
              <p className="text-[#BFAFAF]/40 text-xs">{stat.sub}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ════════════ HOW IT WORKS ════════════ */}
      <Section id="how">
        <div className="text-center mb-16">
          <span className="text-sm text-[#BFAFAF] font-semibold uppercase tracking-widest">Cómo funciona</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3">
            Tres pasos. Dos minutos.
          </h2>
          <p className="text-[#BFAFAF] mt-3 text-lg">Sin código. Sin llamadas de ventas.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { step: "01", title: "Conecta Stripe", desc: "OAuth en un clic. Sin código, sin DNS, sin ingeniería. Toma 30 segundos." },
            { step: "02", title: "La IA monitorea y recupera", desc: "Reintentos inteligentes según código de rechazo. Emails personalizados con IA." },
            { step: "03", title: "Observa tus ingresos volver", desc: "Dashboard en tiempo real: cada dólar recuperado, tu tasa exacta de éxito." },
          ].map((item, i) => (
            <div key={i} className="relative group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F2F2F2]/[0.06] border border-[#F2F2F2]/10 flex items-center justify-center text-sm font-bold text-[#F2F2F2] group-hover:bg-[#F2F2F2]/10 transition-all duration-300">
                  {item.step}
                </div>
                {i < 2 && (
                  <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-[#F2F2F2]/10 to-transparent" />
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-[#BFAFAF] text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ════════════ DASHBOARD PREVIEW ════════════ */}
      <Section dark={false}>
        <div className="text-center mb-12">
          <span className="text-sm text-[#BFAFAF] font-semibold uppercase tracking-widest">Dashboard en tiempo real</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3">
            Ve cada dólar recuperado
          </h2>
          <p className="text-[#BFAFAF] mt-3 max-w-2xl mx-auto">
            Sin porcentajes ocultos. Sin reportes vagos. Tu panel muestra exactamente cuánto ha recuperado AlyntAI, tu tasa de recuperación, y tu ROI neto. Números reales, en tiempo real.
          </p>
        </div>

        {/* Mini dashboard mockup */}
        <div className="bg-[#0F1B27] border border-[#F2F2F2]/[0.08] rounded-3xl p-8 max-w-4xl mx-auto shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {[
              { label: "Recuperados", value: "$4,280", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
              { label: "Fallidos", value: "$8,230", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
              { label: "Tasa de recuperación", value: "52%", color: "text-[#F2F2F2]", bg: "bg-white/5 border-white/10" },
            ].map((card, i) => (
              <div key={i} className={`${card.bg} border rounded-2xl p-5`}>
                <p className="text-xs text-[#BFAFAF] uppercase tracking-wide mb-1">{card.label}</p>
                <p className={`text-3xl font-black ${card.color}`}>{card.value}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { n: "12", label: "En reintento" },
              { n: "31", label: "Recuperados" },
              { n: "5", label: "Perdidos" },
            ].map((s, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold">{s.n}</p>
                <p className="text-xs text-[#BFAFAF]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════ AI EMAILS ════════════ */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm text-[#BFAFAF] font-semibold uppercase tracking-widest">Emails con IA</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-4">
              No son plantillas.<br />Es inteligencia.
            </h2>
            <p className="text-[#BFAFAF] leading-relaxed mb-6">
              Los emails genéricos de &quot;tu pago falló&quot; se ignoran. La IA de AlyntAI escribe cada email de recuperación basado en la razón específica del rechazo, historial del cliente, y nivel de urgencia — para que realmente se abran y se actúe.
            </p>
            <ul className="space-y-3">
              {["Secuencia de 3 emails automáticos", "Personalizados por razón de rechazo", "Se cancelan al recuperar el pago"].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-[#F2F2F2]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-[#F2F2F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-[#D9D9D9]">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Email preview mock */}
          <div className="bg-[#0D0D0D] border border-[#F2F2F2]/[0.08] rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#F2F2F2]/[0.06]">
              <div className="w-8 h-8 rounded-full bg-[#F2F2F2]/10 flex items-center justify-center text-xs font-bold">A</div>
              <div>
                <p className="text-sm font-semibold">Acme SaaS</p>
                <p className="text-xs text-[#BFAFAF]">billing@acmesaas.com</p>
              </div>
            </div>
            <p className="text-sm font-semibold mb-3">Tu suscripción necesita atención</p>
            <div className="text-sm text-[#BFAFAF] space-y-3 leading-relaxed">
              <p>Hola Sarah,</p>
              <p>Notamos que el pago de <span className="text-white font-medium">$89.00</span> para tu plan Pro no se procesó. Esto sucede a veces cuando una tarjeta expira o tu banco marca un cargo desconocido.</p>
              <p>Para mantener tu cuenta activa, actualiza tu método de pago. Toma 30 segundos.</p>
              <div className="mt-4">
                <div className="bg-[#F2F2F2] text-[#0D0D0D] text-sm font-semibold py-2.5 px-6 rounded-lg inline-block">
                  Actualizar método de pago →
                </div>
              </div>
            </div>
            <p className="text-[10px] text-[#BFAFAF]/40 mt-4 pt-3 border-t border-[#F2F2F2]/[0.06]">
              Generado por IA — personalizado según razón de rechazo y contexto del cliente
            </p>
          </div>
        </div>
      </Section>

      {/* ════════════ FEATURES GRID ════════════ */}
      <Section dark={false}>
        <div className="text-center mb-14">
          <span className="text-sm text-[#BFAFAF] font-semibold uppercase tracking-widest">Características</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3">
            Recuperación enterprise.<br className="hidden md:block" />Precio indie.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "⚡", title: "Motor de reintentos inteligente", desc: "Horarios según código de rechazo. Fondos insuficientes en 3/7/14 días. Errores de procesamiento en 4 horas." },
            { icon: "🤖", title: "Emails con IA", desc: "IA contextual basada en razón de rechazo, historial y urgencia del pago." },
            { icon: "📊", title: "Dashboard en tiempo real", desc: "Ingresos recuperados, tasa de recuperación, y ROI neto. Actualizado al instante." },
            { icon: "📧", title: "Secuencia de 3 emails", desc: "Aviso amable, recordatorio gentil, advertencia final. Auto-cancelada al recuperar." },
            { icon: "🔒", title: "Seguro por defecto", desc: "Encriptación AES-256. Stripe OAuth. URLs firmados con HMAC. Cumple CAN-SPAM." },
            { icon: "📋", title: "Reporte de onboarding con IA", desc: "Análisis instantáneo de tus patrones de fallo, ingresos recuperables, y códigos de rechazo principales." },
          ].map((feat, i) => (
            <div key={i} className="bg-[#0F1B27]/60 border border-[#F2F2F2]/[0.06] rounded-2xl p-7 group hover:border-[#F2F2F2]/15 transition-all duration-500">
              <div className="text-2xl mb-4">{feat.icon}</div>
              <h3 className="text-base font-bold mb-2">{feat.title}</h3>
              <p className="text-sm text-[#BFAFAF] leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ════════════ PRICING PREVIEW ════════════ */}
      <Section id="pricing">
        <div className="text-center mb-14">
          <span className="text-sm text-[#BFAFAF] font-semibold uppercase tracking-widest">Precios</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3">
            Ellos cobran comisión. Nosotros no.
          </h2>
          <p className="text-[#BFAFAF] mt-3 max-w-2xl mx-auto">
            Otros cobran 20-30% de cada dólar recuperado, más cientos en tarifas base. AlyntAI es tarifa fija. Tú te quedas con lo que recuperas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { name: "Standard", price: "$9.99", desc: "Ideal para negocios empezando su recuperación.", features: ["Hasta 50 recuperaciones/mes", "Soporte por email", "Panel de métricas básico", "Sin comisiones ocultas"], cta: "Empezar con Standard", highlighted: false },
            { name: "Enterprise Recovery", price: "$29.99", desc: "Potencia total para agencias y negocios de alto volumen.", features: ["Recuperaciones ilimitadas", "Soporte prioritario", "Analytics avanzados", "Personalización de marca", "Sin comisiones ocultas"], cta: "Obtener Pro ahora", highlighted: true },
          ].map((plan, i) => (
            <div key={i} className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-500 ${plan.highlighted
              ? "bg-white/5 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.05)] scale-[1.03] z-10"
              : "bg-[#0D0D0D]/50 border-white/5 hover:border-white/10"
            }`}>
              {plan.highlighted && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#F2F2F2] text-[#0D0D0D] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Recomendado
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-[#BFAFAF] font-light">/mes</span>
                </div>
                <p className="text-[#BFAFAF] text-sm">{plan.desc}</p>
              </div>
              <ul className="flex-grow space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex gap-3 text-sm items-center">
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#F2F2F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[#D9D9D9]">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all group text-center ${plan.highlighted
                ? "bg-[#F2F2F2] text-[#0D0D0D] hover:bg-white"
                : "bg-white/10 text-white hover:bg-white/20"
              }`}>
                {plan.cta}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* ════════════ FINAL CTA ════════════ */}
      <Section dark={false}>
        <div className="relative text-center py-12">
          {/* Glow */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[500px] h-[300px] rounded-full" style={{ background: "radial-gradient(circle, rgba(242,242,242,0.04) 0%, transparent 70%)" }} />
          </div>
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Estás perdiendo ingresos<br />ahora mismo.
            </h2>
            <p className="text-[#BFAFAF] mb-8 max-w-xl mx-auto">
              Recupera un solo pago de $50 y AlyntAI ya se pagó solo. La mayoría de clientes ven 10-50x ROI en el primer mes.
            </p>
            <button onClick={handleCTA}
              className="bg-[#F2F2F2] hover:bg-white text-[#0D0D0D] font-bold text-base py-4 px-10 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_40px_rgba(242,242,242,0.15)]"
            >
              {isSignedIn ? "Ir al dashboard →" : "Empezar prueba gratis →"}
            </button>
            <p className="text-xs text-[#BFAFAF]/50 mt-4">
              Conecta Stripe en 2 minutos · Sin tarjeta de crédito · Cancela en cualquier momento
            </p>
          </div>
        </div>
      </Section>

      {/* ════════════ FOOTER ════════════ */}
      <footer className="bg-[#0F1B27] border-t border-[#F2F2F2]/[0.06] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#BFAFAF]/50">
          <p>© {new Date().getFullYear()} AlyntAI</p>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="hover:text-white transition-colors">Planes</Link>
            {isSignedIn ? (
              <button onClick={async () => {
                try { await signOut(); } catch (e) { console.error(e); }
                finally { localStorage.clear(); sessionStorage.clear(); window.location.href = "/"; }
              }} className="hover:text-white transition-colors">Cerrar sesión</button>
            ) : (
              <button onClick={() => openSignIn({ fallbackRedirectUrl: "/dashboard" })} className="hover:text-white transition-colors">Iniciar sesión</button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0F1B27] flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-[#F2F2F2]/20 border-t-[#F2F2F2] rounded-full animate-spin" />
      </div>
    }>
      <LandingPageContent />
    </Suspense>
  );
}
