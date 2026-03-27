import { ReactNode } from "react";
import { UserButton } from "@clerk/nextjs";
import SidebarNav from "@/components/SidebarNav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
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
              Alynt AI
            </h2>
          </div>
        </div>

        {/* Navegación dinámica */}
        <SidebarNav />

        {/* Footer */}
        <div className="px-4 py-4 border-t border-[#F2F2F2]/[0.06] flex items-center justify-between">
          <span className="text-xs text-[#BFAFAF] font-medium">Mi cuenta</span>
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
