export default function DashboardPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold mb-8 tracking-tight text-white">
        Visión General
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
            <span className="text-3xl font-bold text-white">$1,250</span>
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
            <span className="text-3xl font-bold text-white">12</span>
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
      
      {/* Empty State / Table Placeholder for the future */}
      <div className="mt-10 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 text-center border-dashed">
        <div className="mx-auto w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white mb-2">Historial de Transacciones</h3>
        <p className="text-zinc-500 max-w-sm mx-auto">
          Pronto verás aquí la lista detallada de todos los pagos recuperados automáticamente.
        </p>
      </div>
    </div>
  );
}
