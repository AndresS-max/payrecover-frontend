export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 font-sans selection:bg-[#635BFF] selection:text-white">
      <main className="text-center max-w-2xl flex flex-col items-center w-full bg-zinc-900/50 p-10 md:p-16 rounded-3xl border border-zinc-800 shadow-2xl backdrop-blur-sm animate-in fade-in zoom-in duration-500">
        
        {/* Animated Check Icon */}
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8 border border-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
          <svg 
            className="w-12 h-12 text-green-500 animate-[bounce_2s_ease-in-out_infinite]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-400">
          ¡Conexión Exitosa!
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed font-light">
          Tu cuenta de Stripe está vinculada. Ya estamos listos para recuperar tus pagos.
        </p>

        <a 
          href="/dashboard" 
          className="bg-[#635BFF] hover:bg-[#544BD9] text-white font-medium text-lg py-4 px-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(99,91,255,0.3)] active:scale-[0.98] w-full sm:w-auto"
        >
          Ir a mi Panel de Control
        </a>

      </main>
    </div>
  );
}
