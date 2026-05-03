/**
 * Supabase client for the ENTEVATE Brand Portal.
 *
 * Used by the Signature Builder section to:
 *   - sign users in via magic-link email (one-tap link to inbox)
 *   - read/write their `brand_signatures` rows (RLS gates by auth.uid())
 *
 * Astro exposes only vars prefixed with PUBLIC_ to client code; both URL
 * and anon/publishable key are safe to expose because RLS policies on
 * brand_signatures enforce per-user isolation server-side.
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Don't throw at import-time so static page loads don't break in
  // environments where the keys aren't configured yet. The signature
  // builder will surface the error inline if someone tries to use it.
  // eslint-disable-next-line no-console
  console.warn(
    '[supabase] PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY is missing. Signature Builder will not work until these are set.'
  );
}

export const supabase = createClient(
  SUPABASE_URL ?? 'http://placeholder.invalid',
  SUPABASE_ANON_KEY ?? 'placeholder',
  {
    auth: {
      // Persist the session in localStorage so opening the brand portal
      // in another tab doesn't bounce the user back to sign-in.
      persistSession: true,
      autoRefreshToken: true,
      // We rely on email magic link, not OTP code entry, so detectSessionInUrl
      // catches the redirect back from the email link.
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
  }
);

export const SUPABASE_CONFIGURED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
