import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AlyntAI",
  description: "Recupera tus pagos fallidos en piloto automático",
  metadataBase: new URL("https://alyntai.com"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      appearance={{
        baseTheme: dark,
        variables: {
          colorBackground: "#0F1B27",
          colorInputBackground: "#0D0D0D",
          colorPrimary: "#F2F2F2",
          colorText: "#F2F2F2",
          colorTextSecondary: "#BFAFAF",
          colorNeutral: "#D9D9D9",
          borderRadius: "0.75rem",
          fontFamily: "var(--font-nunito), sans-serif",
        },
        elements: {
          card: "bg-[#0D0D0D] border border-[#F2F2F2]/10 shadow-2xl",
          formButtonPrimary: "bg-[#F2F2F2] text-[#0D0D0D] hover:bg-[#D9D9D9] font-semibold",
          headerTitle: "text-[#F2F2F2] font-extrabold",
          headerSubtitle: "text-[#BFAFAF]",
        },
      }}
    >
      <html lang="es" className={nunito.variable}>
        <body className="font-nunito antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
