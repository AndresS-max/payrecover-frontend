import { ReactNode } from "react";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import SidebarNav from "@/components/SidebarNav";
import { getUserPlan } from "@/lib/subscriptions";
import { SidebarUpgradeBanner } from "@/components/SidebarUpgradeBanner";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await currentUser();
  const { isPro } = user ? await getUserPlan(user.id) : { isPro: false };

  return (
    <div className="flex h-screen bg-[#0F1B27] text-[#F2F2F2] selection:bg-[#F2F2F2]/20">

      {/* Sidebar */}
      <aside className="w-60 bg-[#0D0D0D] border-r border-[#F2F2F2]/[0.06] flex flex-col">

        {/* Logo */}
        <div className="px-5 py-6 border-b border-[#F2F2F2]/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#F2F2F2] flex items-center justify-center">
              <span className="text-[#0D0D0D] text-sm font-extrabold leading-none">A</span>
            </div>
            <h2 className="text-base font-bold text-[#F2F2F2] tracking-tight">
              AlyntAI
            </h2>
          </div>
        </div>

        {/* Navegación dinámica */}
        <SidebarNav />

        {/* Upgrade Banner (solo para usuarios sin Pro) */}
        {!isPro && (
          <div className="px-3 mt-auto mb-2">
            <SidebarUpgradeBanner />
          </div>
        )}

        {/* Footer */}
        <div className="px-4 py-4 border-t border-[#F2F2F2]/[0.06] flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs text-[#BFAFAF] font-medium hover:text-[#F2F2F2] transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-[#F2F2F2]/5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Inicio
          </Link>
          <UserButton />
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 overflow-y-auto bg-[#0F1B27] p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
