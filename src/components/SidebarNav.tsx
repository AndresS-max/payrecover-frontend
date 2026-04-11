"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/dashboard",
    label: "Inicio",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    ),
  },
  {
    href: "/dashboard/recuperaciones",
    label: "Recuperaciones",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },

];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 p-3 space-y-1">
      {navItems.map(({ href, label, icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${isActive
              ? "bg-[#F2F2F2]/10 text-[#F2F2F2] border border-[#F2F2F2]/15"
              : "text-[#BFAFAF] hover:text-[#F2F2F2] hover:bg-[#F2F2F2]/5 border border-transparent"
              }`}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {icon}
            </svg>
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
