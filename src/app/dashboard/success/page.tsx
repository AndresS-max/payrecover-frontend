import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function StripeConnectSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-8 text-center border border-zinc-100 dark:border-zinc-800">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
            <CheckCircle className="w-16 h-16 text-green-500" strokeWidth={1.5} />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          ¡Cuenta de Stripe conectada con éxito!
        </h1>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
          Tu cuenta está lista. Alynt AI ya puede empezar a rastrear y recuperar tus pagos fallidos de forma segura.
        </p>
        
        <Link 
          href="/dashboard"
          className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-[#F2F2F2] transition-colors bg-[#0F1B27] rounded-lg hover:bg-[#0D0D0D] focus:outline-none focus:ring-2 focus:ring-[#0F1B27] focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
        >
          Ir al panel principal
        </Link>
      </div>
    </div>
  );
}
