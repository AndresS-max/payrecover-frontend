import { supabase } from "@/lib/supabase";

export async function getProDashboardMetrics() {
  // En paralelo para máximo rendimiento
  const [
    { data: pendingInvoices, error: pendingErr },
    { data: recoveredInvoices, error: recErr }
  ] = await Promise.all([
    supabase.from("failed_invoices").select("amount_due").eq("status", "pending"),
    supabase.from("failed_invoices").select("amount_paid").eq("status", "recovered"),
  ]);

  if (pendingErr) console.error("Error fetching pending invoices:", pendingErr);
  if (recErr) console.error("Error fetching recovered invoices:", recErr);

  // Pagos Perdidos: Monto total de facturas con estado 'pending' (failed en Stripe) que no han sido recuperadas
  const totalLostCents = pendingInvoices?.reduce((sum, inv) => sum + (inv.amount_due || 0), 0) ?? 0;
  
  // Pagos Recuperados: Monto total de facturas que pasaron de 'failed' a 'paid'
  const totalRecoveredCents = recoveredInvoices?.reduce((sum, inv) => sum + (inv.amount_paid || 0), 0) ?? 0;

  // Tasa de recuperación (en base a Dinero, no a conteo)
  const totalAtRiskCents = totalLostCents + totalRecoveredCents;
  const recoveryRate = totalAtRiskCents > 0 ? (totalRecoveredCents / totalAtRiskCents) * 100 : 0;

  return {
    lostAmount: totalLostCents / 100,
    recoveredAmount: totalRecoveredCents / 100,
    recoveryRate: Math.round(recoveryRate * 10) / 10, // 1 decimal (ej. 85.4)
  };
}
