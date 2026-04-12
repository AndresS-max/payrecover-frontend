import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-deep relative">
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight transition-colors text-primary">AlyntAI</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/sign-in" className="text-sm transition-colors px-3 py-1.5 rounded-md font-medium text-muted hover:text-primary">
              Log in
            </Link>
            <Link href="/sign-up" className="text-sm px-4 py-1.5 rounded-md font-medium transition-all bg-primary text-black hover:bg-primary/90">
              Start free trial
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-32 md:pt-44 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid mask-radial pointer-events-none opacity-30"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-soft px-4 py-1.5 text-xs font-medium mb-8 bg-card/[0.5] text-primary hover-lift">
            <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse-subtle"></span>
            $9.99/mo flat — no el 30% de lo que recuperamos
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-[-0.04em] leading-[1.05] mb-6 text-primary">
            Tu herramienta de dunning<br/>cobra comisión. Nosotros no.
          </h1>
          <p className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed text-muted">
            Recuperación de pagos con IA para SaaS. Reintentos inteligentes, emails personalizados, dashboard ROI en tiempo real. Conecta Stripe en 2 minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/sign-up" className="inline-flex items-center justify-center whitespace-nowrap font-medium h-11 rounded-md gap-2 bg-primary hover:opacity-90 text-[black] border-0 cta-glow text-sm px-6 transition-all">
              Comenzar prueba gratis
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center whitespace-nowrap font-medium border h-11 rounded-md px-8 border-soft text-primary bg-white/5 hover:bg-white/10 text-sm transition-all hover-lift">
              Ver planes
            </Link>
          </div>
          <p className="text-[11px] text-muted/50 mt-5">Prueba gratis · Sin tarjeta de crédito · Cancela en cualquier momento</p>
        </div>
      </section>

      <section className="relative -mt-8 max-w-4xl mx-auto px-6 pb-20 hover-lift">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5 rounded-xl overflow-hidden shadow-xl border border-soft">
          <div className="bg-card p-7 md:p-8 text-center transition-colors hover:bg-[#152739]">
            <span className="font-mono text-3xl md:text-4xl font-bold tabular-nums tracking-tight text-primary">$1B+</span>
            <p className="text-sm text-muted mt-1.5">Perdidos por pagos fallidos anualmente</p>
            <p className="text-[10px] text-muted/60 mt-0.5">Recurly, reporte 2024</p>
          </div>
          <div className="bg-card p-7 md:p-8 text-center transition-colors hover:bg-[#152739]">
            <span className="font-mono text-3xl md:text-4xl font-bold tabular-nums tracking-tight text-loss">9%</span>
            <p className="text-sm text-muted mt-1.5">De los pagos recurrentes fallan en silencio</p>
            <p className="text-[10px] text-muted/60 mt-0.5">Promedio de la industria</p>
          </div>
          <div className="bg-card p-7 md:p-8 text-center transition-colors hover:bg-[#152739]">
            <span className="font-mono text-3xl md:text-4xl font-bold tabular-nums tracking-tight text-success">48%</span>
            <p className="text-sm text-muted mt-1.5">Tasa media de recuperación</p>
            <p className="text-[10px] text-muted/60 mt-0.5">Métrica destacada AlyntAI</p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-20 text-center">
        <p className="text-primary text-sm uppercase tracking-wider font-medium mb-4">El problema</p>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary mb-4">Estás perdiendo ingresos ahora mismo y no lo sabes</h2>
        <p className="text-muted max-w-lg mx-auto leading-relaxed">Los pagos fallidos son la causa número 1 de churn involuntario. Los reintentos automáticos de Stripe recuperan algo — pero sin el momento adecuado y contacto personalizado, estás dejando más del 50% en la mesa. Cada hora sin dunning son ingresos que se esfuman.</p>
      </section>

      <section id="how-it-works" className="bg-card-alt py-20 border-y border-soft">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-muted text-sm uppercase tracking-wider font-medium mb-3">Cómo funciona</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-3">Tres pasos. Dos minutos.</h2>
            <p className="text-muted text-sm">Sin ingeniería, sin complicadas integraciones. Sólo ingresos.</p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-lg border border-soft bg-card hover:border-primary/30 transition-all hover-lift shadow-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center transition-colors">
                      <span className="text-primary font-bold text-lg">1</span>
                    </div>
                    <span className="font-mono text-xs text-muted/40">01</span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1.5 text-primary">Conecta Stripe</h3>
                  <p className="text-sm text-muted leading-relaxed">Vinculación OAuth de un solo clic. Sin código, sin tokens expuestos. Toma literalmente 30 segundos.</p>
                </div>
              </div>
              <div className="rounded-lg border border-soft bg-card hover:border-primary/30 transition-all hover-lift shadow-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center transition-colors">
                      <span className="text-primary font-bold text-lg">2</span>
                    </div>
                    <span className="font-mono text-xs text-muted/40">02</span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1.5 text-primary">La IA monitorea y recupera</h3>
                  <p className="text-sm text-muted leading-relaxed">Reintentos inteligentes programados junto a emails redactados hiper-personalizados para cada fallo.</p>
                </div>
              </div>
              <div className="rounded-lg border border-soft bg-card hover:border-primary/30 transition-all hover-lift shadow-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center transition-colors">
                      <span className="text-primary font-bold text-lg">3</span>
                    </div>
                    <span className="font-mono text-xs text-muted/40">03</span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1.5 text-primary">Atrapa los ingresos perder</h3>
                  <p className="text-sm text-muted leading-relaxed">El dashboard en tiempo real muestra cada dólar recuperado a tu cuenta y tu ROI exacto del mes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary text-sm uppercase tracking-wider font-medium mb-3 opacity-90">Dashboard en tiempo real</p>
              <h2 className="text-3xl font-bold tracking-tight text-primary mb-4">Ve cada centavo recuperado</h2>
              <p className="text-muted leading-relaxed mb-6">Sin porcentajes ocultos. Sin reportes vagos. Tu dashboard muestra exactamente cuánto AlyntAI te devolvió, tu tasa de recuperación y el ROI neto tras nuestro modesto costo.</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted">Tasa de recuperación, fallos y ROI neto en tiempo real.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted">Estado por pago individualizado de todos los cobros.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted">Insights generados por inteligencia artificial visuales.</span>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl border border-soft bg-card-alt overflow-hidden shadow-2xl hover-lift shadow-black/80">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-soft">
                <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-white/20"></div><div className="w-2.5 h-2.5 rounded-full bg-white/20"></div><div className="w-2.5 h-2.5 rounded-full bg-white/20"></div></div>
                <div className="flex-1 flex justify-center"><div className="bg-white/5 rounded px-3 py-0.5 text-[10px] text-muted font-mono">app.alyntai.com/dashboard</div></div>
                <div className="w-12"></div>
              </div>
              <div className="p-5 space-y-4">
                <div className="rounded-lg p-4 border border-soft bg-card flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium flex items-center gap-1.5"><span className="text-success tracking-wide">Recuperado $4,520</span></p>
                    <p className="text-[10px] text-muted/60 mt-0.5">Costo fjo $9.99 — ROI Neto: $+4,510</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xl font-semibold tabular-nums text-success">46%</p>
                    <p className="text-[10px] text-muted/60">Tasa recup.</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-px bg-white/5 rounded-lg overflow-hidden border border-soft">
                  <div className="bg-card p-3.5"><p className="text-[10px] text-muted/60 mb-1">Recup</p><p className="font-mono text-sm font-semibold tabular-nums text-success">$4k</p></div>
                  <div className="bg-card p-3.5"><p className="text-[10px] text-muted/60 mb-1">Fallos</p><p className="font-mono text-sm font-semibold tabular-nums text-loss">$9k</p></div>
                  <div className="bg-card p-3.5"><p className="text-[10px] text-muted/60 mb-1">Tasa</p><p className="font-mono text-sm font-semibold tabular-nums text-primary">46%</p></div>
                  <div className="bg-card p-3.5"><p className="text-[10px] text-muted/60 mb-1">Neto</p><p className="font-mono text-sm font-semibold tabular-nums text-success">$4k</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card-alt py-20 border-y border-soft">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            <div className="order-2 md:order-1">
              <div className="rounded-xl border border-soft bg-card shadow-lg shadow-black/80 hover-lift overflow-hidden max-w-md mx-auto">
                <div className="px-5 py-3 border-b border-soft bg-black/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">IA</div>
                    <div><p className="text-xs font-medium text-primary">AlyntAI Recovery</p><p className="text-[10px] text-muted">billing@tu-saas.com</p></div>
                  </div>
                  <p className="text-xs font-medium text-primary">Acción rápida para tu suscripción de ACME</p>
                </div>
                <div className="px-5 py-4 space-y-3">
                  <p className="text-xs text-muted leading-relaxed">Hola Sarah,</p>
                  <p className="text-xs text-muted leading-relaxed">Notamos que tu pago por <span className="font-medium text-primary">$89.00</span> para el plan Pro no se completó. Esto ocurre a menudo cuando un banco bloquea un cobro de tarjeta por límite o expiración.</p>
                  <p className="text-xs text-muted leading-relaxed">Para que no pierdas el acceso de tu cuenta de forma abrupta, solo usa el botón seguro debajo para emitir un nuevo intento.</p>
                  <div className="pt-1"><div className="inline-flex items-center justify-center bg-primary text-black px-5 py-2 rounded-md text-xs font-medium">Actualizar Método de Pago</div></div>
                </div>
                <div className="px-5 py-2.5 border-t border-soft bg-black/20">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-subtle"></div>
                    <p className="text-[10px] text-muted/70">Contexto IA — generado a partir de motivo de declive</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <p className="text-primary text-sm uppercase tracking-wider font-medium mb-3 opacity-90">Emails IA</p>
              <h2 className="text-3xl font-bold tracking-tight text-primary mb-4">Cero plantillas. Sólo respuestas directas.</h2>
              <p className="text-muted leading-relaxed mb-6">Un email genérico es un ticket a tu papelera. AlyntAI redacta cada punto en base a métricas contextuales, creando sentido de urgencia natural y empático.</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted">Secuencias de urgencia con 3 correos integrales</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted">Aviso amigable, Recordatorio, y Expiración</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted">Sincronización instantánea con webhook al cobrar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" id="pricing">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-muted text-sm uppercase tracking-wider font-medium mb-3">Los Precios</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-3">Ellos muerden tu ganancia.<br/>Nosotros cobramos al ras.</h2>
            <p className="text-muted text-sm max-w-lg mx-auto leading-relaxed">Otros exigen del 15% al 30% del volumen recuperado por encima de rentas exorbitantes. Alynt AI cobra una de dos tarifas planas. Absolutamente todo el capital retorna a tu flujo de caja de SaaS.</p>
          </div>
          
          <div className="rounded-xl border border-soft bg-card overflow-hidden shadow-xl hover-lift">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-soft bg-black/40">
                    <th className="text-left py-4 px-6 text-muted text-xs font-medium uppercase tracking-wider w-[200px]">El Enfoque</th>
                    <th className="text-center py-4 px-6 text-xs font-semibold uppercase tracking-wider text-black bg-primary min-w-[130px]">AlyntAI</th>
                    <th className="text-center py-4 px-6 text-muted text-xs font-medium uppercase tracking-wider min-w-[130px]">El Resto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-soft hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-muted">Modelo a Facturar</td>
                    <td className="py-4 px-6 text-center bg-primary/5 font-medium"><span className="text-primary font-semibold">$9.99/mes plano</span></td>
                    <td className="py-4 px-6 text-center text-muted/80">$250/m + 20%</td>
                  </tr>
                  <tr className="border-b border-soft hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-muted">Tiempo de Setup</td>
                    <td className="py-4 px-6 text-center bg-primary/5 font-medium"><span className="text-primary font-semibold">Instante</span></td>
                    <td className="py-4 px-6 text-center text-muted/80">Llamada Demo</td>
                  </tr>
                  <tr className="border-b border-soft hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-muted">Emails por IA</td>
                    <td className="py-4 px-6 text-center bg-primary/5 font-medium"><span className="text-primary">Incluido</span></td>
                    <td className="py-4 px-6 text-center text-muted/80">Básico Plantillas</td>
                  </tr>
                  <tr className="border-b border-soft hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-muted">Transparencia ROI</td>
                    <td className="py-4 px-6 text-center bg-primary/5 font-medium"><span className="text-primary font-semibold">Tiempo Real</span></td>
                    <td className="py-4 px-6 text-center text-muted/80">Oculto (%)</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-muted font-medium">Tú conservas ($1,000 recp.)</td>
                    <td className="py-4 px-6 text-center bg-primary/5 font-medium"><span className="text-success font-bold text-lg tabular-nums tracking-wide">$990</span></td>
                    <td className="py-4 px-6 text-center text-loss font-bold tabular-nums tracking-wide">$550</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative rounded-2xl bg-black border border-soft text-primary overflow-hidden shadow-2xl hover-lift">
            <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[250px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">¿Sangrando capital SaaS?<br/><span className="text-primary/70">Calcula y córtalo hoy.</span></h2>
              <p className="text-muted mb-8 max-w-md mx-auto text-sm leading-relaxed">Con recuperar un pago fallido ya doblaste la inversión original. Desbloquea un flujo de caja vital.</p>
              <Link href="/sign-up" className="inline-flex items-center justify-center whitespace-nowrap font-medium h-11 rounded-md gap-2 bg-primary hover:opacity-90 text-[black] border-0 cta-glow text-sm px-8 transition-all">
                Pruébalo Gratis
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <p className="text-[11px] text-muted/40 mt-5">Conexión limpia · Empieza hoy mismo · Cancela cuando quieras</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-soft bg-card-alt">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight text-primary">AlyntAI</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-muted">
              <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacidad</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Términos</Link>
              <a href="mailto:soporte@alyntai.com" className="hover:text-primary transition-colors">Soporte</a>
            </div>
            <p className="text-xs text-muted/50">© {new Date().getFullYear()} Alynt AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
