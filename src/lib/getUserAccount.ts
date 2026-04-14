import { supabaseServer } from './supabaseServer';

/**
 * Looks up the user's connected Stripe account ID via the businesses table.
 * Returns the stripe_account_id or null if not connected.
 */
export async function getUserStripeAccountId(userEmail: string): Promise<string | null> {
  const { data, error } = await supabaseServer
    .from('businesses')
    .select('stripe_account_id')
    .eq('email', userEmail)
    .single();

  if (error || !data) return null;
  return data.stripe_account_id;
}
