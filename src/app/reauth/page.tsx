import Link from "next/link";

export default function ReauthPage() {
  return (
    <div className="min-h-screen bg-[#0F1B27] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center bg-[#0D0D0D] border border-[#F2F2F2]/[0.07] p-8 rounded-3xl shadow-xl animate-in fade-in zoom-in duration-500">

        {/* Warning Icon */}
        <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-500/20 shadow-[0_0_30px_rgba(234,179,8,0.15)]">
          <svg
            className="w-10 h-10 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">
          Conexión Interrumpida
        </h1>

        <p className="text-[#BFAFAF] mb-8 leading-relaxed">
          El proceso de conexión con Stripe fue cancelado o el enlace expiró por seguridad. No te preocupes, puedes volver a generarlo.
        </p>

        <Link
          href="/dashboard/onboarding"
          className="bg-[#F2F2F2] hover:bg-[#D9D9D9] text-[#0D0D0D] font-medium py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(242,242,242,0.15)] active:scale-[0.98] inline-flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Volver a intentar</span>
        </Link>
      </div>
    </div>
  );
}
