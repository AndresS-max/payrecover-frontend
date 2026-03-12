"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

const mockRecoveries = [
  { id: 1, client: "María López", amount: "$150", status: "Recuperado", date: "12 Mar 2026" },
  { id: 2, client: "Juan Pérez", amount: "$89", status: "Reintentando", date: "11 Mar 2026" },
  { id: 3, client: "Ana García", amount: "$299", status: "Fallido", date: "10 Mar 2026" },
  { id: 4, client: "Carlos Ruiz", amount: "$45", status: "Recuperado", date: "09 Mar 2026" },
];

export default function DashboardPage() {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", amount: "" });

  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    alert("¡Cliente registrado! (Simulado)");
    setIsModalOpen(false);
    setFormData({ name: "", email: "", amount: "" });
  };

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
      
      {/* Recent Recoveries Table Header */}
      <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold text-white">Historial de Transacciones</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#635BFF] hover:bg-[#544BD9] text-white font-medium text-sm py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,91,255,0.3)] active:scale-[0.98] flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Nuevo Cliente</span>
        </button>
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
                {mockRecoveries.map((recovery) => (
                  <tr key={recovery.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4 text-white font-medium whitespace-nowrap">{recovery.client}</td>
                    <td className="p-4 text-zinc-300 whitespace-nowrap">{recovery.amount}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        recovery.status === 'Recuperado' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                        recovery.status === 'Reintentando' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                        'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}>
                        {recovery.status}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-500 whitespace-nowrap">{recovery.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      {/* Modal for New Client */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-950 border border-zinc-800 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Agregar Nuevo Cliente</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSaveClient} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Nombre del Cliente</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]/50 focus:border-[#635BFF] transition-all"
                  placeholder="Ej. María López"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Correo Electrónico</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]/50 focus:border-[#635BFF] transition-all"
                  placeholder="Ej. maria@ejemplo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Monto Adeudado ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]/50 focus:border-[#635BFF] transition-all"
                  placeholder="Ej. 150.00"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-zinc-800/50 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#635BFF] hover:bg-[#544BD9] text-white font-medium text-sm py-2 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-[#635BFF]/20"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
