import { currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

export default async function DashboardPage() {
  const user = await currentUser();

  // Consulta 1: Dinero Recuperado
  const { data: recuperadoData, error: recuperadoError } = await supabase
    .from("failed_invoices")
    .select("amount_due")
    .eq("status", "recuperada");

  let totalRecuperado = 0;
  if (!recuperadoError && recuperadoData) {
    totalRecuperado = recuperadoData.reduce((sum, invoice) => sum + (invoice.amount_due || 0), 0);
  }

  // Consulta 2: Pagos Fallidos Activos
  const { count: activosCount, error: activosError } = await supabase
    .from("failed_invoices")
    .select("*", { count: "exact", head: true })
    .neq("status", "recuperada");

  const pagosActivos = activosError ? 0 : (activosCount || 0);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold mb-8 tracking-tight text-white">
        Bienvenido, {user?.firstName} 👋
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 shadow-lg hover:border-[#635BFF]/30 hover:bg-zinc-900 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400 font-medium">Dinero Recuperado</h3>
            <div className="p-2 bg-[#635BFF]/10 rounded-lg">
              <svg className="w-5 h-5 text-[#635BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-white">${totalRecuperado}</span>
            <span className="text-sm text-green-500 font-medium">+12% este mes</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 shadow-lg hover:border-[#635BFF]/30 hover:bg-zinc-900 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400 font-medium">Pagos Fallidos Activos</h3>
            <div className="p-2 bg-red-500/10 rounded-lg">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-white">{pagosActivos}</span>
            <span className="text-sm text-zinc-500 font-medium">requieren atención</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 shadow-lg hover:border-[#635BFF]/30 hover:bg-zinc-900 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-zinc-400 font-medium">Tasa de Éxito</h3>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-white">85%</span>
            <span className="text-sm text-green-500 font-medium">muy buena</span>
          </div>
        </div>
      </div>
    </div>
  );
}
