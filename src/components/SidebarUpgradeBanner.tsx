import { Lock } from "lucide-react";
import Link from "next/link";

export function SidebarUpgradeBanner() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-[#0a0a0a] p-4">
      <div className="flex flex-col items-center text-center gap-3">
        <div className="p-2.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
          <Lock className="w-4 h-4 text-white/80" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-white mb-1">Análisis Financiero Avanzado</h3>
          <p className="text-[10px] text-gray-400 leading-relaxed">
            Métricas en tiempo real de tu capital en riesgo vs capital salvado.
          </p>
        </div>
        <Link
          href="/pricing"
          className="w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-medium transition-colors shadow-[0_0_15px_rgba(16,185,129,0.15)]"
        >
          Upgrade a Pro
        </Link>
      </div>
    </div>
  );
}
