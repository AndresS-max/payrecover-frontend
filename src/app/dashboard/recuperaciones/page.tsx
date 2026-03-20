import { supabase } from "@/lib/supabase";
import Link from "next/link";

// Formatea centavos a moneda legible: 10050 → "$100.50"
function formatAmount(cents: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

// Mapea el status de la DB (inglés) a etiqueta visual en español
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; classes: string }> = {
    recovered: {
      label: "Recuperado",
      classes: "bg-green-500/10 text-green-500 border-green-500/20",
    },
    pending: {
      label: "Pendiente",
      classes: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    },
    written_off: {
      label: "Incobrable",
      classes: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    },
  };
  const s = map[status] ?? {
    label: status ?? "Desconocido",
    classes: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${s.classes}`}>
      {s.label}
    </span>
  );
}

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

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold text-white">Historial de Transacciones</h2>
        <div className="flex items-center gap-3">
          {/* Exportar CSV */}
          <a
            href="/api/export"
            download
            className="flex items-center space-x-2 text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 font-medium text-sm py-2 px-4 rounded-lg transition-all duration-300 active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Descargar CSV</span>
          </a>

          {/* Nuevo Cliente */}
          <Link
            href="/dashboard/onboarding"
            className="bg-[#635BFF] hover:bg-[#544BD9] text-white font-medium text-sm py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,91,255,0.3)] active:scale-[0.98] flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Nuevo Cliente</span>
          </Link>
        </div>
      </div>

      {/* Table */}
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
                    No hay recuperaciones registradas aún.
                  </td>
                </tr>
              ) : (
                recuperaciones.map((recovery) => (
                  <tr key={recovery.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4 text-white font-medium whitespace-nowrap">
                      {recovery.stripe_customer_id || "Cliente desconocido"}
                    </td>
                    <td className="p-4 text-zinc-300 whitespace-nowrap">
                      {formatAmount(recovery.amount_due || 0, recovery.currency)}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <StatusBadge status={recovery.status} />
                    </td>
                    <td className="p-4 text-zinc-500 whitespace-nowrap">
                      {recovery.created_at
                        ? new Date(recovery.created_at).toLocaleDateString("es-GT")
                        : "Sin fecha"}
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
