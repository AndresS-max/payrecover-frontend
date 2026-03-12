export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 font-sans selection:bg-[#635BFF] selection:text-white">
      <main className="text-center max-w-4xl flex flex-col items-center w-full">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-500">
          PayRecover
        </h1>

        <p className="text-xl sm:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          Recupera tus pagos fallidos en piloto automático y aumenta la retención de tus clientes.
        </p>

        <button
          type="button"
          className="bg-[#635BFF] hover:bg-[#544BD9] text-white font-medium text-lg sm:text-xl py-4 flex items-center justify-center px-10 rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(99,91,255,0.3)] active:scale-[0.98]"
        >
          Conectar con Stripe
        </button>
      </main>
    </div>
  );
}
