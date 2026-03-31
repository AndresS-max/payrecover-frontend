"use client";
import { useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function LandingPage() {
  const { openSignIn, signOut } = useClerk();
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-[#0F1B27] text-[#F2F2F2] flex flex-col items-center justify-center p-6 selection:bg-[#F2F2F2]/20 selection:text-white relative overflow-hidden">

      {/* Grid de fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(242,242,242,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(242,242,242,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Glow central */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(242,242,242,0.04) 0%, transparent 70%)" }}
      />

      {/* Badge */}
      <div className="relative mb-10 flex items-center gap-2 bg-[#0D0D0D] border border-[#F2F2F2]/10 rounded-full px-5 py-2 text-sm text-[#BFAFAF]">
        <span className="w-2 h-2 rounded-full bg-[#F2F2F2]/60 animate-pulse" />
        Sistema activo en producción
      </div>

      <main className="relative text-center max-w-3xl flex flex-col items-center w-full gap-5">

        <h1
          className="text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter"
          style={{
            background: "linear-gradient(135deg, #F2F2F2 0%, #BFAFAF 60%, #D9D9D9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Alynt AI
        </h1>

        <p className="text-lg sm:text-xl text-[#BFAFAF] max-w-xl leading-relaxed font-light">
          Recupera tus pagos fallidos en piloto automático.<br />
          Sin intervención manual. Sin perder clientes.
        </p>

        {/* Stats */}
        <div className="flex items-center gap-10 my-4">
          {[
            { value: "15%", label: "solo si recuperas" },
            { value: "3",   label: "emails automáticos" },
            { value: "$0",  label: "costo fijo" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-[#F2F2F2]">{value}</span>
              <span className="text-xs text-[#BFAFAF]">{label}</span>
            </div>
          ))}
        </div>

        <div className="w-32 h-px bg-[#F2F2F2]/10 my-1" />

        {/* CTA — sin SignedIn / SignedOut */}
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          {isSignedIn ? (
            <div className="flex flex-col items-center gap-3">
              <Link
                href="/dashboard"
                className="bg-[#F2F2F2] hover:bg-[#D9D9D9] text-[#0D0D0D] font-semibold text-base py-3.5 px-8 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full max-w-xs"
              >
                Ir al dashboard →
              </Link>
              <button
                onClick={() => signOut()}
                className="text-xs text-[#BFAFAF] hover:text-white underline transition-colors"
                title="Limpiar sesión local si ocurre un error"
              >
                Cerrar sesión (O limpiar error)
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openSignIn({ fallbackRedirectUrl: "/dashboard" })}
              className="bg-[#F2F2F2] hover:bg-[#D9D9D9] text-[#0D0D0D] font-semibold text-base py-3.5 px-8 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(242,242,242,0.15)]"
            >
              Entrar con Google →
            </button>
          )}
        </div>

        <p className="text-xs text-[#BFAFAF]/50 mt-1">
          Sin tarjeta de crédito. Pagas solo cuando recuperas.
        </p>
      </main>
    </div>
  );
}
