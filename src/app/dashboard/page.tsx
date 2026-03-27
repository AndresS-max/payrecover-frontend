import { currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function DashboardPage() {
  // ✅ Todas las queries en paralelo — ~5x más rápido
  const [
    user,
    { data: recuperadoData },
    { data: comisionesData },
    { count: activosCount },
    { count: totalCount },
    { count: recoveredCount },
  ] = await Promise.all([
    currentUser(),
    supabase.from("failed_invoices").select("amount_paid").eq("status", "recovered"),
    supabase.from("failed_invoices").select("commission_amount").eq("status", "recovered"),
    supabase.from("failed_invoices").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("failed_invoices").select("*", { count: "exact", head: true }),
    supabase.from("failed_invoices").select("*", { count: "exact", head: true }).eq("status", "recovered"),
  ]);

  const totalRecuperado = (
    (recuperadoData?.reduce((sum, inv) => sum + (inv.amount_paid || 0), 0) ?? 0) / 100
  ).toFixed(2);

  const comisionesPendientes = (
    (comisionesData?.reduce((sum, inv) => sum + (inv.commission_amount || 0), 0) ?? 0) / 100
  ).toFixed(2);

  const pagosActivos = activosCount ?? 0;

  const tasaExito =
    totalCount && totalCount > 0
      ? Math.round(((recoveredCount ?? 0) / totalCount) * 100)
      : 0;

  const cards = [
    {
      title: "Dinero Recuperado",
      value: `$${totalRecuperado}`,
      sub: "total acumulado",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      accent: "#F2F2F2",
    },
    {
      title: "Pagos Fallidos Activos",
      value: String(pagosActivos),
      sub: "requieren atención",
      icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
      accent: "#BFAFAF",
    },
    {
      title: "Tasa de Éxito",
      value: `${tasaExito}%`,
      sub: "del total procesado",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      accent: "#D9D9D9",
    },
    {
      title: "Comisiones Alynt AI",
      value: `$${comisionesPendientes}`,
      sub: "15% sobre recuperado",
      icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
      accent: "#F2F2F2",
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F2F2F2]">
            Hola, {user?.firstName} 👋
          </h1>
          <p className="text-sm text-[#BFAFAF] mt-0.5 font-light">
            Aquí está el resumen de tu actividad
          </p>
        </div>

        <Link
          href="/dashboard/onboarding"
          className="flex items-center gap-2 bg-[#F2F2F2]/10 hover:bg-[#F2F2F2]/15 text-[#F2F2F2] font-semibold py-2.5 px-5 rounded-xl transition-all duration-200 border border-[#F2F2F2]/15 text-sm active:scale-[0.98]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Conectar Stripe
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ title, value, sub, icon, accent }) => (
          <div
            key={title}
            className="bg-[#0D0D0D]/60 p-6 rounded-2xl border border-[#F2F2F2]/[0.07] hover:border-[#F2F2F2]/15 hover:bg-[#0D0D0D]/80 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-5">
              <p className="text-xs text-[#BFAFAF] font-medium uppercase tracking-wider leading-tight">
                {title}
              </p>
              <div className="p-1.5 rounded-lg bg-[#F2F2F2]/[0.06] group-hover:bg-[#F2F2F2]/10 transition-colors">
                <svg className="w-4 h-4" style={{ color: accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-extrabold text-[#F2F2F2]">{value}</p>
            {sub && <p className="text-xs text-[#BFAFAF]/70 mt-1.5 font-light">{sub}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
