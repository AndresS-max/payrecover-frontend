import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function RecuperacionesPage() {
  const { data: pagos, error } = await supabase
    .from("failed_invoices")
    .select("*")
    .order("created_at", { ascending: false });

  const recuperaciones = error || !pagos ? [] : pagos;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold mb-8 tracking-tight text-white">
        Tus Recuperaciones
      </h1>

      {/* Recent Recoveries Table Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold text-white">Historial de Transacciones</h2>
        <Link 
          href="/dashboard/onboarding"
          className="bg-[#635BFF] hover:bg-[#544BD9] text-white font-medium text-sm py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,91,255,0.3)] active:scale-[0.98] flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Nuevo Cliente</span>
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-400 text-sm font-medium">
                <th className="p-4 whitespace-nowrap">Cliente</th>
                <th className="p-4 whitespace-nowrap">Monto</th>
                <th className="p-4 whitespace-nowrap">Estado</th>
                <th className="p-4 whitespace-nowrap">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {recuperaciones.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-zinc-500">
                    No hay recuperaciones registradas.
                  </td>
                </tr>
              ) : (
                recuperaciones.map((recovery) => (
                  <tr key={recovery.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4 text-white font-medium whitespace-nowrap">
                      {recovery.customer_name || "Cliente desconocido"}
                    </td>
                    <td className="p-4 text-zinc-300 whitespace-nowrap">
                      ${recovery.amount_due}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        recovery.status === 'recuperada' || recovery.status === 'Recuperado' 
                          ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                          : recovery.status === 'reintentando' || recovery.status === 'Reintentando' 
                            ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' 
                            : 'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}>
                        {recovery.status || "Desconocido"}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-500 whitespace-nowrap">
                      {recovery.created_at ? new Date(recovery.created_at).toLocaleDateString() : "Sin fecha"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
