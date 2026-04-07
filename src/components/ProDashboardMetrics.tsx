import { TrendingUp, AlertCircle, ShieldCheck } from "lucide-react";

interface ProDashboardMetricsProps {
  lostAmount: number;
  recoveredAmount: number;
  recoveryRate: number;
}

export function ProDashboardMetrics({ lostAmount, recoveredAmount, recoveryRate }: ProDashboardMetricsProps) {
  const isExcellent = recoveryRate >= 70;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. Pagos Recuperados - Verde Esmeralda */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#022c1b]/60 to-[#041d13]/80 border border-emerald-500/20 rounded-3xl p-6 backdrop-blur-xl group hover:border-emerald-500/40 transition-all duration-300">
        <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/20 transition-all duration-500"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-emerald-400/80 text-sm font-semibold tracking-wide uppercase">Pagos Recuperados</p>
              <p className="text-xs text-emerald-400/50 mt-1">Convertidos a exitosos</p>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-emerald-50 tracking-tight">
              ${recoveredAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Pagos Perdidos - Naranja Cálido */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#3b1a05]/60 to-[#241103]/80 border border-orange-500/20 rounded-3xl p-6 backdrop-blur-xl group hover:border-orange-500/40 transition-all duration-300">
        <div className="absolute top-0 right-0 p-32 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-orange-500/20 transition-all duration-500"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-orange-400/80 text-sm font-semibold tracking-wide uppercase">Dificultad de Cobro</p>
              <p className="text-xs text-orange-400/50 mt-1">Requieren atención (Perdidos)</p>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-2xl border border-orange-500/20 group-hover:bg-orange-500/20 transition-colors">
              <AlertCircle className="w-5 h-5 text-orange-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-orange-50 tracking-tight">
              ${lostAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Tasa de Recuperación - Tono Alynt */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1a1a1a]/60 to-[#0d0d0d]/80 border border-white/10 rounded-3xl p-6 backdrop-blur-xl group hover:border-white/20 transition-all duration-300">
        <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-all duration-500"></div>
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-300 text-sm font-semibold tracking-wide uppercase">Tasa de Recuperación</p>
              <p className="text-xs text-gray-500 mt-1">Rendimiento sobre capital</p>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
              <ShieldCheck className={`w-5 h-5 ${isExcellent ? 'text-emerald-400' : 'text-gray-300'}`} />
            </div>
          </div>
          
          <div>
            <div className="flex items-end gap-3 mb-3">
              <span className={`text-4xl font-black tracking-tight ${isExcellent ? 'text-emerald-400' : 'text-white'}`}>
                {recoveryRate}%
              </span>
              {isExcellent && <span className="text-xs text-emerald-400/80 mb-1.5 font-medium">¡Excelente!</span>}
            </div>
            {/* Barra de Progreso */}
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out ${isExcellent ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-white/50'}`}
                style={{ width: `${recoveryRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
