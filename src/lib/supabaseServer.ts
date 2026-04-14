import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client using service role key.
// ONLY use this in server components and API routes — never expose to the client.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey);
