import { Lock } from "lucide-react";

export function BasicDashboardMetrics() {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-[#0a0a0a]">
      
      {/* Fake UI borrosa detrás */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 blur-[6px] opacity-40 select-none pointer-events-none">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/5 h-32 rounded-2xl border border-white/5 p-4 flex flex-col justify-between">
            <div className="h-4 w-1/2 bg-white/10 rounded"></div>
            <div className="h-8 w-3/4 bg-white/10 rounded"></div>
          </div>
        ))}
      </div>

      {/* Superposición "Upgrade a Pro" */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent">
        <div className="p-4 bg-white/5 rounded-full mb-4 border border-white/10 backdrop-blur-md">
          <Lock className="w-6 h-6 text-white/80" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Desbloquea Análisis Financiero Avanzado</h3>
        <p className="text-sm text-gray-400 max-w-md mb-6">
          Obtén métricas en tiempo real de tu capital en riesgo (Pagos perdidos) vs capital salvado (Pagos recuperados) con el Plan Pro.
        </p>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          Hacer Upgrade a Pro
        </button>
      </div>

    </div>
  );
}
