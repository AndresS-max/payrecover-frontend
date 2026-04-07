import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { getProDashboardMetrics } from "@/lib/dashboardMetrics";
import { ProDashboardMetrics } from "@/components/ProDashboardMetrics";
import { BasicDashboardMetrics } from "@/components/BasicDashboardMetrics";

import { getUserPlan } from "@/lib/subscriptions";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    return <div className="text-red-500">Error: Usuario no autenticado</div>;
  }

  // Consulta real a Supabase para determinar el plan del usuario
  const { isPro } = await getUserPlan(user.id);

  const metrics = isPro ? await getProDashboardMetrics() : null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F2F2F2]">
            Hola, {user?.firstName} 👋
          </h1>
          <p className="text-sm text-[#BFAFAF] mt-0.5 font-light">
            Aquí está el resumen de tu actividad financiera
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

      {/* Conditional Dashboard Rendering */}
      {isPro && metrics ? (
        <ProDashboardMetrics 
          lostAmount={metrics.lostAmount} 
          recoveredAmount={metrics.recoveredAmount} 
          recoveryRate={metrics.recoveryRate} 
        />
      ) : (
        <BasicDashboardMetrics />
      )}
    </div>
  );
}
