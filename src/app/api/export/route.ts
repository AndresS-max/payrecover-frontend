import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data, error } = await supabase
    .from('failed_invoices')
    .select(
      'id, stripe_invoice_id, stripe_customer_id, stripe_account_id, amount_due, amount_paid, commission_amount, currency, status, created_at, recovered_at, commission_billed, commission_billed_at'
    )
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Error generando el reporte' }, { status: 500 });
  }

  const headers = [
    'ID',
    'Invoice Stripe',
    'Cliente (Stripe ID)',
    'Cuenta Conectada',
    'Monto Adeudado',
    'Monto Pagado',
    'Comisión Dunnify (15%)',
    'Moneda',
    'Estado',
    'Fecha Creación',
    'Fecha Recuperación',
    'Comisión Facturada',
  ];

  const csvVal = (val: unknown): string => {
    if (val === null || val === undefined) return '';
    const str = String(val);
    return str.includes(',') || str.includes('"') || str.includes('\n')
      ? `"${str.replace(/"/g, '""')}"`
      : str;
  };

  const toDollars = (cents: number | null): string =>
    cents != null ? (cents / 100).toFixed(2) : '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = (data || []).map((inv: any) =>
    [
      csvVal(inv.id),
      csvVal(inv.stripe_invoice_id),
      csvVal(inv.stripe_customer_id),
      csvVal(inv.stripe_account_id),
      csvVal(toDollars(inv.amount_due)),
      csvVal(toDollars(inv.amount_paid)),
      csvVal(toDollars(inv.commission_amount)),
      csvVal(inv.currency?.toUpperCase()),
      csvVal(inv.status),
      csvVal(inv.created_at ? new Date(inv.created_at).toLocaleDateString('es-GT') : ''),
      csvVal(inv.recovered_at ? new Date(inv.recovered_at).toLocaleDateString('es-GT') : ''),
      csvVal(inv.commission_billed ? 'Sí' : 'No'),
    ].join(',')
  );

  const csv = '\uFEFF' + [headers.join(','), ...rows].join('\n');
  const filename = `dunnify-comisiones-${new Date().toISOString().split('T')[0]}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
