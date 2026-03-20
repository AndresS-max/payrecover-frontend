import { currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await currentUser();

  // Consulta 1: Dinero Recuperado — status correcto: 'recovered' (backend escribe en inglés)
  const { data: recuperadoData, error: recuperadoError } = await supabase
    .from("failed_invoices")
    .select("amount_due")
    .eq("status", "recovered");

  if (recuperadoError) {
    console.error("Error al obtener dinero recuperado:", recuperadoError);
  }

  // amount_due está en centavos en Stripe — dividir entre 100
  let totalRecuperadoCents = 0;
  if (!recuperadoError && recuperadoData) {
    totalRecuperadoCents = recuperadoData.reduce(
      (sum: number, invoice: { amount_due: number }) => sum + (invoice.amount_due || 0),
      0
    );
  }
  const totalRecuperado = (totalRecuperadoCents / 100).toFixed(2);
  const comisionesPendientes = (totalRecuperadoCents * 0.15 / 100).toFixed(2);

  // Consulta 2: Pagos Fallidos Activos (pending)
  const { count: activosCount, error: activosError } = await supabase
    .from("failed_invoices")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  if (activosError) {
    console.error("Error al obtener pagos activos:", activosError);
  }
  const pagosActivos = activosError ? 0 : (activosCount || 0);

  // Consulta 3: Total de facturas para calcular tasa de éxito real
  const { count: totalCount } = await supabase
    .from("failed_invoices")
    .select("*", { count: "exact", head: true });

  const { count: recoveredCount } = await supabase
    .from("failed_invoices")
    .select("*", { count: "exact", head: true })
    .eq("status", "recovered");

  const tasaExito =
    totalCount && totalCount > 0
      ? Math.round(((recoveredCount || 0) / totalCount) * 100)
      : 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Bienvenido, {user?.firstName} 👋
        </h1>
        <Link
          href="/dashboard/onboarding"
          className="bg-[#635BFF] hover:bg-[#544BD9] text-white font-medium py-2.5 px-6 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(99,91,255,0.2)] hover:shadow-[0_0_30px_rgba(99,91,255,0.4)] active:scale-[0.98] flex items-center space-x-2 border border-[#635BFF]/50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span>Conectar cuenta de Stripe</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 — Dinero Recuperado */}
        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 shadow-lg hover:border-[#635BFF]/30 hover:bg-zinc-900 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400 font-medium">Dinero Recuperado</h3>
            <div className="p-2 bg-[#635BFF]/10 rounded-lg">
              <svg className="w-5 h-5 text-[#635BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-white">${totalRecuperado}</span>
          </div>
        </div>

        {/* Card 2 — Pagos Fallidos Activos */}
        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 shadow-lg hover:border-[#635BFF]/30 hover:bg-zinc-900 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400 font-medium">Pagos Fallidos Activos</h3>
            <div className="p-2 bg-red-500/10 rounded-lg">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-white">{pagosActivos}</span>
            <span className="text-sm text-zinc-500 font-medium">requieren atención</span>
          </div>
        </div>

        {/* Card 3 — Tasa de Éxito (calculada en tiempo real) */}
        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 shadow-lg hover:border-[#635BFF]/30 hover:bg-zinc-900 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400 font-medium">Tasa de Éxito</h3>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-white">{tasaExito}%</span>
            <span className="text-sm text-zinc-500 font-medium">del total</span>
          </div>
        </div>

        {/* Card 4 — Comisiones Dunnify */}
        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 shadow-lg hover:border-[#635BFF]/30 hover:bg-zinc-900 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis">Comisiones Dunnify (15%)</h3>
            <div className="p-2 bg-[#635BFF]/10 rounded-lg flex-shrink-0">
              <svg className="w-5 h-5 text-[#635BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-3xl font-bold text-white">${comisionesPendientes}</span>
            <p className="text-xs text-zinc-400 mt-2 font-medium">
              Calculado sobre total recuperado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
